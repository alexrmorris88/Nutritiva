const Users = require("../../models/userSchema");
const asyncErrors = require("../../errorHandling/aysncErrors");
const ErrorHandler = require("../../errorHandling/ErrorHandler");
const sendToken = require("../../utils/jwtTokenCookie");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const APIFeatures = require("../../utils/APIFeatures");

// @route   POST /users/new
// @desc    Create New User
// @access  Public
exports.newUser = asyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Check if Confirm Password Matches
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      error: "Passwords do not match",
    });
  }

  const user = await Users.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password,
    confirmPassword,
  })
    .then((user) => sendToken(user, 200, res))
    .then((user) =>
      res.status(200).json({
        success: true,
        user,
      })
    )
    .catch((err) => res.status(400).json(err.message));
});

// @route   GET /users/all
// @desc    Get All Users
// @access  Private/Admin
exports.getAllUsers = asyncErrors(async (req, res, next) => {
  const ApiFeatures = new APIFeatures(Users.find(), req.query)
    .searchUserByEmail()
    .filter()
    .pagination(8);

  const users = await ApiFeatures.query;

  res.status(200).json({
    UsersPerPage: users.length,
    success: true,
    users,
  });

  if (!users) {
    return res.status(404).json({
      success: false,
      message: "No users available",
    });
  }
});

// @route   GET /users/search/:id
// @desc    Get User by ID
// @access  Private (Or provate\Admin?)
exports.getUserByID = asyncErrors(async (req, res, next) => {
  const users = await Users.findById(req.params.id)
    .then((users) =>
      res.status(200).json({
        success: true,
        users,
      })
    )
    .catch((err) => res.status(404).json(err.message));
});

// @route   PUT /users/update/:id
// @desc    Update User by ID
// @access  Private
exports.updateUser = asyncErrors(async (req, res, next) => {
  let users = await Users.findById(req.params.id).catch((err) =>
    res.status(404).json(err.message)
  );

  if (!users) {
    return next(
      res.status(404).json({
        success: false,
        error: "User does not exist",
      })
    );
  }

  users = await Users.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
    .then((user) =>
      res.status(200).json({
        success: true,
        user,
      })
    )
    .catch((err) => res.status(404).json(err.message));
});

// @route   DELETE /users/delete/:id
// @desc    Delete User by ID
// @access  Private\Admin
exports.deleteUserByID = asyncErrors(async (req, res, next) => {
  let users = await Users.findById(req.params.id).catch((err) =>
    res.status(404).json(err.message)
  );

  if (!users) {
    return next(
      res.status(404).json({
        success: false,
        error: "User does not exist",
      })
    );
  }

  users
    .remove()
    .then(() =>
      res.status(200).json({
        success: true,
        message: "User successfully deleted",
      })
    )
    .catch((err) => res.status(404).json(err.message));
});

// @route   POST /users/login
// @desc    Loggin with Auth Token
// @access  Public
exports.login = asyncErrors(async (req, res, next) => {
  let { email, password, confirmPassword } = req.body;

  // Check to see if email or passowrds hasn't been entered
  if (!email || !password || !confirmPassword) {
    return next(
      res
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .status(400)
        .json({
          success: false,
          error: "Please enter username or password",
        })
    );
  }

  // Check if Confirm Password Matches, if not, remove token
  if (password !== confirmPassword) {
    return next(
      res
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .status(400)
        .json({
          success: false,
          error: "Passwords do not match",
        })
    );
  }

  // Set email to lowercase
  email = email.toLowerCase();

  // Finding the user in the database
  const user = await Users.findOne({ email }).select("+password");

  // Check is User name (email) is valid
  if (!user) {
    return next(
      res
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .status(404)
        .json({
          success: false,
          error: "Invalid email or password",
        })
    );
  }

  // Check if password is correct or not
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(
      res
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .status(404)
        .json({
          success: false,
          error: "Invalid email or password",
        })
    );
  }

  sendToken(user, 200, res);
});

// @route   GET /users/logout
// @desc    Logout and remove auth token
// @access  Public
exports.logout = asyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// @route   PUT /users/update-password
// @desc    Update user password
// @access  Private
exports.updatePassword = asyncErrors(async (req, res, next) => {
  let { password, confirmPassword, oldPassword } = req.body;

  // Check to see if the passwords match
  if (password !== confirmPassword) {
    return next(
      res.status(400).json({
        success: false,
        error: "Passwords do not match",
      })
    );
  }

  // Check to see if the old password is the same as the new password
  if (password === oldPassword) {
    return next(
      res.status(400).json({
        success: false,
        error: "Cannot use old password as new password",
      })
    );
  }
  user = await Users.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect"));
  }

  user.password = req.body.password;

  await user.save();

  sendToken(user, 200, res);
});

// @route   PUT /users/forgot-password
// @desc    Forgot password
// @access  Public
exports.forgotPassword = asyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await Users.findOne({ email });

  // Check if user exists
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  // todo: findout why we do not validate before save?
  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/users/reset-password/${resetToken}`;

  // Nodemailer message
  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Nutritiva Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// @route   PUT /users/reset-password/:token
// @desc    Reset password
// @access  Public
exports.resetPassword = asyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

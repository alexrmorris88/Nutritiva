const Users = require("../../models/userSchema");
const asyncErrors = require("../../errorHandling/aysncErrors");
const ErrorHandler = require("../../errorHandling/ErrorHandler");
const sendToken = require("../../utils/jwtTokenCookie");

// note: add user routes
// todo: forgot password
// todo: reset password
// todo: update password


// @route   POST /users/new
// @desc    Create New User
// @access  Public
exports.newUser = asyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

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
  const users = await Users.find()
    .then((users) =>
      res.status(200).json({
        Num_of_Users: users.length,
        success: true,
        users,
      })
    )
    .catch((err) => res.status(404).json(err.message));

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
  let { email, password } = req.body;

  email = email.toLowerCase();

  // Check if email and passowrd is entered by the user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter username or password", 404));
  }

  // Finding the user in the database
  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  // Check if password is correct or not
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password", 404));
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

// @route   GET /users/update-profile/:id
// @desc    Update User Profile
// @access  Public
// todo: FIXME: need to fix this code...
exports.updateUserProfile = asyncErrors(async (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  let user = await Users.findById(req.user.id)

  user = await Users.findByIdAndUpdate(
    req.user.id,
    { firstName, lastName, email },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    user
  });
});

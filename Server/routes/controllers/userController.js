const Users = require("../../models/userSchema");

// @route   POST /users/new
// @desc    Create New User
// @access  Public
exports.newUser = async (req, res, next) => {
  const user = await Users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) =>
      res.status(200).json({
        success: true,
        user,
      })
    )
    .catch((err) => res.status(404).json(err.message));
};

// @route   GET /users/all
// @desc    Get All Users
// TODO: @access  Private/Admin
exports.getAllUsers = async (req, res, next) => {
  const users = await Users.find()
    .then((users) =>
      res.status(200).json({
        success: true,
        users,
      })
    )
    .catch((err) => res.status(404).json(err.message));
};

// @route   PUT /users/update/:id
// @desc    Update User by ID
// TODO: @access  Private
exports.updateUser = async (req, res, next) => {
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

  users = await Users.findByIdAndUpdate(req.params.id, req.body, {
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
};

// @route   DELETE /users/delete/:id
// @desc    Delete User by ID
// TODO: @access  Private\Admin
exports.deleteUserByID = async (req, res, next) => {
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
};

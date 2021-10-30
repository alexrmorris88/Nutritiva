const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [false, "Please enter your name"],
    maxlength: [30, "Name cannot exceed 30 characters"],
    validate: [validator.isAlpha, "Please enter only letters"],
  },
  lastName: {
    type: String,
    require: [false, "Please enter your name"],
    maxlength: [30, "Name cannot exceed 30 characters"],
    validate: [validator.isAlpha, "Please enter only letters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Your password must be at least 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: false,
      url: {
        type: String,
        required: false,
      },
    },
  },
  roles: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model("User", userSchema);
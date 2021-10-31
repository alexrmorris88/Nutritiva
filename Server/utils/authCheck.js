const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

// Check to see if the user is authenticated or not
exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  // Handle error if no token
  if (!token) {
    return res.status(400).json({
      success: false,
      Error: "Login required",
    });
  }

  // Decode the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  
  next();
};

// Handling user roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
        return next(res.status(400).json({
          status: false,
          Error: "This user is not allowed to access this resource"
        }))
    }
    next()
  }
}
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

//REGISTER
exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password, agreement } = req.body;
  try {
    //create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      agreement,
    });

    res.status(200).json({ sucess: true, user });
  } catch (err) {
    next(err);
  }
};

//LOGIN
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    res.status(200).json({ sucess: true, user });
  } catch (err) {
    next(err);
  }
};

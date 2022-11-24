const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError(
      "Must provide name, email, and password to register."
    );
  }

  const user = await User.create({ ...req.body });
  const token = user.createToken();
  res.status(StatusCodes.CREATED);
  res.json({ user: { name: user.getName() }, token });
};

const loginUser = async (req, res) => {
  //check that login values exist
  const { name, email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Must provide email and password to login.");
  }
  //verify user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError(`User with email ${email} does not exist.`);
  }
  //compare provided password hash to stored password hash
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(
      `Password not correct for user with email ${email}.`
    );
  }
  //create token for user
  const token = user.createToken();
  res.status(StatusCodes.OK);
  res.json({ user: { name: user.name }, token });
};

module.exports = {
  registerUser,
  loginUser,
};

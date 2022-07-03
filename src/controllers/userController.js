const userSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const userController = {};

userController.createUsers = async (req, res) => {
  try {
    const { name, age, email, password, location } = req.body;
    const userSave = new userSchema({
      name,
      age,
      email,
      password,
      location,
    });
    const user = await userSave.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

userController.loginUser = async (req, res) => {
  try {
    const user = await userSchema.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!user) {
      throw new Error();
    }
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET
    );
    const updatedUser = await userSchema.findByIdAndUpdate(
      { _id: user._id },
      { $set: { token: token } }
    );
    res.status(200).send({ updatedUser, token });
  } catch (error) {
    res.status(400).send({ error: "No user found" });
  }
};

userController.logoutUser = async (req, res) => {
  try {
    await userSchema.findByIdAndUpdate(
      { _id: req.user._id },
      { $unset: { token: 1 } }
    );
    res.status(200).send({ message: "User has successfully logged out" });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = userController;

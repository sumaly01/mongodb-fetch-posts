const jwt = require("jsonwebtoken");
const userSchema = require("../models/userSchema");

const authentication = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(400).send("Token not found");
    } else {
      token = token.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userSchema.findOne({
        _id: decoded._id,
        token: token,
      });
      if (!user) {
        throw new Error();
      }
      req.user = user;

      next();
    }
  } catch (error) {
    res.status(400).send({ error: "User not found" });
  }
};

module.exports = { authentication };

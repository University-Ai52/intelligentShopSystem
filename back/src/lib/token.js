const jwt = require("jsonwebtoken")

const SECRET = process.env.JWT_SECRET;
const EXPIRES = process.env.JWT_EXPIRES || "7d";

exports.signToken = function (user) {
  return jwt.sign({ sub: String(user._id), role: user.role }, SECRET, { expiresIn: EXPIRES });
}

exports.verifyToken = function (token) {
  return jwt.verify(token, SECRET);
}

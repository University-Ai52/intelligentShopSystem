import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
const EXPIRES = process.env.JWT_EXPIRES || "7d";

export function signToken(user) {
  return jwt.sign({ sub: String(user._id), role: user.role }, SECRET, { expiresIn: EXPIRES });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

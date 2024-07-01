import util from "util";
import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  try {
    const verify = util.promisify(jwt.verify);

    const secret = process.env.JWT_SECRET;
    const userInfo = await verify(token, secret);

    req.userInfo = userInfo;

    next();
  } catch (error) {
    next(error);
  }
}

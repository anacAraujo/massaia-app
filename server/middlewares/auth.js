import util from "util";
import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  try {
    // TODO add secret to .env to sign and verify the token
    // TODO add expire when generating the token
    const verify = util.promisify(jwt.verify);
    const userInfo = await verify(token, "jwtkey");

    req.userInfo = userInfo;

    next();
  } catch (error) {
    next(error);
  }
}

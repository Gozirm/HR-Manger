import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRETE);
    if (!payload) {
      return res
        .status(404)
        .json({ success: false, errMsg: "Unauthorized - Invalid Token" });
    }
    req.user = {
      userId: payload.userId,
      role: payload.role,
      firstName: payload.firstName,
      email: payload.email,
      lastName: payload.lastName,
      profileImage: payload?.profileImage,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth Failed" });
  }
};

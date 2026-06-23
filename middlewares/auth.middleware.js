import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    //   token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized. No token found",
      });
    }

    const token = authHeader.split(" ")[1];

    //   verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //   attach user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Split the Bearer token

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with the correct secret
    req.user = decoded; // Attach user information to the request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
export default authMiddleware;

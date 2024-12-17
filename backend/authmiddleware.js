import jwt from "jsonwebtoken";

const JWT_SECRET = "dhsahdbfhj12332";


export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ status: "error", message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ status: "error", message: "Token is invalid" });
    }

    req.user = { id: decoded.id }; // Attach the user's id from the decoded token
    next();
  });
};

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(req.headers);
  if (!token) return res.status(403).json({ message: "No token provided" });
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // console.log(err);
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    req.userId = decoded.id;
    // console.log(req.userId);
    console.log("authorization done");
    next();
  });
};

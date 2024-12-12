import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["Authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Failed to authenticate token" });
    req.userId = decoded.id;
    next();
  });

  console.log("jwt done");
};

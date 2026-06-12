import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const cookieToken = req.cookies?.token;

  let token;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Bearer <token>
  } else if (cookieToken) {
    token = cookieToken;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next(); // token is valid, proceed
  } catch (e) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
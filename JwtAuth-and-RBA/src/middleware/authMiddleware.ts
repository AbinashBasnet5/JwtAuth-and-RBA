import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config/keys";

export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token missing in authorization header' });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET);
    (req as any).user = payload;
    next();
  } catch (err) {
    console.error('JWT verification failed', err);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}

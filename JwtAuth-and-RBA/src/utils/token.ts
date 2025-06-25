import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config/keys";
import { User } from "../models/user";

export function generateAccessToken(user: User): string {
  return jwt.sign(
    { userId: user.id, role: user.role },
    JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );
}

export function generateRefreshToken(user: User): string {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion ,name:user.name, email:user.email},
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}

export async function verifyAccessToken(token: string): Promise<JwtPayload | null> {
  try {
    return await new Promise((resolve, reject) => {
      jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
        if (err || !decoded) return reject(err);
        resolve(decoded as JwtPayload);
      });
    });
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      console.warn("Access token expired:", err.message);
    } else {
      console.warn("Access token invalid:", err.message);
    }
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<JwtPayload | null> {
  try {
    return await new Promise((resolve, reject) => {
      jwt.verify(token, JWT_REFRESH_SECRET, (err, decoded) => {
        if (err || !decoded) return reject(err);
        resolve(decoded as JwtPayload);
      });
    });
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      console.warn("Refresh token expired:", err.message);
    } else {
      console.warn("Refresh token invalid:", err.message);
    }
    return null;
  }
}


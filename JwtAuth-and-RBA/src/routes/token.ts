import { Router, Request, Response } from 'express';
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from '../utils/token';
import { users, User } from '../models/user'; // assuming users is a Map<string, User>
import { JwtPayload } from 'jsonwebtoken';


 interface RefreshTokenPayload extends JwtPayload {
    userId : string ,
    tokenVersion : number,
 }
const router = Router();

router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies?.jid;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    let payload: { userId: string; tokenVersion: number } | null ;
    try {
      payload =  await verifyRefreshToken(token)  as RefreshTokenPayload;
    } catch (err) {
      // Invalid token
      res.sendStatus(403);
      return;
    }
    if(!payload) {
        res.sendStatus(403)
        return;
    }

    const user = users.get(payload.userId);
    if (!user || user.tokenVersion !== payload.tokenVersion) {
      res.sendStatus(403);
      return;
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('jid', refreshToken, {
      httpOnly: true,
      secure: false, // secure only in prod
      sameSite: 'none', // adjust if frontend domain differs
      path: '/token/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days, adjust to your token expiry
    });

    res.json({ accessToken });
  } catch (error) {
    console.error('Error in /refresh route:', error);
    res.sendStatus(500);
  }
});

router.post('/logout', (_req: Request, res: Response): void => {
  res.clearCookie('jid', {
    path: '/token/refresh',
    httpOnly: true,
    secure: false,
    sameSite: 'none'
  });
  res.sendStatus(200);
});

export default router;

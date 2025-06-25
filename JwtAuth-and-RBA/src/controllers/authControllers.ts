import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken } from '../utils/token';
import { User } from '../models/user';
import { CLIENT_URL } from '../config/keys';

export const handleOAuthCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as User | undefined;
    if (!user) {
      console.error('OAuth callback failed: No user found');
      res.status(401).send('Unauthorized: No user found');
      return;
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token cookie
    res.cookie('jid', refreshToken, {
      httpOnly: true,
      secure: false, // set to true if you are in production with HTTPS
      sameSite: 'lax', // or 'none' if frontend is on different domain + secure: true
      path: '/token/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to frontend with access token in query string
    // Adjust URL to your frontend success page
    res.redirect(`${CLIENT_URL}/oauth-success?token=${accessToken}`);
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).send('Internal Server Error');
  }
};

import { Router } from 'express';
import passport from 'passport';
import { handleOAuthCallback } from '../controllers/authControllers';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: 'http://localhost:3000/login' // Redirect here on failure
  }),
  handleOAuthCallback
);

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    session: false,
    failureRedirect: 'http://localhost:3000/login' // Redirect here on failure
  }),
  handleOAuthCallback
);

export default router;

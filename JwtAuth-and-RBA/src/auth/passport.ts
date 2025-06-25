import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile, VerifyCallback as GoogleVerifyCallback } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CALLBACK_URL, GITHUB_CALLBACK_URL } from '../config/keys';
import { users, User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

type VerifyCallback = (error: any, user?: any, info?: any) => void;

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
}, async (
  _accessToken: string,
  _refreshToken: string,
  profile: GoogleProfile,
  done: GoogleVerifyCallback
) => {
  try {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      return done(new Error('Google profile email not available'));
    }

    let user = Array.from(users.values()).find(u => u.email === email);
    if (!user) {
      user = {
        id: uuidv4(),
        email,
        name: profile.displayName || 'Abinash',  // <--- Added name here
        provider: 'google',
        role: 'user',
        tokenVersion: 0
      };
      users.set(user.id, user);
    }

    return done(null, user);
  } catch (err) {
    return done(err as Error);
  }
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: GITHUB_CALLBACK_URL,
  scope: ['user:email']
}, async (
  _accessToken: string,
  _refreshToken: string,
  profile: GitHubProfile,
  done: VerifyCallback,
) => {
  try {
    // Use first email if available, else fallback to username-based dummy email
    const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;

    let user = Array.from(users.values()).find(u => u.email === email);
    if (!user) {
      user = {
        id: uuidv4(),
        email,
        name: profile.displayName || profile.username || 'Abinash',  // <--- Added name here
        provider: 'github',
        role: 'user',
        tokenVersion: 0
      };
      users.set(user.id,user);
    }

    return done(null, user);
  } catch (err) {
    return done(err as Error);
  }
}));

import dotenv from 'dotenv';
dotenv.config();

// const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;


// Runtime validation: Fail fast if any required env var is missing
if (!process.env.JWT_ACCESS_SECRET) throw new Error("Missing JWT_ACCESS_SECRET in .env");
if (!process.env.JWT_REFRESH_SECRET) throw new Error("Missing JWT_REFRESH_SECRET in .env");
if (!process.env.GOOGLE_CLIENT_ID) throw new Error("Missing GOOGLE_CLIENT_ID in .env");
if (!process.env.GOOGLE_CLIENT_SECRET) throw new Error("Missing GOOGLE_CLIENT_SECRET in .env");
if (!process.env.GOOGLE_CALLBACK_URL) throw new Error("Missing GOOGLE_CALLBACK_URL in .env");
if (!process.env.GITHUB_CLIENT_ID) throw new Error("Missing GITHUB_CLIENT_ID in .env");
if (!process.env.GITHUB_CLIENT_SECRET) throw new Error("Missing GITHUB_CLIENT_SECRET in .env");
if (!process.env.GITHUB_CALLBACK_URL) throw new Error("Missing GITHUB_CALLBACK_URL in .env");

export const CLIENT_URL = 'http://localhost:3000';
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL!;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
export const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL!;

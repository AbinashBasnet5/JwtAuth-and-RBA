import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import './auth/passport';
import authRoutes from './routes/auth';
import tokenRoutes from './routes/token';
import protectedRoutes from './routes/protected';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.get('/test', (req, res) => {
  res.send('Hello, test route works!');
});


app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/token', tokenRoutes);
app.use('/protected', protectedRoutes);

app.use(errorHandler);

export default app;

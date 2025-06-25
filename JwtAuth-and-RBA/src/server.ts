// src/server.ts
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(PORT, () => {
  console.log(`🚀 HTTP Server running at http://localhost:${PORT}`);
});

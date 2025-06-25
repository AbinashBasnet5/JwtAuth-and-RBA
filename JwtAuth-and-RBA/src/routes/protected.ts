import { Router } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';

const router = Router();

router.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: 'You are logged in', user: (req as any).user });
});

router.get('/admin', authenticateJWT, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Admin content' });
});

export default router;

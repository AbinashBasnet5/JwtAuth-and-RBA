import { Request, Response, NextFunction } from "express";

// Extend Express Request to include `user` with `id` and `role`
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
    [key: string]: any;
  };
}

// Middleware factory to authorize roles
export function authorizeRoles(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;

    if (!user || !roles.includes(user.role)) {
      res.sendStatus(403);  // Forbidden
      return;               // Important: stop middleware chain
    }

    next();  // user authorized, continue to next middleware/handler
  };
}

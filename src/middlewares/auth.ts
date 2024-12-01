import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

declare global {
    namespace Express {
      interface Request {
        userId?: string
      }
    }
  }

function isJwtPayloadWithId(decoded: any): decoded is JwtPayload & { id: string } {
    return decoded && typeof decoded === 'object' && 'id' in decoded;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Access denied.' });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (!isJwtPayloadWithId(decoded)) {
             res.status(401).json({ error: 'Invalid token.' });
             return;
        }
        console.log(decoded, "decoded")
        req.userId = decoded.id;  // Now TypeScript knows `id` is present
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

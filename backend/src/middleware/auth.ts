import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
	namespace Express {
		interface Request {
			// add "userId" to Request type
			userId: string;
		}
	}
}

// since this is a middleware, Express will pass 3 parameters (with "Next" function)
export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies['auth_token'];

	if (!token) {
		// 401: Unauthorized status
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		// have to "extend" the Request interface from Express...
		// ...because you try to customize it with this jwt decoded ID
		req.userId = (decoded as JwtPayload).userId;

		next();
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
};

import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.get('/me', verifyToken, async (req: Request, res: Response) => {
	const userId = req.userId;

	try {
		const user = await User.findById(userId).select('-password'); // not including user password

		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
});

// /api/users/register
router.post(
	'/register',

	// NOTE: REFACTOR
	[
		check('firstName', 'First Name is required').isString(),
		check('lastName', 'Last Name is required').isString(),
		check('email', 'Email is required').isEmail(),
		check('password', 'Password with 6 or more characters required').isLength({
			min: 6,
		}),
	],

	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: errors.array() });
		}
		try {
			// ========= CREATING USER =========
			let user = await User.findOne({
				email: req.body.email,
			});
			if (user) {
				return res.status(400).json({ message: 'User already exists' });
			}
			user = new User(req.body);
			await user.save();

			// ========= GENERATE JWT SECRET KEY =========
			// generates a JWT for the newly created user, sets the JWT as a cookie, and sends the cookie in the response. Allowing server to identify and authorize the user.

			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET_KEY as string,
				{
					expiresIn: '1d',
				},
			);

			res.cookie('auth_token', token, {
				httpOnly: true, // accessible only by the web server
				secure: process.env.NODE_ENV === 'production', // secure for production deployment
				maxAge: 86400000, // sets the expiration time for the cookie, the same as token expired (1d)
			});

			return res.status(200).send({ message: 'User registered OK' });
		} catch (error) {
			// don't want to send back a specific error to hackers => be generic
			console.log(error);
			res.status(500).send({ message: 'Something went wrong' });
		}
	},
);

export default router;

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';

const router = express.Router();

router.post(
	'/login',
	// NOTE: REFACTOR
	// validations
	[
		check('email', 'Email is required').isEmail(),
		check('password', 'Password with 6 or more characters required').isLength({
			min: 6,
		}),
	],

	// fn to handle request
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: errors.array(),
			});
		}

		// pull out "email" & "password"
		const { email, password } = await req.body;

		try {
			// finding email
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: 'Invalid Credentials' });
			}

			// NOTE: REFACTOR
			// check password
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				// being generic with msgs, for potential hackers
				return res.status(400).json({ message: 'Invalid Credentials' });
			}

			// represents the user's identity and can be sent with each subsequent request to the server
			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET_KEY as string,
				{
					expiresIn: '1d',
				},
			);

			res.cookie('auth_token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'development',
				maxAge: 86400000,
			});

			// since cookie cannot be sent
			// => sends back userId for front-end to perform auth operations
			res.status(200).json({ userId: user._id });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Something went wrong' });
		}
	},
);

export default router;

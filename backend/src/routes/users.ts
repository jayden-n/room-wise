import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// /api/users/register
router.post(
	'/register',
	// NOTE: REFACTOR
	// these checks will be attached to the Request, then forwards it to "validationResult(req)"
	[
		check('firstName', 'First Name is required').isString(),
		check('lastName', 'Last Name is required').isString(),
		check('email', 'Email is required').isEmail(),
		check('password', 'Password with 6 or more characters required').isLength({
			min: 6,
		}),
	],

	async (req: Request, res: Response) => {
		const errors = validationResult(req); // check for any Request error from checks above
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: errors.array() });
		}
		try {
			// ========= CREATING USER =========
			let user = await User.findOne({
				email: req.body.email, // find "email" in database that matches "email" in request
			});
			if (user) {
				return res.status(400).json({ message: 'User already exists' });
			}
			user = new User(req.body); // if user doesn't exists yet
			await user.save(); // save user to db

			// ========= GENERATE JWT SECRET KEY =========
			// WHY?: generates a JWT for the newly created user, sets the JWT as a cookie, and sends the cookie in the response. Allowing server to identify and authorize the user.

			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET_KEY as string,
				{
					expiresIn: '1d',
				},
			);

			// automatically to be in the frontend so don't have to send response
			res.cookie('auth_token', token, {
				httpOnly: true, // accessible only by the web server
				secure: process.env.NODE_ENV === 'production', // secure for production deployment
				maxAge: 86400000, // sets the expiration time for the cookie, the same as token expired (1d)
			});

			return res.sendStatus(200);
		} catch (error) {
			// you don't want to send back a specific error to hackers => be generic
			console.log(error);
			res.status(500).send({ message: 'Something went wrong' });
		}
	},
);

export default router;

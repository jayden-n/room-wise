import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

// /api/users/register
router.post('/register', async (req: Request, res: Response) => {
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
		// WHY?: generates a JWT for the newly created user, sets the JWT as a cookie, and sends the cookie in the response
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
});

export default router;

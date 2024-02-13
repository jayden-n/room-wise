import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose'; // interact with db
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// =============== cloudinary ===============
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json()); // converts API request body to JSON
app.use(express.urlencoded({ extended: true })); // parse the URL to get the right params
app.use(
	cors({
		// make sure any different URL try to access the server => will be blocked (security)
		origin: process.env.FRONTEND_URL, // tell server to only accept request from "FRONTEND_URL"
		credentials: true, // make sure the "FRONTEND_URL" to include a cookie when being sent back
	}),
); // prevents certain requests from certain wrong URLs (blocked)

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// =============== ENDPOINTS ===============
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// =============== SERVER LISTENING ===============
app.listen(8000, () => {
	console.log('server running on 8000');
});

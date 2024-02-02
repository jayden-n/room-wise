import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose'; // interact with db
import userRoutes from './routes/users';

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);

const app = express();
app.use(express.json()); // converts API request body to JSON
app.use(express.urlencoded({ extended: true })); // parse the URL to get the right params
app.use(cors()); // prevents certain requests from certain wrong URLs (blocked)

app.use('/api/users', userRoutes);

app.listen(8000, () => {
	console.log('server running on 8000');
});

import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(express.json()); // converts API request body to JSON
app.use(express.urlencoded({ extended: true })); // parse the URL to get the right params
app.use(cors()); // prevents certain requests from certain wrong URLs (blocked)

app.get('/api/test', async (req: Request, res: Response) => {
	res.json({ msg: 'hello' });
});

app.listen(8000, () => {
	console.log('server running on 8000');
});

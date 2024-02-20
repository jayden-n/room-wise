import express, { Request, Response } from 'express';
import Hotel from '../models/hotel';
import { HotelSearchResponse } from '../shared/types';

const router = express.Router();

// /api/hotels/search?
router.get('/search', async (req: Request, res: Response) => {
	try {
		const pageSize = 5;

		// page "request" has to be a number
		const pageNumber = parseInt(
			req.query.page ? req.query.page.toString() : '1',
		);

		// pageNumber = 3
		const skip = (pageNumber - 1) * pageSize;
		const hotels = await Hotel.find().skip(skip).limit(pageSize);
		const total = await Hotel.countDocuments();

		const response: HotelSearchResponse = {
			data: hotels,
			pagination: {
				total,
				page: pageNumber,
				pages: Math.ceil(total / pageSize), // how many pages
			},
		};
		res.status(200).json(response);
	} catch (error) {
		console.log('Error searching for hotel: ', error);
		res.status(500).json({ message: 'Something went wrong' });
	}
});

export default router;

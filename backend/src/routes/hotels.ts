import express, { Request, Response } from 'express';
import Hotel from '../models/hotel';
import { HotelSearchResponse } from '../shared/types';
import { constructSearchQuery } from '../utils/query';
import { param, validationResult } from 'express-validator';

const router = express.Router();

// /api/hotels/search?
router.get('/search', async (req: Request, res: Response) => {
	try {
		const query = constructSearchQuery(req.query);

		let sortOptions = {};
		switch (req.query.sortOption) {
			case 'starRating':
				sortOptions = { starRating: -1 }; // high to low
				break;
			case 'pricePerNightAsc':
				sortOptions = { pricePerNight: 1 }; // low to high
				break;
			case 'pricePerNightDesc':
				sortOptions = { pricePerNight: -1 };
				break;
		}

		const pageSize = 5;
		const pageNumber = parseInt(
			req.query.page ? req.query.page.toString() : '1',
		);
		const skip = (pageNumber - 1) * pageSize;

		const hotels = await Hotel.find(query)
			.sort(sortOptions)
			.skip(skip)
			.limit(pageSize);

		const total = await Hotel.countDocuments(query);

		const response: HotelSearchResponse = {
			data: hotels,
			pagination: {
				total,
				page: pageNumber,
				pages: Math.ceil(total / pageSize),
			},
		};

		res.json(response);
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'Something went wrong' });
	}
});

// get single hotel in the market (not for specific user)
router.get(
	'/:id',
	[param('id').notEmpty().withMessage('Hotel ID is required')],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const id = req.params.id.toString();

		try {
			const hotel = await Hotel.findById(id);
			res.status(200).json(hotel);
		} catch (error) {
			res.status(500).json({ message: 'Error fetching hotel' });
		}
	},
);

export default router;

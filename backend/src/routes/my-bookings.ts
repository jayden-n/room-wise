import express, { Request, Response, Router } from 'express';
import { verifyToken } from '../middleware/auth';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';

const router: Router = express.Router();

// /api/my-bookings
router.get('/', verifyToken, async (req: Request, res: Response) => {
	try {
		const hotels = await Hotel.find({
			bookings: {
				$elemMatch: { userId: req.userId },
			},
		});

		// make sure to get only the 'booking' array
		const results = hotels.map((hotel) => {
			const userBookings = hotel.bookings.filter(
				(booking) => booking.userId === req.userId,
			);

			const hotelWithUserBookings: HotelType = {
				...hotel.toObject(),
				bookings: userBookings,
			};
			return hotelWithUserBookings;
		});

		res.status(200).json(results);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching hotels' });
	}
});

export default router;

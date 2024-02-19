import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

import { HotelType } from '../shared/types';
import { verifyToken } from '../middleware/auth';
import { body } from 'express-validator';
import Hotel from '../models/hotel';

const router: Router = express.Router();

// define storage
const storage = multer.memoryStorage();

// define upload size
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB
	},
});

// api/my-hotels
router.post(
	'/',
	verifyToken, // only logged-in users can create hotels
	[
		body('name').notEmpty().withMessage('Name is required'),
		body('city').notEmpty().withMessage('City is required'),
		body('country').notEmpty().withMessage('Country is required'),
		body('description').notEmpty().withMessage('Description is required'),
		body('type').notEmpty().withMessage('Hotel type is required'),
		body('pricePerNight')
			.notEmpty()
			.isNumeric()
			.withMessage('Price per night is required'),
		body('facilities')
			.notEmpty()
			.isArray()
			.withMessage('Facilities is required'),
	],

	upload.array('imageFiles', 6), // make sure to receive only 6 image files
	async (req: Request, res: Response) => {
		try {
			const imageFiles = req.files as Express.Multer.File[]; // image file from request
			const newHotel: HotelType = req.body;

			// 1. upload the images to cloudinary
			const imageURLs = await uploadImages(imageFiles);

			// 2. if upload was successful, add the URLs to the new hotel
			newHotel.imageUrls = imageURLs;
			newHotel.lastUpdated = new Date();
			newHotel.userId = req.userId;

			// 3. save the new hotel in database
			const hotel = new Hotel(newHotel);
			await hotel.save();

			// 4. return a 201 status
			res.status(201).send(hotel);
		} catch (error) {
			console.log('Error creating hotel: ', error);
			res.status(500).json({ message: 'Something went wrong' });
		}
	},
);

router.get('/', verifyToken, async (req: Request, res: Response) => {
	try {
		const hotels = await Hotel.find({ userId: req.userId }); //array
		res.json(hotels);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching hotels' });
	}
});

// api/my-hotels/123456789
router.get('/:hotelId', verifyToken, async (req: Request, res: Response) => {
	const id = req.params.hotelId.toString();

	try {
		const hotel = await Hotel.findOne({
			_id: id,
			userId: req.userId,
		});
		res.status(200).json(hotel);
	} catch (error) {
		res.status(500).json({ message: 'Error editing hotel' });
	}
});

router.put(
	'/:hotelId',
	verifyToken,
	upload.array('imageFiles'),
	async (req: Request, res: Response) => {
		try {
			const updatedHotel: HotelType = req.body;
			updatedHotel.lastUpdated = new Date(); // update the time first

			const hotel = await Hotel.findOneAndUpdate(
				{
					_id: req.params.hotelId,
					userId: req.userId,
				},
				updatedHotel,
				{ new: true }, // most updated props
			);
			if (!hotel) {
				return res.status(404).json({ message: 'Hotel not found' });
			}

			const files = req.files as Express.Multer.File[];
			const updatedImageURLs = await uploadImages(files);

			hotel.imageUrls = [
				...updatedImageURLs,
				...(updatedHotel.imageUrls || []),
			];

			await hotel.save();
			res.status(201).json(hotel);
		} catch (error) {
			res.status(500).json({ message: 'Something went wrong' });
		}
	},
);

// reusable function
async function uploadImages(imageFiles: Express.Multer.File[]) {
	const uploadPromises: Promise<string>[] = imageFiles.map(async (image) => {
		const b64 = Buffer.from(image.buffer).toString('base64'); // converting to base-64 for cloudinary uploading
		let dataURI = 'data:' + image.mimetype + ';base64,' + b64; // describe the image type
		const res = await cloudinary.uploader.upload(dataURI); // send to cloudinary
		return res.url; // cloudinary will give back a image url prop
	});
	const imageURLs = await Promise.all(uploadPromises);
	return imageURLs;
}

export default router;

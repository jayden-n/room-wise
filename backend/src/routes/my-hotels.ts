import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Hotel, { HotelType } from '../models/hotel';
import { verifyToken } from '../middleware/auth';
import { body, check, validationResult } from 'express-validator';

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
			const uploadPromises: Promise<string>[] = imageFiles.map(
				async (image) => {
					const b64 = Buffer.from(image.buffer).toString('base64'); // converting to base-64 for cloudinary uploading
					let dataURI = 'data:' + image.mimetype + ';base64,' + b64; // describe the image type
					const res = await cloudinary.uploader.upload(dataURI); // send to cloudinary
					return res.url; // cloudinary will give back a image url prop
				},
			);
			const imageURLs = await Promise.all(uploadPromises);

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
export default router;

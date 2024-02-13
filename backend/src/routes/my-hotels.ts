import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

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
	upload.array('imageFiles', 6),
	async (req: Request, res: Response) => {
		try {
			const imageFiles = req.files as Express.Multer.File[]; // image from request
			const newHotel = req.body;

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
			// 3. save the new hotel in the database
			// 4. return a 201 status
		} catch (error) {
			console.log('Error creating hotel: ', error);
			res.status(500).json({ message: 'Something went wrong' });
		}
	},
);

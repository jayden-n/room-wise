import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload_file = (
	file: string,
	folder: string,
	// will receive an id and url (as strings)
): Promise<{ public_id: string; url: string }> => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(
			file,
			{
				resource_type: "auto",
				folder: folder,
			},

			// callback to resolve promise
			(error, result: any) => {
				resolve({
					public_id: result.public_id,
					url: result.url,
				});
			},
		);
	});
};

const delete_file = async (file: string): Promise<boolean> => {
	const res = await cloudinary.uploader.destroy(file);
	if (res?.result === "ok") return true;

	return false;
};

export { cloudinary, delete_file, upload_file };

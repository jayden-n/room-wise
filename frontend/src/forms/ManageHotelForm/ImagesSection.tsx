import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const ImagesSection = () => {
	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext<HotelFormData>();

	const existingImagesUrls = watch('imageUrls');

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Hotel Images</h2>
			<div className="border rounded-md p-4 flex flex-col gap-4">
				{existingImagesUrls && (
					<div className="grid grid-cols-6 gap-4">
						{existingImagesUrls.map((url) => {
							return (
								<div className="relative group">
									<img
										src={url}
										alt="hotel image"
										className="min-h-full object-cover rounded-md"
									/>
									<button className="absolute inset-0 flex items-center justify-center text-white font-semibold bg-sky-500 bg-opacity-50 opacity-0 group-hover:opacity-100 duration-300">
										Delete
									</button>
								</div>
							);
						})}
					</div>
				)}
				<input
					type="file"
					multiple // accept multiple files
					accept="image/*" // accept only images (not text)
					className="w-full text-gray-700 font-normal"
					{...register('imageFiles', {
						validate: (imageFile) => {
							const totalLength = imageFile.length;
							// check images
							if (totalLength === 0) {
								return 'At least 1 image should be uploaded';
							}
							if (totalLength > 6) {
								return 'Total number of images cannot be more than 6';
							}

							return true;
						},
					})}
				/>
			</div>
			{errors.imageFiles && (
				<span className="text-red-500">{errors.imageFiles.message}</span>
			)}
		</div>
	);
};
export default ImagesSection;

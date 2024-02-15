import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const ImagesSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();
	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Images</h2>
			<div className="border rounded-md p-4 flex flex-col gap-4">
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

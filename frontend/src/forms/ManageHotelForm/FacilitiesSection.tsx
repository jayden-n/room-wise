import { useFormContext } from 'react-hook-form';
import { hotelFacilities } from '../../config/hotel-options-config';
import { HotelFormData } from './ManageHotelForm';

const FacilitiesSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();
	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Facilities</h2>
			<div className="grid lg:grid-cols-4  gap-2 grid-cols-2">
				{hotelFacilities.map((facility) => {
					return (
						<label className="cursor-pointer flex items-center gap-1 text-gray-700">
							<input
								{...register('facilities', {
									// make sure a facility is checked
									validate: (facilities) => {
										if (facilities && facilities.length > 0) {
											return true;
										} else {
											return 'At least one facility is required';
										}
									},
								})}
								type="checkbox"
								value={facility}
								className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<span>{facility}</span>
						</label>
					);
				})}
			</div>
			{errors.facilities && (
				<span className="text-red-500">{errors.facilities.message}</span>
			)}
		</div>
	);
};
export default FacilitiesSection;

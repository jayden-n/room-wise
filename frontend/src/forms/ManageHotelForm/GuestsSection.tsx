import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const GuestsSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Guests</h2>
			<div className="bg-gray-300 py-6 px-8 rounded-md">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Adult */}
					<label className="flex-1 text-sm font-semibold  text-gray-700">
						Adult(s)
						<input
							type="number"
							min={1}
							className="w-full rounded border px-2 py-1 font-normal"
							{...register('adultCount', {
								required: 'This field is required',
							})}
						/>
						{errors.adultCount && (
							<span className="text-red-500">{errors.adultCount.message}</span>
						)}
					</label>

					{/* Child */}
					<label className="flex-1 text-sm font-semibold  text-gray-700">
						Child(ren)
						<input
							type="number"
							min={0} // optional for children
							className="w-full rounded border px-2 py-1 font-normal"
							{...register('childCount', {
								required: 'This field is required',
							})}
						/>
						{errors.childCount && (
							<span className="text-red-500">{errors.childCount.message}</span>
						)}
					</label>
				</div>
			</div>
		</div>
	);
};
export default GuestsSection;

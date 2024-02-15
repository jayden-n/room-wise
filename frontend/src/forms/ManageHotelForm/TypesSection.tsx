import { useFormContext } from 'react-hook-form';
import { hotelTypes } from '../../config/hotel-options-config';
import { HotelFormData } from './ManageHotelForm';

const TypesSection = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<HotelFormData>();
	const typeWatch = watch('type');

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Type</h2>
			<div className="grid md:grid-cols-5 sm:grid-cols-3 gap-4 grid-cols-2 ">
				{hotelTypes.map((type, index) => {
					return (
						<label
							className={
								typeWatch === type
									? 'cursor-pointer  bg-sky-300 px-4 py-2 text-sm rounded-full font-semibold'
									: 'cursor-pointer hover:bg-gray-200 bg-gray-300 duration-300 px-4 py-2 text-sm rounded-full font-semibold'
							}
							key={index}
						>
							<input
								type="radio"
								value={type}
								{...register('type', { required: 'This field is required' })}
								className="hidden"
							/>
							<span>{type}</span>
						</label>
					);
				})}
			</div>
			{errors.type && (
				<span className="text-red-500">{errors.type.message}</span>
			)}
		</div>
	);
};

export default TypesSection;

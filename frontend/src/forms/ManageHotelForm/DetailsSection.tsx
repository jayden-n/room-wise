import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';
import { HotelType } from '../../../../backend/src/shared/types';

type Props = {
	hotel?: HotelType;
};

const DetailsSection = ({ hotel }: Props) => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>(); // context needs to know the Props

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold mb-3">
				{hotel ? 'Edit Hotel' : 'Add Hotel'}
			</h1>

			{/* ============================== HOTEL NAME ============================== */}
			<label className="flex-1 text-sm font-bold  text-gray-700">
				Name
				<input
					type="text"
					className="w-full rounded border px-2 py-1 font-normal"
					{...register('name', { required: 'This field is required' })}
				/>
				{errors.name && (
					<span className="text-red-500">{errors.name.message}</span>
				)}
			</label>

			<div className="flex gap-4">
				{/* ============================== CITY ============================== */}
				<label className="flex-1 text-sm font-bold  text-gray-700">
					City
					<input
						type="text"
						className="w-full rounded border px-2 py-1 font-normal"
						{...register('city', { required: 'This field is required' })}
					/>
					{errors.city && (
						<span className="text-red-500">{errors.city.message}</span>
					)}
				</label>

				{/* ============================== COUNTRY ============================== */}
				<label className="flex-1 text-sm font-bold  text-gray-700">
					Country
					<input
						type="text"
						className="w-full rounded border px-2 py-1 font-normal"
						{...register('country', { required: 'This field is required' })}
					/>
					{errors.country && (
						<span className="text-red-500">{errors.country.message}</span>
					)}
				</label>
			</div>

			{/* ============================== DESCRIPTION ============================== */}
			<label className="text-sm font-bold  text-gray-700">
				Description
				<textarea
					rows={10}
					className="w-full rounded border px-2 py-1 font-normal"
					{...register('description', { required: 'This field is required' })}
				></textarea>
				{errors.description && (
					<span className="text-red-500">{errors.description.message}</span>
				)}
			</label>

			{/* ============================== Price per night ============================== */}
			<label className="max-w-[50%] text-sm font-bold  text-gray-700">
				Price per night
				<input
					type="number"
					min={1}
					className="w-full rounded border px-2 py-1 font-normal"
					{...register('pricePerNight', { required: 'This field is required' })}
				/>
				{errors.pricePerNight && (
					<span className="text-red-500">{errors.pricePerNight.message}</span>
				)}
			</label>

			{/* ============================== Star Ratings ============================== */}
			<label className="max-w-[50%] text-sm font-bold  text-gray-700">
				Star Rating
				<select
					{...register('starRating', { required: 'This field is required' })}
					className="border rounded w-full p-2 text-gray-500 font-normal"
				>
					<option value="" className="text-sm font-bold">
						Select as Rating
					</option>
					{[1, 2, 3, 4, 5].map((num) => {
						return (
							<option key={num} value={num}>
								{num} stars
							</option>
						);
					})}
				</select>
				{errors.starRating && (
					<span className="text-red-500">{errors.starRating.message}</span>
				)}
			</label>
		</div>
	);
};

export default DetailsSection;

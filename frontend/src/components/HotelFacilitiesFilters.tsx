import { hotelFacilities } from '../config/hotel-options-config';

type Props = {
	selectedHotelFacility: string[];
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelFacilitiesFilter = ({ selectedHotelFacility, onChange }: Props) => {
	return (
		<div className="border-b border-slate-300 pb-5">
			<h4 className="text-md font font-semibold mb-2">Facilities</h4>
			{hotelFacilities.map((facility) => (
				<label className="flex items-center space-x-2 cursor-pointer text-zinc-500">
					<input
						type="checkbox"
						className="rounded"
						value={facility}
						checked={selectedHotelFacility.includes(facility)}
						onChange={onChange}
					/>
					<span>{facility}</span>
				</label>
			))}
		</div>
	);
};
export default HotelFacilitiesFilter;

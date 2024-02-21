import { FormEvent, useState } from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
	const search = useSearchContext();
	const navigate = useNavigate();

	// store in local states to prevent whole app from re-rendering too many times
	const [destination, setDestination] = useState<string>(search.destination);
	const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
	const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
	const [adultCount, setAdultCount] = useState<number>(search.adultCount);
	const [childCount, setChildCount] = useState<number>(search.childCount);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		search.saveSearchValues(
			destination,
			checkIn,
			checkOut,
			adultCount,
			childCount,
		);

		navigate('/search');
	};

	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1); // can only book 1 year into the future

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="-mt-8 p-3 bg-orange-400 rounded-md shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
			>
				{/* destination */}
				<div className="flex flex-row items-center flex-1 rounded bg-white p-2">
					<MdTravelExplore size={25} className="mr-2" />
					<input
						type="text"
						placeholder="Search by location..."
						className="text-md w-full focus:outline-none italic"
						value={destination}
						onChange={(event) => setDestination(event.target.value)}
					/>
				</div>

				{/* number of people */}
				<div className="flex bg-white px-2 py-1 rounded gap-2 lg:col-span-2 2xl:col-span-1">
					<label className="flex items-center">
						Adults:
						<input
							type="number"
							className="w-full p-1 focus:outline-none font-bold"
							min={1}
							max={20}
							value={adultCount}
							onChange={(event) => setAdultCount(parseInt(event.target.value))}
						/>
					</label>
					<label className="flex items-center">
						Children:
						<input
							type="number"
							className="w-full p-1 focus:outline-none font-bold"
							min={0}
							max={20}
							value={childCount}
							onChange={(event) => setChildCount(parseInt(event.target.value))}
						/>
					</label>
				</div>

				{/* check-in date */}
				<div>
					<DatePicker
						selected={checkIn}
						onChange={(date) => setCheckIn(date as Date)}
						selectsStart
						startDate={checkIn}
						endDate={checkOut}
						minDate={minDate}
						maxDate={maxDate}
						placeholderText="Check-in Date"
						className="min-w-full bg-white rounded p-2 focus:outline-none"
						wrapperClassName="min-w-full"
					/>
				</div>
				{/* check-out date */}
				<div>
					<DatePicker
						selected={checkOut}
						onChange={(date) => setCheckOut(date as Date)}
						selectsStart
						startDate={checkIn}
						endDate={checkOut}
						minDate={minDate}
						maxDate={maxDate}
						placeholderText="Check-in Date"
						className="min-w-full bg-white rounded p-2 focus:outline-none"
						wrapperClassName="min-w-full"
					/>
				</div>

				<div className="flex gap-2 sm:col-span-2 lg:col-span-1">
					<button className="bg-sky-400 text-white h-full w-2/3 p-2 font-bold hover:bg-sky-500 rounded">
						Search
					</button>
					<button className="bg-red-500 text-white h-full w-1/3 p-2 font-bold hover:bg-red-600 rounded">
						Clear
					</button>
				</div>
			</form>
		</>
	);
};

export default SearchBar;

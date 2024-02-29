import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useSearchContext } from '../../contexts/SearchContext';
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
	hotelId: string;
	pricePerNight: number;
};

type GuestInfoFormData = {
	checkIn: Date;
	checkOut: Date;
	adultCount: number;
	childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
	const { isLoggedIn } = useAppContext();
	const search = useSearchContext();
	const navigate = useNavigate();
	const location = useLocation();

	const {
		watch,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<GuestInfoFormData>({
		defaultValues: {
			// populate from search context (search bar) through hotel info form
			checkIn: search.checkIn,
			checkOut: search.checkOut,
			adultCount: search.adultCount,
			childCount: search.childCount,
		},
	});

	const checkIn = watch('checkIn');
	const checkOut = watch('checkOut');

	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	const onSignInClick = (data: GuestInfoFormData) => {
		search.saveSearchValues(
			'', // for destination
			data.checkIn,
			data.checkOut,
			data.adultCount,
			data.childCount,
		);
		navigate('/login', { state: { from: location } }); // navigate back to booking page after login is done
	};

	const onSubmit = (data: GuestInfoFormData) => {
		search.saveSearchValues(
			'', // for destination
			data.checkIn,
			data.checkOut,
			data.adultCount,
			data.childCount,
		);
		navigate(`/hotel/${hotelId}/booking`);
	};

	return (
		<div className="flex flex-col p-4 bg-sky-300 gap-4 rounded-md">
			<h3 className="text-md font-bold">${pricePerNight} Per Night</h3>
			<form
				onSubmit={
					isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
				}
			>
				<div className="grid grid-cols-1 gap-4 items-center">
					<div>
						<DatePicker
							required
							selected={checkIn}
							onChange={(date) => setValue('checkIn', date as Date)}
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
					<div>
						<DatePicker
							required
							selected={checkOut}
							onChange={(date) => setValue('checkOut', date as Date)}
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

					{/* number of people */}
					<div className="flex bg-white px-2 py-1 rounded gap-2 ">
						<label className="flex items-center">
							Adults:
							<input
								type="number"
								className="w-full p-1 focus:outline-none font-bold"
								min={1}
								max={20}
								{...register('adultCount', {
									required: 'This field is required',
									min: {
										value: 1,
										message: 'There must be at least 1 adult',
									},
									valueAsNumber: true,
								})}
							/>
						</label>
						<label className="flex items-center">
							Children:
							<input
								type="number"
								className="w-full p-1 focus:outline-none font-bold"
								min={0}
								max={20}
								{...register('childCount', {
									valueAsNumber: true,
								})}
							/>
						</label>
						{errors.adultCount && (
							<span className="text-red-500 font-semibold">
								{errors.adultCount.message}
							</span>
						)}
					</div>

					{/* booking button */}
					{isLoggedIn ? (
						<button className="bg-sky-500 text-white h-full p-2 font-bold hover:bg-sky-400 rounded">
							Book now
						</button>
					) : (
						<button className="bg-sky-500 text-white h-full p-2 font-bold hover:bg-sky-400 rounded">
							Sign in to book
						</button>
					)}
				</div>
			</form>
		</div>
	);
};
export default GuestInfoForm;

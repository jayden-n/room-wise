import { Link, useNavigate } from 'react-router-dom';
import * as apiClient from '../api-client';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useAppContext } from '../contexts/AppContext';
import { FaLocationDot } from 'react-icons/fa6';
import { FaBuilding } from 'react-icons/fa';
import { FaMoneyBill } from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

type Props = {
	queryClient: QueryClient;
};

const MyHotels = ({ queryClient }: Props) => {
	const navigate = useNavigate();
	const { showToast } = useAppContext();
	const { data: hotelData } = useQuery(
		'fetchMyHotels',
		apiClient.fetchMyHotels,
		{
			onError: () => {
				showToast({ message: 'Error fetching hotels', type: 'ERROR' });
			},
		},
	);

	const { mutate, isLoading } = useMutation(apiClient.deleteHotelById, {
		onSuccess: () => {
			showToast({ message: 'Hotel deleted!', type: 'SUCCESS' });
		},
		onError: () => {
			showToast({ message: 'Error deleting hotel', type: 'ERROR' });
		},
		onSettled: () => {
			queryClient.invalidateQueries(['fetchMyHotels']);
			navigate('/my-hotels');
		},
	});

	const handleDelete = (hotelId: string) => {
		mutate(hotelId);
	};

	return (
		<div className="space-y-5">
			<span className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">
					{hotelData?.length === 0 ? 'No hotel found :(' : 'My hotels'}
				</h1>
				<Link
					to="/add-hotel"
					className=" bg-sky-500 font-bold p-2 rounded-md text-xl text-white hover:bg-sky-400"
				>
					Add hotel
				</Link>
			</span>

			<div className="grid  grid-cols-1 gap-8">
				{hotelData?.map((hotel) => {
					return (
						<div
							key={hotel._id}
							className="flex flex-col border bg-zinc-50 border-zinc-100 p-8 rounded-lg gap-5"
						>
							<h2 className="text-2xl font-semibold">Name: {hotel.name}</h2>
							<div className="whitespace-pre-line">
								Desc: {hotel.description}
							</div>

							{/* hotel info */}
							<div className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
								<div className="border border-zinc-300 flex rounded-md justify-center items-center gap-2 p-4">
									<FaLocationDot />
									{hotel.city}, {hotel.country}
								</div>
								<div className="border border-zinc-300 flex rounded-md  justify-center items-center gap-2 p-4">
									<FaBuilding />
									{hotel.type}
								</div>
								<div className="border border-zinc-300 flex rounded-md justify-center items-center gap-2 p-4">
									<FaMoneyBill />${hotel.pricePerNight} per night
								</div>
								<div className="border border-zinc-300 rounded-md  flex justify-center items-center gap-2 p-4">
									<FaStar />
									{hotel.starRating} star{hotel.starRating > 1 && 's'}
								</div>
								<div className="border border-zinc-300 rounded-md sm:col-span-2 flex justify-center items-center gap-2 p-4">
									<FaBed />
									{hotel.adultCount} adults, {hotel.childCount} children
								</div>
							</div>
							<span className="flex justify-end gap-4">
								<button
									onClick={() => handleDelete(hotel._id)}
									className="bg-red-500 hover:bg-red-400 font-bold p-2 rounded-md text-xl text-white"
									disabled={isLoading}
								>
									Delete
								</button>
								<Link
									to={`/edit-hotel/${hotel._id}`}
									className="bg-zinc-400 hover:bg-zinc-300 font-bold p-2 rounded-md text-xl text-white"
								>
									View Details
								</Link>
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default MyHotels;

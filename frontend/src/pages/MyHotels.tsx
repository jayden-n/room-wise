import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';
import { useQuery } from 'react-query';
import { useAppContext } from '../contexts/AppContext';
import { FaLocationDot } from 'react-icons/fa6';
import { FaBuilding } from 'react-icons/fa';
import { FaMoneyBill } from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

const MyHotels = () => {
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

	if (!hotelData) {
		return <span>No hotel found</span>;
	}

	return (
		<div className="space-y-5">
			<span className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">My Hotels</h1>
				<Link
					to="/add-hotel"
					className=" bg-sky-500 font-bold p-2 rounded-md text-xl text-white hover:bg-sky-400"
				>
					Add hotel
				</Link>
			</span>

			<div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
				{hotelData.map((hotel) => {
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
							<div className="grid lg:grid-cols-3 grid-cols-1 gap-4 ">
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
							<span className="flex justify-end">
								<Link
									to={`/edit-hotel/${hotel._id}`}
									className='	className=" bg-zinc-400 hover:bg-zinc-300 font-bold p-2 rounded-md text-xl text-white "'
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

import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';
import { useQuery } from 'react-query';
import { useAppContext } from '../contexts/AppContext';

const MyHotels = () => {
	const { showToast } = useAppContext();
	// fetching data my-hotels
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
					className="flex bg-sky-500 font-bold p-2 rounded-md text-xl text-white hover:bg-sky-400"
				>
					Add hotel
				</Link>
			</span>

			<div className="grid grid-cols-1 gap-8">
				{hotelData.map((hotel) => {
					return <div key={hotel._id}>{hotel.city}</div>;
				})}
			</div>
		</div>
	);
};
export default MyHotels;

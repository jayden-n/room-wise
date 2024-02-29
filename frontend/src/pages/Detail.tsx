import { QueryClient, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import { useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm';

type Props = {
	queryClient: QueryClient;
};

const Detail = ({ queryClient }: Props) => {
	const { hotelId } = useParams();
	const { data: hotel } = useQuery(
		['fetchHotelById', hotelId], // send back id to memorize the latest hotel data
		() => apiClient.fetchHotelById(hotelId || ''),
		{
			enabled: !!hotelId, // check if hotelId has an actual value
		},
	);

	useEffect(() => {
		if (hotelId) {
			queryClient.invalidateQueries(['fetchHotelById', hotelId]);
		}
	}, [queryClient, hotelId]);

	if (!hotel) {
		return <p>Loading</p>;
	}

	return (
		<div className="space-y-6">
			<div>
				<span className="flex">
					{Array.from({ length: hotel.starRating }).map(() => (
						<AiFillStar className="fill-yellow-400" />
					))}
				</span>
				<h1 className="text-3xl font-bold">{hotel.name}</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{hotel.imageUrls.map((image) => (
					<div className="h-[300px]">
						<img
							src={image}
							alt={hotel.name}
							className="rounded-md w-full h-full object-cover object-center"
						/>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
				{hotel.facilities.map((facility) => (
					<div className="border border-zinc-300 rounded-sm p-3">
						{facility}
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
				<div className="whitespace-pre-line">{hotel.description}</div>
				<div className="h-fit">
					<GuestInfoForm
						hotelId={hotel._id}
						pricePerNight={hotel.pricePerNight}
					/>
				</div>
			</div>
		</div>
	);
};
export default Detail;

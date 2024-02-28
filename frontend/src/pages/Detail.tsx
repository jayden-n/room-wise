import { QueryClient, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import { useEffect } from 'react';

type Props = {
	queryClient: QueryClient;
};

const Detail = ({ queryClient }: Props) => {
	const { hotelId } = useParams();
	const { data: hotel } = useQuery(
		['fetchHotelById', hotelId], // send back id to memorize the latest hotel data
		() => apiClient.fetchHotelById(hotelId as string),
		{
			enabled: !!hotelId, // check if hotelId has an actual value
		},
	);

	useEffect(() => {
		if (hotelId) {
			queryClient.invalidateQueries(['fetchHotelById', hotelId]);
		}
	}, [queryClient, hotelId]);

	console.log(hotel);
	return <div>Detail</div>;
};
export default Detail;

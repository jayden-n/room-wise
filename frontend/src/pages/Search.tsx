import { useQuery } from 'react-query';
import { useSearchContext } from '../contexts/SearchContext';
import * as apiClient from '../api-client';
import { useState } from 'react';

const Search = () => {
	const search = useSearchContext();
	const [page, setPage] = useState<number>(1);

	// convert all to type string before fetching
	const searchParams = {
		destination: search.destination,
		checkIn: search.checkIn.toISOString(),
		checkOut: search.checkOut.toISOString(),
		adultCount: search.adultCount.toString(),
		childCount: search.childCount.toString(),
		page: page.toString(),
	};

	const { data: hotelData, isLoading: isSearchHotelLoading } = useQuery(
		['searchHotels', searchParams],
		() => apiClient.searchHotels(searchParams),
	);
	return (
		<div>
			{isSearchHotelLoading ? (
				<h2>Loading...</h2>
			) : (
				<h1>
					{hotelData?.data.map((hotel) => (
						<div>{hotel.name}</div>
					))}
				</h1>
			)}
		</div>
	);
};
export default Search;

import { useQuery } from 'react-query';
import { useSearchContext } from '../contexts/SearchContext';
import * as apiClient from '../api-client';
import { useState } from 'react';
import SearchResultCard from '../components/SearchResultCard';
import Pagination from '../components/Pagination';

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
		<>
			{isSearchHotelLoading ? (
				<h2>Loading...</h2>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
					<div className="sticky rounded-md border border-zinc-300 p-5 h-fit">
						<div className="space-y-5">
							<h3 className="font-semibold text-lg border-b pb-5 border-zinc-300">
								Filter by:
							</h3>
							{/* todo: filters */}
						</div>
					</div>
					<div className="flex flex-col gap-5">
						<div className="flex justify-between items-center">
							<span className="text-xl font-bold">
								{hotelData?.pagination.total} hotels found
								{search.destination ? ` in ${search.destination}` : ''}
							</span>
							{/* toto: sort options */}
						</div>

						{hotelData?.data.map((hotel) => (
							<SearchResultCard key={hotel._id} hotel={hotel} />
						))}

						<div>
							<Pagination
								page={hotelData?.pagination.page || 1}
								pages={hotelData?.pagination.pages || 1}
								onPageChange={(page) => setPage(page)}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default Search;

import { useQuery } from 'react-query';
import { useSearchContext } from '../contexts/SearchContext';
import * as apiClient from '../api-client';
import { useState } from 'react';
import SearchResultCard from '../components/SearchResultCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';
import HotelTypesFilter from '../components/HotelTypesFilter';
import HotelFacilitiesFilter from '../components/HotelFacilitiesFilters';
import PriceFilter from '../components/PriceFilter';

const Search = () => {
	const search = useSearchContext();
	const [page, setPage] = useState<number>(1);
	const [selectedStars, setSelectedStars] = useState<string[]>([]);
	const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
	const [selectedHotelFacilities, setSelectedHotelFacilities] = useState<
		string[]
	>([]);
	const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

	// convert all to type string before fetching
	const searchParams = {
		destination: search.destination,
		checkIn: search.checkIn.toISOString(),
		checkOut: search.checkOut.toISOString(),
		adultCount: search.adultCount.toString(),
		childCount: search.childCount.toString(),
		page: page.toString(),

		stars: selectedStars,
		types: selectedHotelTypes,
		facilities: selectedHotelFacilities,
		maxPrice: selectedPrice?.toString(), // optional
	};

	const { data: hotelData, isLoading: isSearchHotelLoading } = useQuery(
		['searchHotels', searchParams],
		() => apiClient.searchHotels(searchParams),
	);

	// ========================= Stars Filter =========================
	const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const starRating = event.target.value;

		setSelectedStars((prevStars) =>
			event.target.checked
				? [...prevStars, starRating]
				: prevStars.filter((star) => star !== starRating),
		);
	};

	// ========================= Hotel Types =========================
	const handleHotelTypesChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const hotelType = event.target.value;

		setSelectedHotelTypes((prevHotelTypes) =>
			event.target.checked
				? [...prevHotelTypes, hotelType]
				: prevHotelTypes.filter((type) => type !== hotelType),
		);
	};

	// ========================= Hotel Facilities =========================
	const handleHotelFacilitiesChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const hotelFacilities = event.target.value;

		setSelectedHotelFacilities((prevHotelFacilities) =>
			event.target.checked
				? [...prevHotelFacilities, hotelFacilities]
				: prevHotelFacilities.filter(
						(facilities) => facilities !== hotelFacilities,
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  ),
		);
	};

	return (
		<>
			{isSearchHotelLoading ? (
				<h2>Loading...</h2>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
					<div className="lg:top-10 lg:sticky rounded-md border border-zinc-300 p-5 lg:h-fit">
						<div className="space-y-5">
							<h3 className="font-semibold text-lg border-b pb-5 border-zinc-300">
								Filter by:
							</h3>

							{/* todo: filters (checked) */}
							<StarRatingFilter
								selectedStars={selectedStars}
								onChange={handleStarsChange}
							/>

							<HotelTypesFilter
								selectedHotelTypes={selectedHotelTypes}
								onChange={handleHotelTypesChange}
							/>

							<HotelFacilitiesFilter
								selectedHotelFacility={selectedHotelFacilities}
								onChange={handleHotelFacilitiesChange}
							/>

							<PriceFilter
								selectedPrice={selectedPrice}
								onChange={(value?: number) => setSelectedPrice(value)}
							/>
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

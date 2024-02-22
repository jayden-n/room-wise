import { AiFillStar } from 'react-icons/ai';
import { HotelType } from '../../../backend/src/shared/types';
import { Link } from 'react-router-dom';

type Props = {
	hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
	console.log(hotel);
	const hotelImage = hotel.imageUrls[0];
	const hotelStarRating = hotel.starRating;
	const hotelType = hotel.type;
	const hotelName = hotel.name;
	const hotelDescription = hotel.description;
	const hotelFacilities = hotel.facilities;
	const hotelPricePerNight = hotel.pricePerNight;

	return (
		<div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-zinc-100  shadow-lg  rounded-md p-8 gap-8">
			<div className="w-full h-[300px]">
				<img
					src={hotelImage}
					alt="hotel image"
					className="w-full rounded-md h-full object-cover object-center"
				/>
			</div>

			<div className="grid md:grid-rows-[1fr_2fr_1fr] grid-rows-[1fr_1.5fr_1fr]">
				{/* stars & hotel name */}
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<span className="flex">
							{Array.from({ length: hotelStarRating }).map(() => (
								<AiFillStar className="fill-yellow-400" />
							))}
						</span>
						<span className="text-sm italic">{hotelType}</span>
					</div>

					<Link
						to={`/detail/${hotel._id}`}
						className="font-semibold text-2xl cursor-pointer hover:underline"
					>
						{hotelName}
					</Link>
				</div>

				{/* description */}
				<div className="mt-4 text-zinc-600">
					<p className="line-clamp-4">{hotelDescription}</p>
				</div>

				{/* facilities & price & "View More" */}
				<div className="grid grid-cols-1 md:grid-cols-2 items-end whitespace-nowrap">
					<div className="flex gap-1 items-center">
						{/* get the first 3 */}
						{hotelFacilities.slice(0, 3).map((facility) => (
							<span className="p-2 font-bold  text-xs whitespace-nowrap bg-zinc-300 rounded-lg">
								{facility}
							</span>
						))}

						{/* get the remaining facilities */}
						<span className="text-sm">
							{hotelFacilities.length > 3 &&
								`+${hotelFacilities.length - 3} more`}
						</span>
					</div>

					{/* price per night */}
					<div className="flex flex-col gap-1 items-center  md:items-end whitespace-nowrap">
						<span className="font-semibold italic md:mr-1 md:mt-0 mt-4">
							${hotelPricePerNight} <span> per night</span>
						</span>

						<Link
							to={`/detail/${hotel._id}`}
							className="p-2 flex items-center justify-center h-full text-xl max-w-full md:max-w-fit bg-sky-400 text-white font-semibold rounded-lg hover:bg-sky-500 w-full "
						>
							View More
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SearchResultCard;

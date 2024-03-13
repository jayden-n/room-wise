import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
	hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
	return (
		<Link
			to={`/detail/${hotel._id}`}
			className="relative cursor-pointer overflow-hidden rounded-md group"
		>
			<div className="h-[300px] group-hover:scale-110 duration-300 transition-all ease-in-out">
				<img
					src={hotel.imageUrls[0]}
					alt={hotel.name}
					className="w-full h-full object-cover object-center"
				/>
			</div>

			<div className="absolute bottom-0 p-4 backdrop-blur-sm bg-black/25 bg-opacity-50 w-full rounded-b-md">
				<span className="text-white font-bold tracking-tight text-2xl">
					{hotel.name}
				</span>
			</div>
		</Link>
	);
};
export default LatestDestinationCard;

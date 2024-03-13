import { QueryClient, useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";
import FAQ from "../components/FAQ";

type Props = {
	queryClient: QueryClient;
};

const Home = ({ queryClient }: Props) => {
	const { data: hotels } = useQuery("fetchHotels", apiClient.fetchHotels, {
		onSuccess: async () => {
			await queryClient.invalidateQueries("fetchHotels"); // Manually trigger a re-fetch
		},
	});
	const topRowHotels = hotels?.slice(0, 2) || [];
	const bottomRowHotels = hotels?.slice(2) || []; // take in the rest starts from index 2
	return (
		<div className="grid grid-cols-1 gap-12">
			<div className="space-y-3">
				<h2 className="text-3xl font-bold">Latest Destinations</h2>
				<p>Most recent destinations added by our hosts</p>

				{hotels?.length === 0 ? (
					<span className="italic text-3xl">
						There is no hotel currently. Please add some...
					</span>
				) : (
					<div className="grid gap-4">
						<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
							{topRowHotels.map((hotel) => (
								<LatestDestinationCard hotel={hotel} />
							))}
						</div>
						<div className="grid md:grid-cols-3 gap-4">
							{bottomRowHotels.map((hotel) => (
								<LatestDestinationCard hotel={hotel} />
							))}
						</div>
					</div>
				)}
			</div>
			<FAQ />
		</div>
	);
};
export default Home;

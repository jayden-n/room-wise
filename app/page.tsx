"use client";
import Home from "@/components/Home";
import Error from "./error";

const getRooms = async (searchParams: string) => {
	const urlParams = new URLSearchParams(searchParams);
	const queryString = urlParams.toString();

	const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, {
		// always return fresh data
		cache: "no-cache",
	});
	return res.json();
};

export default async function HomePage({
	searchParams,
}: {
	searchParams: string;
}) {
	const data = await getRooms(searchParams);

	// errMessage
	if (data?.message) {
		return <Error error={data} />;
	}
	return (
		<>
			<Home data={data} />
		</>
	);
}

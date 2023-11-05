'use client';
import Error from '@/app/error';
import RoomDetails from '@/components/room/RoomDetails';

interface IProps {
	params: {
		id: string;
	};
}

const getRoom = async (id: string) => {
	const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {
		// always return fresh data
		cache: 'no-cache',
	});
	return res.json();
};

export default async function RoomDetailsPage({ params }: IProps) {
	const data = await getRoom(params?.id);

	// errMessage
	if (data?.message) {
		return <Error error={data} />;
	}

	console.log(data);
	return (
		<>
			<RoomDetails data={data} />
		</>
	);
}

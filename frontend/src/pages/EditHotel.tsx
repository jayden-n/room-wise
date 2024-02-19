import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { useParams } from 'react-router-dom';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';

const EditHotel = () => {
	const { hotelId } = useParams();

	const { data: singleHotelData } = useQuery(
		'fetchMyHotelById',
		() => apiClient.fetchMyHotelById(hotelId || ''),
		{
			enabled: !!hotelId, // check if hotelId has an actual value
		},
	);

	return <ManageHotelForm hotel={singleHotelData} />;
};

export default EditHotel;

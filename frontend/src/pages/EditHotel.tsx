import { useMutation, useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { useParams } from 'react-router-dom';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';

const EditHotel = () => {
	const { showToast } = useAppContext();
	const { hotelId } = useParams();

	const { data: singleHotelData } = useQuery(
		'fetchMyHotelById',
		() => apiClient.fetchMyHotelById(hotelId || ''),
		{
			enabled: !!hotelId, // check if hotelId has an actual value
		},
	);

	const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
		onSuccess: () => {
			showToast({ message: 'Hotel saved!', type: 'SUCCESS' });
		},
		onError: () => {
			showToast({ message: 'Error saving hotel', type: 'ERROR' });
		},
	});

	const handleSave = (updatedHotelFormData: FormData) => {
		mutate(updatedHotelFormData);
	};

	return (
		<ManageHotelForm
			onSave={handleSave}
			hotel={singleHotelData}
			isLoading={isLoading}
		/>
	);
};

export default EditHotel;

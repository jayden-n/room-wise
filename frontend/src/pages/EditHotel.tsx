import { QueryClient, useMutation, useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { useNavigate, useParams } from 'react-router-dom';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';

type Props = {
	queryClient: QueryClient;
};

const EditHotel = ({ queryClient }: Props) => {
	const navigate = useNavigate();
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
		onSettled: () => {
			queryClient.invalidateQueries(['fetchMyHotels']);
			navigate('/my-hotels');
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

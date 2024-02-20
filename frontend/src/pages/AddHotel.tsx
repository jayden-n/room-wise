import { QueryClient, useMutation } from 'react-query';
import * as apiClient from '../api-client';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

type Props = {
	queryClient: QueryClient;
};

const AddHotel = ({ queryClient }: Props) => {
	const navigate = useNavigate();
	const { showToast } = useAppContext();
	const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
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

	const handleSave = (hotelFormData: FormData) => {
		mutate(hotelFormData);
	};

	return (
		<>
			<ManageHotelForm onSave={handleSave} isLoading={isLoading} />
		</>
	);
};
export default AddHotel;

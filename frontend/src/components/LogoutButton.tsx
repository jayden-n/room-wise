import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
const LogoutButton = () => {
	// get the "queryKey" that calls the GET method
	const queryClient = useQueryClient();

	const { showToast } = useAppContext();

	const mutation = useMutation(apiClient.logout, {
		onSuccess: async () => {
			// show toast
			showToast({ message: 'Logged out', type: 'SUCCESS' });
			// force the "validateToken" fn to run again
			// => to check the expired token
			await queryClient.invalidateQueries('validateToken');
		},

		onError: (error: Error) => {
			showToast({ message: error.message, type: 'ERROR' });
		},
	});

	const handleClick = () => {
		mutation.mutate();
	};
	return (
		<button
			onClick={handleClick}
			className="text-sky-500 px-3 font-bold bg-white rounded hover:bg-gray-100"
		>
			Log out
		</button>
	);
};
export default LogoutButton;

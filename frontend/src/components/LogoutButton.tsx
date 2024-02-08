import { useMutation } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
const LogoutButton = () => {
	const { showToast } = useAppContext();

	const mutation = useMutation(apiClient.logout, {
		onSuccess: () => {
			// show toast
			showToast({ message: 'User logged out successfully', type: 'SUCCESS' });
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

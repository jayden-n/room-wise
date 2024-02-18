import React, { useContext, useState } from 'react';
import Toast from '../components/Toast';
import { useQuery } from 'react-query';
import * as apiClient from '../api-client';

type ToastMessage = {
	message: string;
	type: 'SUCCESS' | 'ERROR';
};

type AppContext = {
	showToast: (toastMessage: ToastMessage) => void;
	isLoggedIn: boolean;
};

// when app first loads, will be "undefined"
const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
	const { isError } = useQuery('validateToken', apiClient.validateToken, {
		retry: false,
	});

	return (
		<AppContext.Provider
			value={{
				showToast: (toastMessage) => {
					setToast(toastMessage);
				},
				// isLoggedIn will be passed when isError that you get from response is true
				isLoggedIn: !isError,
			}}
		>
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					// after 5 seconds, toast will be undefined => re-render
					onClose={() => {
						setToast(undefined);
					}}
				/>
			)}
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	return context as AppContext;
};

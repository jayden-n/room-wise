import React, { useContext, useState } from 'react';
import Toast from '../components/Toast';
import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const STRIPE_PUB_KEY = (import.meta.env.VITE_STRIPE_PUB_KEY as string) || '';

type ToastMessage = {
	message: string;
	type: 'SUCCESS' | 'ERROR';
};

type AppContext = {
	showToast: (toastMessage: ToastMessage) => void;
	isLoggedIn: boolean;
	stripePromise: Promise<Stripe | null>;
};

// when app first loads, will be "undefined"
const AppContext = React.createContext<AppContext | undefined>(undefined);
const stripePromise = loadStripe(STRIPE_PUB_KEY);

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
				stripePromise,
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

import React, { useContext, useState } from 'react';
import Toast from '../components/Toast';

type ToastMessage = {
	message: string;
	type: 'SUCCESS' | 'ERROR';
};

type AppContext = {
	showToast: (toastMessage: ToastMessage) => void;
};

// when app first loads, will be "undefined"
const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

	return (
		<AppContext.Provider
			value={{
				showToast: (toastMessage) => {
					// message & type will be sent back to "toast" state here
					setToast(toastMessage);
				},
			}}
		>
			{/* if "toast" has values, "Toast" component will render,
            and passing props for it to conditionally operate */}
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

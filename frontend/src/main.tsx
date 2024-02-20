import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppContextProvider } from './contexts/AppContext.tsx';
import { SearchContextProvider } from './contexts/SearchContext.tsx';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0, // will not retry to request to Server if app has an error => more expensive
			staleTime: 1000 * 60 * 3, // milliseconds => data will be cached for 3 minutes before requesting to server again
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppContextProvider>
				<SearchContextProvider>
					<App />
				</SearchContextProvider>
			</AppContextProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);

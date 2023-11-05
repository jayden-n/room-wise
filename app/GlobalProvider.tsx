'use client';

// provider config for app
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export function GlobalProvider({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Toaster />
			<SessionProvider>{children}</SessionProvider>
		</>
	);
}

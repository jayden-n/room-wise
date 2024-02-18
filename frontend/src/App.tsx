import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import { useAppContext } from './contexts/AppContext';
import AddHotel from './pages/AddHotel';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';

function App() {
	const { isLoggedIn } = useAppContext();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout>Homepage</Layout>} />
				<Route path="/search" element={<Layout>Search Page</Layout>} />
				<Route
					path="/register"
					element={
						<Layout>
							<Register />
						</Layout>
					}
				/>
				<Route
					path="/login"
					element={
						<Layout>
							<Login />
						</Layout>
					}
				/>

				{/* only logged-in user can be able to add hotel */}
				{isLoggedIn && (
					<>
						<Route
							path="/add-hotel"
							element={
								<Layout>
									<AddHotel />
								</Layout>
							}
						/>
						<Route
							path="/my-hotels"
							element={
								<Layout>
									<MyHotels />
								</Layout>
							}
						/>
						<Route
							path="/edit-hotel/:id"
							element={
								<Layout>
									<EditHotel />
								</Layout>
							}
						/>
					</>
				)}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

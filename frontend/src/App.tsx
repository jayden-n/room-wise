import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import { useAppContext } from './contexts/AppContext';
import AddHotel from './pages/AddHotel';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import { useQueryClient } from 'react-query';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Booking from './pages/Booking';

function App() {
	const { isLoggedIn } = useAppContext();
	const queryClient = useQueryClient();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout>Homepage</Layout>} />
				<Route
					path="/search"
					element={
						<Layout>
							<Search />
						</Layout>
					}
				/>
				<Route
					path="/detail/:hotelId"
					element={
						<Layout>
							<Detail queryClient={queryClient} />
						</Layout>
					}
				/>
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
							path="/hotel/:hotelId/booking"
							element={
								<Layout>
									<Booking />
								</Layout>
							}
						/>

						<Route
							path="/add-hotel"
							element={
								<Layout>
									<AddHotel queryClient={queryClient} />
								</Layout>
							}
						/>
						<Route
							path="/edit-hotel/:hotelId"
							element={
								<Layout>
									<EditHotel queryClient={queryClient} />
								</Layout>
							}
						/>
						<Route
							path="/my-hotels"
							element={
								<Layout>
									<MyHotels queryClient={queryClient} />
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

import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const Header = () => {
	const { isLoggedIn } = useAppContext();

	return (
		<div className="bg-sky-500 py-6">
			<div className="container mx-auto flex justify-between">
				<span className="text-3xl font-bold tracking-tight text-white">
					<Link to="/">Room Wise</Link>
				</span>

				<span className="flex space-x-2">
					{/* if user logged in: */}
					{isLoggedIn ? (
						<>
							<Link to="/my-bookings">My Bookings</Link>
							<Link to="/my-hotels">My Hotels</Link>
							<button>Sign Out</button>
						</>
					) : (
						<Link
							to="/login"
							className="flex cursor-pointer items-center rounded bg-white px-3 font-bold text-sky-700 hover:bg-gray-100"
						>
							Login
						</Link>
					)}
				</span>
			</div>
		</div>
	);
};
export default Header;

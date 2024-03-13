import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LogoutButton from "./LogoutButton";
import DrawOutlineButton from "./DrawOutlineButton";

const Header = () => {
	const { isLoggedIn } = useAppContext();

	return (
		<div className="bg-sky-500 py-6">
			<div className="container mx-auto flex justify-between">
				<span className="text-4xl font-hotel font-bold tracking-tight text-white">
					<Link to="/">Room Wise</Link>
				</span>

				<span className="flex space-x-2">
					{/* if user logged in: */}
					{isLoggedIn ? (
						<>
							<Link
								className="grid place-content-center bg-sky-500  "
								to="/my-bookings"
							>
								<DrawOutlineButton>My Bookings</DrawOutlineButton>
							</Link>
							<Link
								className="grid place-content-center bg-sky-500 "
								to="/my-hotels"
							>
								<DrawOutlineButton>My Hotels</DrawOutlineButton>
							</Link>

							{/* LOGOUT */}
							<LogoutButton />
						</>
					) : (
						<Link
							to="/login"
							className="flex cursor-pointer items-center rounded bg-white px-4 py-2 font-bold text-sky-600 hover:bg-gray-100"
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

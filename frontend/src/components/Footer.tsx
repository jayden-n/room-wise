import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="bg-sky-500 py-10">
			<div className="container mx-auto flex items-center justify-between">
				<span className="text-4xl font-hotel font-bold tracking-tight text-white">
					<Link to="/">Room Wise</Link>
				</span>
				<span className="flex gap-4 font-bold tracking-tight text-white">
					{/* NOTE: make pages for links */}
					<p className="cursor-not-allowed">About Us</p>
					<p className="cursor-not-allowed">Terms of Services</p>
				</span>
			</div>
		</div>
	);
};
export default Footer;

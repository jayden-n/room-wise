import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
	//   const foundedYear = 2023;
	const currentYear = new Date().getFullYear();

	return (
		<div className="container mx-auto bottom-0 mt-4 text-primary">
			<div className="grid md:grid-cols-2">
				<div className="flex w-full justify-evenly md:max-w-[300px]">
					<div>
						<h2 className="mb-2 text-xl font-bold">Support</h2>
						<ul>
							<li className="cursor-not-allowed py-2 text-sm">About Us</li>
							<li className="cursor-not-allowed py-2 text-sm">
								Terms of Services
							</li>
						</ul>
					</div>
					<div className="md:ml-4">
						<h2 className="mb-2 text-xl font-bold">For Developers</h2>
						<ul>
							<li className="cursor-not-allowed py-2 text-sm">Career</li>
							<li className="cursor-not-allowed py-2 text-sm">Documentation</li>
						</ul>
					</div>
				</div>
				<div className="text-right">
					<div className="flex w-full justify-end">
						<div className="relative w-full py-4 md:w-[300px]">
							<p className="text-center text-xl font-bold md:text-right">
								Wanna become our partner?
							</p>
							<div className="py-4">
								<div>
									<input
										className="mr-2 w-full cursor-not-allowed rounded-md border border-input bg-thirdary p-2 shadow-xl md:w-auto"
										type="email"
										placeholder="Enter Your Email"
									/>
									<button className="my-2 w-full cursor-not-allowed rounded-md bg-button p-2 px-4 font-bold text-btnText shadow-xl hover:shadow-2xl md:w-auto">
										Collab!
									</button>
								</div>
							</div>
							<div className="flex justify-between px-4 pb-2 pt-4 text-accent ">
								<a
									href="https://github.com/jayden-n/room-wise"
									target="_blank"
									rel="noreferrer"
								>
									<FaGithub className="cursor-pointer" />
								</a>
								<AiOutlineInstagram className="cursor-not-allowed" />
								<FaFacebookF className="cursor-not-allowed" />
								<FaTwitter className="cursor-not-allowed" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<p className="pb-6 pt-4 text-center text-sm">
				&copy; {currentYear} <span className="font-bold"> Room Wise</span>, Inc.
				All rights reserved.
			</p>
		</div>
	);
};

export default Footer;

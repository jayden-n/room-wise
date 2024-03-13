import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const Question = ({
	title,
	children,
	defaultOpen = false,
}: {
	title: string;
	children: JSX.Element;
	defaultOpen?: boolean;
}) => {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<motion.div
			animate={open ? "open" : "closed"}
			className="border-b-[1px] border-b-slate-300"
		>
			<button
				onClick={() => setOpen((pv) => !pv)}
				className="flex w-full items-center justify-between gap-4 py-6"
			>
				<motion.span
					variants={{
						open: {
							color: "rgba(3, 6, 23, 0)",
						},
						closed: {
							color: "rgba(3, 6, 23, 1)",
						},
					}}
					className="bg-gradient-to-r from-sky-500 to-sky-500 bg-clip-text text-left text-lg font-medium"
				>
					{title}
				</motion.span>
				<motion.span
					variants={{
						open: {
							rotate: "180deg",
							color: "rgb(56 189 248)",
						},
						closed: {
							rotate: "0deg",
							color: "#030617",
						},
					}}
				>
					<FiChevronDown className="text-2xl" />
				</motion.span>
			</button>
			<motion.div
				initial={false}
				animate={{
					height: open ? "70px" : "0px",
					marginBottom: open ? "24px" : "0px",
				}}
				className="overflow-hidden text-slate-600"
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default Question;

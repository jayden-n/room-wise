export type Props = {
	page: number;
	pages: number;
	onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
	const pageNumbers = [];

	// 2 pages: i <= 2; i++
	for (let i = 1; i <= pages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="flex justify-center">
			<div className="flex border border-slate-300">
				{pageNumbers.map((number) => (
					<button
						onClick={() => onPageChange(number)}
						className={`px-2 py-1 ${
							page === number ? 'bg-sky-500 font-bold text-white' : ''
						}`}
					>
						{number}
					</button>
				))}
			</div>
		</div>
	);
};

export default Pagination;

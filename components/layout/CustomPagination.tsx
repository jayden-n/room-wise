"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "react-js-pagination";

interface IProps {
	resPerPage: number;
	filteredRoomCount: number;
}

const CustomPagination = ({ resPerPage, filteredRoomCount }: IProps) => {
	const router = useRouter();

	const searchParams = useSearchParams();
	let page = searchParams.get("page") || 1;
	page = Number(page);

	let queryParams;
	const handlePageChange = (currentPage: string) => {
		if (typeof window !== "undefined") {
			queryParams = new URLSearchParams(window.location.search);

			if (queryParams.has("page")) {
				queryParams.set("page", currentPage);
			} else {
				queryParams.append("page", currentPage);
			}

			const path = `${window.location.pathname}?${queryParams.toString()}`;
			router.push(path);
		}
	};

	return (
		<div>
			{resPerPage < filteredRoomCount && (
				<div className='d-flex justify-content-center mt-5'>
					<Pagination
						activePage={page}
						itemsCountPerPage={resPerPage}
						totalItemsCount={filteredRoomCount}
						onChange={handlePageChange}
						nextPageText={"Next"}
						prevPageText={"Prev"}
						firstPageText={"First"}
						lastPageText={"Last"}
						itemClass='page-item'
						linkClass='page-link'
					/>
				</div>
			)}
		</div>
	);
};

export default CustomPagination;

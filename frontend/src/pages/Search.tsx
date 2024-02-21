import { useSearchContext } from '../contexts/SearchContext';

const Search = () => {
	const search = useSearchContext();
	console.log(search);
	return <div>Search page</div>;
};
export default Search;

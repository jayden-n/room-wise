import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-sky-500 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          <Link to="/">Room Wise</Link>
        </span>

        <span className="flex space-x-2">
          <Link
            to="sign-in"
            className="flex cursor-pointer items-center rounded bg-white px-3 font-bold text-sky-700 hover:bg-gray-100"
          >
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Header;

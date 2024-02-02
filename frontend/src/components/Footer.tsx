const Footer = () => {
  return (
    <div className="bg-sky-500 py-10">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          Room Wise
        </span>
        <span className="flex gap-4 font-bold tracking-tight text-white">
          {/* NOTE: make pages for links */}
          <p className="cursor-pointer">About Us</p>
          <p className="cursor-pointer">Terms of Services</p>
        </span>
      </div>
    </div>
  );
};
export default Footer;

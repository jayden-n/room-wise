import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';

interface ILayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<Hero />
			<div className="container mx-auto flex-1 py-10">{children}</div>
			<Footer />
		</div>
	);
};
export default Layout;

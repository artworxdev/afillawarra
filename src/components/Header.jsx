import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false),
		location = useLocation(),
		links = [
			{
				name: 'Home',
				path: '/',
			},
			{
				name: 'About Us',
				path: '/about',
			},
			{
				name: 'Classes',
				path: '/classes',
			},
			{
				name: 'Events',
				path: '/events',
			},
			{
				name: 'Register',
				path: '/register',
			},
			{
				name: 'Contact',
				path: '/contact',
			},
		],
		isActive = (c) => location.pathname === c;
	return (
		<header className="bg-background text-foreground sticky top-0 z-50 shadow-sm border-b border-border">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-28">
					<Link to="/" className="flex items-center flex-shrink-0">
						<img src="/images/logo.png" alt="Alliance Française Illawarra Logo" className="h-20 w-auto object-contain" />
					</Link>
					<nav className="hidden md:flex items-center space-x-2">
						{links.map((c) => (
							<Link
								key={c.path}
								to={c.path}
								className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive(c.path) ? 'text-primary bg-primary/5' : 'text-foreground/80 hover:text-primary hover:bg-primary/5'}`}
							>
								{c.name}
							</Link>
						))}
					</nav>
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden text-foreground hover:text-primary hover:bg-primary/5"
						onClick={() => setMenuOpen(!menuOpen)}
					>
						{menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</Button>
				</div>
			</div>
			{menuOpen && (
				<div className="md:hidden bg-background border-t border-border shadow-lg absolute w-full">
					<nav className="px-4 py-4 space-y-2">
						{links.map((c) => (
							<Link
								key={c.path}
								to={c.path}
								onClick={() => setMenuOpen(false)}
								className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive(c.path) ? 'text-primary bg-primary/5' : 'text-foreground/80 hover:text-primary hover:bg-primary/5'}`}
							>
								{c.name}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header;

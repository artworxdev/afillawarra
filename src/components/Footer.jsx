import { Link } from 'react-router-dom';
import { Facebook, Lock, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => (
	<footer className="bg-secondary text-secondary-foreground">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
				<div>
					<p className="text-sm leading-relaxed opacity-80 max-w-xs">
						This is the official website of the Alliance Francaise Illawarra - promoting French language and culture in the Illawarra
						region.
					</p>
				</div>
				<div>
					<h3 className="text-lg font-semibold mb-6">Quick Links</h3>
					<nav className="space-y-3">
						<Link to="/about" className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-200">
							About Us
						</Link>
						<Link to="/classes" className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-200">
							Classes
						</Link>
						<Link to="/events" className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-200">
							Events
						</Link>
						<Link to="/register" className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-200">
							Register
						</Link>
						<Link to="/contact" className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-200">
							Contact
						</Link>
					</nav>
				</div>
				<div>
					<h3 className="text-lg font-semibold mb-6">Contact Information</h3>
					<div className="space-y-4">
						<div className="flex items-start space-x-3 opacity-80">
							<MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
							<span className="text-sm">Wollongong, NSW, Australia</span>
						</div>
						<div className="flex items-center space-x-3 opacity-80">
							<Phone className="h-5 w-5 flex-shrink-0 text-primary" />
							<span className="text-sm">0401 979 847 (Margaret)</span>
						</div>
						<div className="flex items-center space-x-3 opacity-80">
							<Mail className="h-5 w-5 flex-shrink-0 text-primary" />
							<span className="text-sm">info@afillawarra.com.au</span>
						</div>
					</div>
					<div className="flex items-center space-x-5 mt-8">
						<a
							href="https://www.facebook.com/profile.php?id=100064911393284"
							className="opacity-80 hover:opacity-100 hover:text-primary transition-all duration-200"
						>
							<Facebook className="h-5 w-5" />
						</a>
					</div>
				</div>
			</div>
			<div className="border-t border-secondary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
				<p className="text-sm opacity-60">© {new Date().getFullYear()} Alliance Française Illawarra. All rights reserved.</p>
				<div className="flex space-x-6">
					<Link to="#" className="text-sm opacity-60 hover:opacity-100 hover:text-primary transition-all duration-200">
						Privacy Policy
					</Link>
					<Link to="#" className="text-sm opacity-60 hover:opacity-100 hover:text-primary transition-all duration-200">
						Terms of Service
					</Link>
					<a
						href="/_/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Admin"
						title="Admin"
						className="opacity-40 hover:opacity-100 hover:text-primary transition-all duration-200"
					>
						<Lock className="h-4 w-4" />
					</a>
				</div>
			</div>
		</div>
	</footer>
);

export default Footer;

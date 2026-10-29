import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/sonner';
import About from '@/pages/About';
import Classes from '@/pages/Classes';
import Contact from '@/pages/Contact';
import Events from '@/pages/Events';
import Home from '@/pages/Home';
import Register from '@/pages/Register';

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/classes" element={<Classes />} />
				<Route path="/events" element={<Events />} />
				<Route path="/register" element={<Register />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
			<Toaster />
		</BrowserRouter>
	);
}

export default App;

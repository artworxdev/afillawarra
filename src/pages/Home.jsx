import { ArrowRight, BookOpen, Calendar, Users } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/Footer';

const Home = () => {
	const offerings = [
		{
			icon: BookOpen,
			title: 'French Classes',
			description:
				'Comprehensive language courses for all levels, from complete beginners to advanced speakers. Learn with experienced instructors.',
			link: '/classes',
			color: 'bg-primary/10 text-primary',
		},
		{
			icon: Calendar,
			title: 'Cultural Events',
			description: 'Immerse yourself in French culture through movie screenings, workshops, traditional dinners, and special celebrations.',
			link: '/events',
			color: 'bg-primary/10 text-primary',
		},
		{
			icon: Users,
			title: 'Community',
			description: 'Join a vibrant community of Francophiles and French speakers. Practice your language skills and make new friends.',
			link: '/about',
			color: 'bg-primary/10 text-primary',
		},
	];
	return (
		<>
			<Helmet>
				<title>Alliance Française Illawarra - French Language and Culture</title>
				<meta
					name="description"
					content="Alliance Française Illawarra promotes French language and culture in the Illawarra region through classes, events, and cultural activities. Join our community today."
				/>
			</Helmet>
			<div className="min-h-screen flex flex-col bg-background">
				<Header />
				<main className="flex-grow">
					<section
						className="relative min-h-[100dvh] flex items-center justify-center bg-cover bg-center"
						style={{
							backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/hero.jpg')",
						}}
					>
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
							<h1
								className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6"
								style={{
									letterSpacing: '-0.02em',
								}}
							>
								Discover the beauty of French language and culture
							</h1>
							<p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-8 opacity-90">
								Alliance Française Illawarra brings authentic French experiences to the heart of Wollongong through language education and
								cultural immersion.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link to="/classes">
									<Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
										Explore Classes
									</Button>
								</Link>
								<Link to="/events">
									<Button
										size="lg"
										variant="outline"
										className="text-lg px-8 bg-white/10 text-white border-white hover:bg-white/20 hover:text-white"
									>
										View Events
									</Button>
								</Link>
							</div>
						</div>
					</section>
					<section className="py-24 bg-secondary text-secondary-foreground">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="text-center mb-12">
								<h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Our Mission</h2>
								<p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
									To promote the French language and Francophone cultures while fostering cross-cultural understanding and appreciation in
									the Illawarra community.
								</p>
							</div>
						</div>
					</section>
					<section className="py-24">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-balance">What We Offer</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								{offerings.map((r, o) => (
									<Card
										key={r.title}
										className="h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50"
									>
										<CardHeader>
											<div className={`w-16 h-16 rounded-xl ${r.color} flex items-center justify-center mb-6`}>
												<r.icon className="h-8 w-8" />
											</div>
											<CardTitle className="text-2xl mb-2">{r.title}</CardTitle>
											<CardDescription className="leading-relaxed text-base">{r.description}</CardDescription>
										</CardHeader>
										<CardContent className="mt-auto pt-6">
											<Link to={r.link}>
												<Button variant="ghost" className="w-full justify-between group text-primary hover:text-primary hover:bg-primary/5">
													Learn More
													<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-all duration-200" />
												</Button>
											</Link>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					</section>
					<section className="py-24 bg-muted">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
								<div>
									<div className="text-5xl md:text-6xl font-bold text-primary mb-4">50+</div>
									<p className="text-lg font-medium text-muted-foreground">Years of Excellence</p>
								</div>
								<div>
									<div className="text-5xl md:text-6xl font-bold text-primary mb-4">200+</div>
									<p className="text-lg font-medium text-muted-foreground">Students Annually</p>
								</div>
								<div>
									<div className="text-5xl md:text-6xl font-bold text-primary mb-4">5+</div>
									<p className="text-lg font-medium text-muted-foreground">Cultural Events per Year</p>
								</div>
							</div>
						</div>
					</section>
					<section className="py-24">
						<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
							<h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Join Our Community</h2>
							<p className="text-lg leading-relaxed mb-10 text-muted-foreground">
								Whether you're looking to learn French, explore French culture, or connect with fellow Francophiles, Alliance Française
								Illawarra welcomes you. Our doors are open to everyone who shares a passion for the French language and culture.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link to="/register">
									<Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
										Register Now
									</Button>
								</Link>
								<Link to="/contact">
									<Button size="lg" variant="outline" className="px-8 border-border hover:bg-muted">
										Contact Us
									</Button>
								</Link>
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Home;

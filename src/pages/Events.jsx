import { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { Skeleton } from '@/components/ui/skeleton';
import { CircleAlert, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventCard from '@/components/EventCard';
import Footer from '@/components/Footer';

const Events = () => {
	const [events, setEvents] = useState([]),
		[loading, setLoading] = useState(true),
		[error, setError] = useState(null),
		loadEvents = async () => {
			setLoading(true);
			setError(null);
			try {
				const f = await pb.collection('events').getList(1, 50, {
					sort: 'event_date',
					$autoCancel: false,
				});
				setEvents(f.items || []);
			} catch (f) {
				console.error('Error fetching events:', f);
				setError(`Failed to load events: ${f.message}`);
			} finally {
				setLoading(false);
			}
		};
	useEffect(() => {
		loadEvents();
	}, []);
	return (
		<>
			<Helmet>
				<title>Cultural Events - Alliance Française Illawarra</title>
				<meta
					name="description"
					content="Discover upcoming French cultural events including movie screenings, workshops, cultural celebrations, and French dinners in the Illawarra region."
				/>
			</Helmet>
			<div className="min-h-[100dvh] flex flex-col bg-background">
				<Header />
				<main className="flex-grow">
					<section className="page-banner">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-balance mb-6">
								Cultural Events
							</h1>
							<p className="text-lg md:text-xl leading-relaxed max-w-3xl opacity-90 font-medium">
								Immerse yourself in French culture. Join us for classic movie screenings, interactive workshops, traditional dinners, and
								regional celebrations.
							</p>
						</div>
					</section>
					<section className="py-20 md:py-24">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							{loading ? (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
									{[1, 2, 3, 4, 5, 6].map((f, index) => (
										<div key={index} className="flex flex-col bg-card rounded-2xl overflow-hidden border border-border/40">
											<Skeleton className="aspect-[4/3] w-full rounded-none" />
											<div className="p-6 space-y-4">
												<Skeleton className="h-6 w-3/4 rounded-md" />
												<div className="space-y-2">
													<Skeleton className="h-4 w-full rounded-md" />
													<Skeleton className="h-4 w-5/6 rounded-md" />
												</div>
												<div className="pt-4 space-y-3">
													<Skeleton className="h-4 w-1/2 rounded-md" />
													<Skeleton className="h-4 w-2/3 rounded-md" />
												</div>
											</div>
										</div>
									))}
								</div>
							) : error ? (
								<div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
									<div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
										<CircleAlert className="w-8 h-8" />
									</div>
									<h3 className="text-2xl font-bold mb-3">Connection Error</h3>
									<p className="text-muted-foreground mb-8">{error}</p>
									<Button onClick={loadEvents} size="lg" className="rounded-xl font-medium">
										<RefreshCw className="w-4 h-4 mr-2" />
										Retry Loading Events
									</Button>
								</div>
							) : events.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
									{events.map((f) => (
										<div key={f.id} className="h-full">
											<EventCard event={f} />
										</div>
									))}
								</div>
							) : (
								<div className="flex flex-col items-center justify-center py-24 text-center bg-muted/50 rounded-3xl border border-border/50 max-w-3xl mx-auto">
									<div className="text-6xl mb-6 opacity-50">🗓️</div>
									<h3 className="text-2xl font-bold mb-3">No Events Found</h3>
									<p className="text-muted-foreground max-w-md mx-auto mb-6">
										We're currently planning our next season of cultural events. Please check back soon for our latest schedule!
									</p>
								</div>
							)}
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Events;

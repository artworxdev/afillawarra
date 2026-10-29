import { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import { BookOpen, CircleAlert, Globe, Heart, RefreshCw, Users } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import TeamCard from '@/components/TeamCard';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';

const About = () => {
	const [team, setTeam] = useState([]),
		[loading, setLoading] = useState(true),
		[error, setError] = useState(null),
		loadTeam = async () => {
			setLoading(true);
			setError(null);
			try {
				const h = await pb.collection('team').getList(1, 100, {
					sort: '+position',
					$autoCancel: false,
				});
				setTeam(h.items);
			} catch (h) {
				console.error('Error fetching team:', h);
				setError('Failed to load team members. Please try again later.');
			} finally {
				setLoading(false);
			}
		};
	useEffect(() => {
		loadTeam();
	}, []);
	const values = [
		{
			icon: Globe,
			title: 'Cultural Exchange',
			description: 'Fostering connections between French and Australian cultures through shared experiences and dialogue.',
		},
		{
			icon: BookOpen,
			title: 'Language Learning',
			description: 'Providing high-quality French language education for all levels, from beginners to advanced speakers.',
		},
		{
			icon: Users,
			title: 'Community',
			description: 'Building a vibrant community of Francophiles and French speakers in the Illawarra region.',
		},
		{
			icon: Heart,
			title: 'French Heritage',
			description: 'Celebrating and preserving French traditions, arts, and cultural practices for future generations.',
		},
	];
	return (
		<>
			<Helmet>
				<title>About Us - Alliance Française Illawarra</title>
				<meta
					name="description"
					content="Learn about Alliance Française Illawarra's mission to promote French language and culture in the Illawarra region through education and cultural exchange."
				/>
			</Helmet>
			<div className="min-h-screen flex flex-col bg-background">
				<Header />
				<main className="flex-grow">
					<section className="page-banner">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
								About Alliance Française Illawarra
							</h1>
							<p className="text-xl leading-relaxed max-w-3xl opacity-80">
								Bringing the beauty of French language and culture to the Illawarra community
							</p>
						</div>
					</section>
					<section className="py-24">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
								<div>
									<h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance">Our Story</h2>
									<div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
										<p>
											Alliance Française Illawarra has been a cornerstone of French cultural education in the region since 1976. Founded by
											passionate educators and cultural enthusiasts, our organization has grown from a small language school into a vibrant
											cultural hub.
										</p>
										<p>
											We are part of the global Alliance Française network, which has been promoting French language and culture worldwide
											since 1883. Our local chapter brings this rich heritage to the Illawarra, offering authentic French experiences right
											here in Wollongong.
										</p>
										<p>
											Today, we serve hundreds of students annually, host cultural events that attract diverse audiences, and maintain
											strong partnerships with French institutions and local organizations.
										</p>
									</div>
								</div>
								<div className="rounded-2xl overflow-hidden shadow-xl border border-border/50">
									<img
										src="/images/about.png"
										alt="French countryside landscape with rolling hills and vineyards"
										className="w-full h-full object-cover"
									/>
								</div>
							</div>
						</div>
					</section>
					<section className="py-24 bg-muted/50 border-y border-border/40">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="text-center mb-16">
								<h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Our Team</h2>
								<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
									Meet the passionate individuals dedicated to bringing French language and culture to the Illawarra community.
								</p>
							</div>
							{loading ? (
								<div className="team-grid">
									{[1, 2, 3, 4].map((h, index) => (
										<div
											key={index}
											className="flex flex-col rounded-2xl overflow-hidden border border-border/40 bg-card shadow-sm h-[400px]"
										>
											<Skeleton className="w-full h-48 rounded-none" />
											<div className="p-6 flex flex-col gap-4 flex-grow">
												<Skeleton className="h-6 w-3/4" />
												<Skeleton className="h-4 w-1/2" />
												<div className="space-y-2 mt-2">
													<Skeleton className="h-3 w-full" />
													<Skeleton className="h-3 w-full" />
													<Skeleton className="h-3 w-2/3" />
												</div>
												<Skeleton className="h-4 w-1/2 mt-auto" />
											</div>
										</div>
									))}
								</div>
							) : error ? (
								<div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card rounded-2xl border border-destructive/20 shadow-sm max-w-2xl mx-auto">
									<CircleAlert className="w-12 h-12 text-destructive mb-4" />
									<h3 className="text-xl font-semibold mb-2">Failed to load team</h3>
									<p className="text-muted-foreground mb-6">{error}</p>
									<Button onClick={loadTeam} variant="outline" className="gap-2">
										<RefreshCw className="w-4 h-4" />
										Retry
									</Button>
								</div>
							) : team.length > 0 ? (
								<div className="team-grid">
									{team.map((h) => (
										<TeamCard key={h.id} member={h} />
									))}
								</div>
							) : (
								<div className="text-center py-16 bg-card rounded-2xl border border-border/40 shadow-sm">
									<Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
									<h3 className="text-xl font-semibold mb-2">No team members found</h3>
									<p className="text-muted-foreground">Our team directory is currently being updated.</p>
								</div>
							)}
						</div>
					</section>
					<section className="py-24 bg-secondary text-secondary-foreground">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="text-center">
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
							<h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-balance">Our Core Values</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{values.map((h, v) => (
									<Card key={h.title} className="shadow-md hover:shadow-lg transition-all duration-300 border-border/50">
										<CardContent className="p-8">
											<div className="flex items-start space-x-6">
												<div className="bg-primary/10 p-4 rounded-xl">
													<h.icon className="h-8 w-8 text-primary" />
												</div>
												<div className="flex-grow">
													<h3 className="text-xl font-semibold mb-3">{h.title}</h3>
													<p className="leading-relaxed text-muted-foreground">{h.description}</p>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					</section>
					<section className="py-24 bg-muted">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="max-w-3xl mx-auto text-center">
								<h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance">Our Commitment</h2>
								<div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
									<p>
										We are dedicated to preserving and sharing French heritage while creating meaningful connections between cultures.
										Through our classes, events, and community programs, we strive to make French language and culture accessible to
										everyone in the Illawarra region.
									</p>
									<p>
										Whether you're a complete beginner or a fluent speaker, a student or a professional, young or young at heart, Alliance
										Française Illawarra welcomes you to join our community and discover the richness of French culture.
									</p>
								</div>
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default About;

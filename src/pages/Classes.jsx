import { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, CreditCard, ExternalLink, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClassCard from '@/components/ClassCard';
import Footer from '@/components/Footer';

const Classes = () => {
	const [classes, setClasses] = useState([]),
		[terms, setTerms] = useState([]),
		[loadingClasses, setLoadingClasses] = useState(true),
		[loadingTerms, setLoadingTerms] = useState(true),
		[level, setLevel] = useState('All');
	useEffect(() => {
		const C = async () => {
				try {
					const E = await pb.collection('classes').getFullList({
						sort: 'title',
						$autoCancel: false,
					});
					setClasses(E);
				} catch (E) {
					console.error('Error fetching classes:', E);
				} finally {
					setLoadingClasses(false);
				}
			},
			N = async () => {
				try {
					const E = await pb.collection('terms').getFullList({
						sort: 'term_id',
						$autoCancel: false,
					});
					setTerms(E);
				} catch (E) {
					console.error('Error fetching terms:', E);
				} finally {
					setLoadingTerms(false);
				}
			};
		C();
		N();
	}, []);
	const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'],
		filteredClasses = level === 'All' ? classes : classes.filter((C) => C.level === level),
		formatDate = (C) =>
			C
				? new Date(C).toLocaleDateString('en-AU', {
						day: 'numeric',
						month: 'short',
					})
				: 'TBA';
	return (
		<>
			<Helmet>
				<title>French Classes - Alliance Française Illawarra</title>
				<meta
					name="description"
					content="Explore our French language classes for all levels - Beginner, Intermediate, and Advanced. Learn from experienced instructors in a supportive environment."
				/>
			</Helmet>
			<div className="min-h-screen flex flex-col bg-background">
				<Header />
				<main className="flex-grow">
					<section className="page-banner">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">French Language Classes</h1>
							<p className="text-xl leading-relaxed max-w-3xl opacity-80">
								Learn French with experienced instructors in a welcoming environment. Classes for all levels, from complete beginners to
								advanced speakers.
							</p>
						</div>
					</section>
					<section className="py-24">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
								<Card className="shadow-md border-border/40 bg-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg">
									<CardHeader className="bg-muted/40 pb-4 border-b border-border/30">
										<CardTitle className="text-xl flex items-center gap-2.5">
											<div className="p-2 bg-primary/10 rounded-lg text-primary">
												<CalendarDays className="w-5 h-5" />
											</div>
											Term Dates
										</CardTitle>
									</CardHeader>
									<CardContent className="pt-5 flex-grow">
										{loadingTerms ? (
											<div className="space-y-3">
												{[1, 2, 3, 4].map((C, index) => (
													<Skeleton key={index} className="h-6 w-full rounded-md" />
												))}
											</div>
										) : terms.length > 0 ? (
											<ul className="space-y-3 text-sm">
												{terms.map((C) => (
													<li
														key={C.id}
														className="flex justify-between items-center border-b border-border/40 pb-2 last:border-0 last:pb-0"
													>
														<span className="font-medium text-foreground">{C.term_name}</span>
														<span className="text-muted-foreground font-variant-numeric: tabular-nums">
															{formatDate(C.start_date)} - {formatDate(C.end_date)} ({C.weeks} weeks)
														</span>
													</li>
												))}
											</ul>
										) : (
											<p className="text-sm text-muted-foreground">No term dates available at the moment.</p>
										)}
									</CardContent>
								</Card>
								<Card className="shadow-md border-border/40 bg-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg">
									<CardHeader className="bg-muted/40 pb-4 border-b border-border/30">
										<CardTitle className="text-xl flex items-center gap-2.5">
											<div className="p-2 bg-primary/10 rounded-lg text-primary">
												<CreditCard className="w-5 h-5" />
											</div>
											Bank Details
										</CardTitle>
									</CardHeader>
									<CardContent className="pt-5 flex-grow">
										<div className="space-y-4">
											<div className="flex flex-col">
												<span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Account Name</span>
												<span className="font-medium text-base text-foreground">AF Illawarra</span>
											</div>
											<div className="flex flex-col">
												<span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">BSB</span>
												<span className="font-mono text-base tracking-wide text-foreground">082-916</span>
											</div>
											<div className="flex flex-col">
												<span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Account Number</span>
												<span className="font-mono text-base tracking-wide text-foreground">51-504-0351</span>
											</div>
										</div>
									</CardContent>
								</Card>
								<Card className="shadow-md border-border/40 bg-card rounded-2xl overflow-hidden flex flex-col md:col-span-2 lg:col-span-1 transition-all duration-300 hover:shadow-lg">
									<CardHeader className="bg-muted/40 pb-4 border-b border-border/30">
										<CardTitle className="text-xl flex items-center gap-2.5">
											<div className="p-2 bg-primary/10 rounded-lg text-primary">
												<MapPin className="w-5 h-5" />
											</div>
											Location
										</CardTitle>
									</CardHeader>
									<CardContent className="pt-5 flex-grow flex flex-col justify-between">
										<div>
											<p className="font-medium text-lg mb-2 text-foreground">Gwynneville Public School</p>
											<p className="text-muted-foreground leading-relaxed">
												10a Acacia Ave
												<br />
												Gwynneville NSW 2500
											</p>
										</div>
										<div className="mt-6 pt-4 border-t border-border/40">
											<a
												href="https://www.google.com/maps/place/Gwynneville+Public+School/@-34.4167926,150.8776377,16.32z/data=!4m15!1m8!3m7!1s0x6b131e9526217f9f:0x5017d681632e390!2sKeiraville+NSW+2500!3b1!8m2!3d-34.4143257!4d150.8703668!16zL20vMGZfa3R4!3m5!1s0x6b13199e7a63681f:0xb8695897f5f3a7d7!8m2!3d-34.4179359!4d150.8794906!16s%2Fg%2F1tn01d5w?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors group"
											>
												Open in Maps
												<ExternalLink className="w-4 h-4 ml-1.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
											</a>
										</div>
									</CardContent>
								</Card>
							</div>
							<div className="border-t border-border pt-16">
								<Tabs defaultValue="All" className="w-full" onValueChange={setLevel}>
									<div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
										<h2 className="text-3xl md:text-4xl font-bold text-balance">Browse Classes</h2>
										<TabsList className="grid w-full max-w-md grid-cols-4 bg-muted p-1 rounded-xl">
											{levels.map((C, index) => (
												<TabsTrigger
													key={index}
													value={C}
													className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg"
												>
													{C}
												</TabsTrigger>
											))}
										</TabsList>
									</div>
									{levels.map((C, index) => (
										<TabsContent key={index} value={C} className="mt-0">
											{loadingClasses ? (
												<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
													{[1, 2, 3].map((N, index) => (
														<div key={index} className="space-y-4">
															<Skeleton className="h-48 w-full rounded-2xl" />
															<Skeleton className="h-4 w-3/4" />
															<Skeleton className="h-4 w-1/2" />
														</div>
													))}
												</div>
											) : filteredClasses.length > 0 ? (
												<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
													{filteredClasses.map((N) => (
														<ClassCard key={N.id} classData={N} />
													))}
												</div>
											) : (
												<div className="text-center py-20 bg-muted/50 rounded-2xl border border-border/40">
													<p className="text-lg text-muted-foreground">
														No classes available for this level at the moment. Please check back soon or contact us for more information.
													</p>
												</div>
											)}
										</TabsContent>
									))}
								</Tabs>
							</div>
						</div>
					</section>
					<section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
						<div
							className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-soft-light"
							style={{
								backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
							}}
						/>
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-border/20">
								<div className="pt-8 md:pt-0">
									<div className="text-5xl font-bold mb-4 text-primary font-variant-numeric: tabular-nums">10</div>
									<p className="text-lg opacity-90 font-medium">Weeks per term</p>
								</div>
								<div className="pt-8 md:pt-0">
									<div className="text-5xl font-bold mb-4 text-primary font-variant-numeric: tabular-nums">1.5</div>
									<p className="text-lg opacity-90 font-medium">Hours per class</p>
								</div>
								<div className="pt-8 md:pt-0">
									<div className="text-5xl font-bold mb-4 text-primary font-variant-numeric: tabular-nums">15</div>
									<p className="text-lg opacity-90 font-medium">Max students per class</p>
								</div>
							</div>
						</div>
					</section>
					<section className="py-24">
						<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
							<h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance">Why Choose Our Classes?</h2>
							<div className="space-y-6 leading-relaxed text-lg text-muted-foreground">
								<p>
									Our French classes are designed to provide an immersive and engaging learning experience. With small class sizes, you'll
									receive personalized attention from our experienced French instructors.
								</p>
								<p>
									We use communicative teaching methods that focus on practical language skills, ensuring you can confidently use French in
									real-world situations. From grammar and vocabulary to pronunciation and cultural insights, our comprehensive curriculum
									covers all aspects of language learning.
								</p>
								<p className="font-medium text-foreground pt-4">Join our community of learners and discover the joy of speaking French!</p>
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Classes;

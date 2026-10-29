import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import forms from '@/lib/forms';
import pb from '@/lib/pocketbase';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const Register = () => {
	const navigate = useNavigate(),
		[searchParams] = useSearchParams(),
		eventId = searchParams.get('eventId'),
		{ submitClassRegistration: submitClass, submitEventRegistration: submitEvent } = forms,
		[submitting, setSubmitting] = useState(false),
		[classes, setClasses] = useState([]),
		[events, setEvents] = useState([]),
		[classForm, setClassForm] = useState({
			full_name: '',
			email: '',
			phone: '',
			class_level: '',
			selected_class: '',
		}),
		[eventForm, setEventForm] = useState({
			full_name: '',
			email: '',
			phone: '',
			selected_event: '',
		});
	useEffect(() => {
		(async () => {
			try {
				const [j, A] = await Promise.all([
					pb.collection('classes').getFullList({
						sort: 'level',
						$autoCancel: false,
					}),
					pb.collection('events').getFullList({
						sort: '-created',
						$autoCancel: false,
					}),
				]);
				if ((setClasses(j), setEvents(A), eventId)) {
					const D = A.find((F) => F.id === eventId);
					if (D)
						setEventForm((F) => ({
							...F,
							selected_event: D.id,
						}));
					else
						try {
							const F = await pb.collection('events').getOne(eventId, {
								$autoCancel: false,
							});
							setEvents((G) => [...G, F]);
							setEventForm((G) => ({
								...G,
								selected_event: F.id,
							}));
						} catch (F) {
							console.error('Error fetching specific event:', F);
							toast.error('Could not load specific event details.');
						}
				}
			} catch (j) {
				console.error('Error fetching data:', j);
			}
		})();
	}, [eventId]);
	const handleClassSubmit = async (T) => {
			T.preventDefault();
			setSubmitting(true);
			try {
				const j = await submitClass(classForm);
				j.success
					? (toast.success('Registration submitted successfully'),
						setClassForm({
							full_name: '',
							email: '',
							phone: '',
							class_level: '',
							selected_class: '',
						}))
					: toast.error(j.error || 'Registration failed');
			} catch {
				toast.error('An error occurred during registration');
			} finally {
				setSubmitting(false);
			}
		},
		handleEventSubmit = async (T) => {
			T.preventDefault();
			setSubmitting(true);
			try {
				const j = await submitEvent(eventForm);
				j.success
					? (toast.success('Registration submitted successfully'),
						setEventForm({
							full_name: '',
							email: '',
							phone: '',
							selected_event: '',
						}),
						eventId &&
							navigate('/register', {
								replace: true,
							}))
					: toast.error(j.error || 'Registration failed');
			} catch {
				toast.error('An error occurred during registration');
			} finally {
				setSubmitting(false);
			}
		},
		availableClasses = classForm.class_level ? classes.filter((T) => T.level === classForm.class_level) : classes;
	return (
		<>
			<Helmet>
				<title>Register - Alliance Française Illawarra</title>
				<meta
					name="description"
					content="Register for French language classes or cultural events at Alliance Française Illawarra. Join our community of French language learners and culture enthusiasts."
				/>
			</Helmet>
			<div className="min-h-screen flex flex-col bg-background">
				<Header />
				<main className="flex-grow">
					<section className="page-banner">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">Register</h1>
							<p className="text-xl leading-relaxed max-w-3xl opacity-80">Join our community by registering for classes or events</p>
						</div>
					</section>
					<section className="py-24">
						<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
							<Tabs defaultValue={eventId ? 'event' : 'class'} className="w-full">
								<TabsList className="grid w-full grid-cols-2 mb-12 bg-muted p-1 rounded-xl">
									<TabsTrigger
										value="class"
										className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg"
									>
										Class Registration
									</TabsTrigger>
									<TabsTrigger
										value="event"
										className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg"
									>
										Event Registration
									</TabsTrigger>
								</TabsList>
								<TabsContent value="class">
									<Card className="shadow-lg border-border/50">
										<CardHeader className="pb-8">
											<CardTitle className="text-2xl">Register for a Class</CardTitle>
											<CardDescription className="text-base">
												Fill out the form below to register for one of our French language classes
											</CardDescription>
										</CardHeader>
										<CardContent>
											<form onSubmit={handleClassSubmit} className="space-y-6">
												<div className="space-y-3">
													<Label htmlFor="class-name">Full Name</Label>
													<Input
														id="class-name"
														type="text"
														required={true}
														value={classForm.full_name}
														onChange={(T) =>
															setClassForm({
																...classForm,
																full_name: T.target.value,
															})
														}
														className="text-foreground focus-visible:ring-primary"
													/>
												</div>
												<div className="space-y-3">
													<Label htmlFor="class-email">Email</Label>
													<Input
														id="class-email"
														type="email"
														required={true}
														value={classForm.email}
														onChange={(T) =>
															setClassForm({
																...classForm,
																email: T.target.value,
															})
														}
														className="text-foreground focus-visible:ring-primary"
													/>
												</div>
												<div className="space-y-3">
													<Label htmlFor="class-phone">Phone</Label>
													<Input
														id="class-phone"
														type="tel"
														value={classForm.phone}
														onChange={(T) =>
															setClassForm({
																...classForm,
																phone: T.target.value,
															})
														}
														className="text-foreground focus-visible:ring-primary"
													/>
												</div>
												<div className="space-y-3">
													<Label htmlFor="class-level">Class Level</Label>
													<Select
														value={classForm.class_level}
														onValueChange={(T) =>
															setClassForm({
																...classForm,
																class_level: T,
																selected_class: '',
															})
														}
														required={true}
													>
														<SelectTrigger id="class-level" className="focus:ring-primary">
															<SelectValue placeholder="Select your level" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="Beginner">Beginner</SelectItem>
															<SelectItem value="Intermediate">Intermediate</SelectItem>
															<SelectItem value="Advanced">Advanced</SelectItem>
														</SelectContent>
													</Select>
												</div>
												{classForm.class_level && (
													<div className="space-y-3">
														<Label htmlFor="selected-class">Select Class</Label>
														<Select
															value={classForm.selected_class}
															onValueChange={(T) =>
																setClassForm({
																	...classForm,
																	selected_class: T,
																})
															}
															required={true}
														>
															<SelectTrigger id="selected-class" className="focus:ring-primary">
																<SelectValue placeholder="Choose a class" />
															</SelectTrigger>
															<SelectContent>
																{availableClasses.map((T, index) => (
																	<SelectItem key={index} value={T.title}>
																		{T.title}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</div>
												)}
												<Button
													type="submit"
													className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
													disabled={submitting}
												>
													{submitting ? 'Submitting...' : 'Submit Registration'}
												</Button>
											</form>
										</CardContent>
									</Card>
								</TabsContent>
								<TabsContent value="event">
									<Card className="shadow-lg border-border/50">
										<CardHeader className="pb-8">
											<CardTitle className="text-2xl">Register for an Event</CardTitle>
											<CardDescription className="text-base">
												Fill out the form below to register for one of our cultural events
											</CardDescription>
										</CardHeader>
										<CardContent>
											<form onSubmit={handleEventSubmit} className="space-y-6">
												<div className="space-y-3">
													<Label htmlFor="event-name">Full Name</Label>
													<Input
														id="event-name"
														type="text"
														required={true}
														value={eventForm.full_name}
														onChange={(T) =>
															setEventForm({
																...eventForm,
																full_name: T.target.value,
															})
														}
														className="text-foreground focus-visible:ring-primary"
													/>
												</div>
												<div className="space-y-3">
													<Label htmlFor="event-email">Email</Label>
													<Input
														id="event-email"
														type="email"
														required={true}
														value={eventForm.email}
														onChange={(T) =>
															setEventForm({
																...eventForm,
																email: T.target.value,
															})
														}
														className="text-foreground focus-visible:ring-primary"
													/>
												</div>
												<div className="space-y-3">
													<Label htmlFor="event-phone">Phone</Label>
													<Input
														id="event-phone"
														type="tel"
														value={eventForm.phone}
														onChange={(T) =>
															setEventForm({
																...eventForm,
																phone: T.target.value,
															})
														}
														className="text-foreground focus-visible:ring-primary"
													/>
												</div>
												<div className="space-y-3">
													<Label htmlFor="selected-event">Select Event</Label>
													<Select
														value={eventForm.selected_event}
														onValueChange={(T) =>
															setEventForm({
																...eventForm,
																selected_event: T,
															})
														}
														required={true}
													>
														<SelectTrigger id="selected-event" className="focus:ring-primary">
															<SelectValue placeholder="Choose an event" />
														</SelectTrigger>
														<SelectContent>
															{events.map((T) => (
																<SelectItem key={T.id} value={T.id}>
																	{T.title}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
												<Button
													type="submit"
													className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
													disabled={submitting}
												>
													{submitting ? 'Submitting...' : 'Submit Registration'}
												</Button>
											</form>
										</CardContent>
									</Card>
								</TabsContent>
							</Tabs>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Register;

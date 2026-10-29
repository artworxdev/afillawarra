import { useState } from 'react';
import forms from '@/lib/forms';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Footer from '@/components/Footer';

const Contact = () => {
	const { submitContactInquiry: submitContactInquiry } = forms,
		[submitting, setSubmitting] = useState(false),
		[form, setForm] = useState({
			full_name: '',
			email: '',
			subject: '',
			message: '',
		}),
		handleSubmit = async (d) => {
			d.preventDefault();
			setSubmitting(true);
			try {
				const f = await submitContactInquiry(form);
				f.success
					? (toast.success('Message sent successfully. We will get back to you soon.'),
						setForm({
							full_name: '',
							email: '',
							subject: '',
							message: '',
						}))
					: toast.error(f.error || 'Failed to send message');
			} catch {
				toast.error('An error occurred while sending your message');
			} finally {
				setSubmitting(false);
			}
		};
	return (
		<>
			<Helmet>
				<title>Contact Us - Alliance Française Illawarra</title>
				<meta
					name="description"
					content="Get in touch with Alliance Française Illawarra. Contact us for inquiries about French classes, cultural events, or general information."
				/>
			</Helmet>
			<div className="min-h-screen flex flex-col bg-background">
				<Header />
				<main className="flex-grow">
					<section className="page-banner">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">Contact Us</h1>
							<p className="text-xl leading-relaxed max-w-3xl opacity-80">
								We'd love to hear from you. Get in touch with any questions or inquiries.
							</p>
						</div>
					</section>
					<section className="py-24">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
								<div>
									<Card className="shadow-lg border-border/50">
										<CardHeader className="pb-8">
											<CardTitle className="text-2xl">Send us a Message</CardTitle>
											<CardDescription className="text-base">
												Fill out the form and we'll get back to you as soon as possible
											</CardDescription>
										</CardHeader>
										<CardContent>
											<form onSubmit={handleSubmit} className="space-y-6">
												<div className="space-y-3">
													<Label htmlFor="name">Full Name</Label>
													<Input
														id="name"
														type="text"
														required={true}
														value={form.full_name}
														onChange={(d) =>
															setForm({
																...form,
																full_name: d.target.value,
															})
														}
														className="text-foreground focus-visible:ring-primary"
													/>
												</div>
												<div className="space-y-3">
													<Label htmlFor="email">Email</Label>
													<Input
														id="email"
														type="email"
														required={true}
														value={form.email}
														onChange={(d) =>
															setForm({
																...form,
																email: d.target.value,
															})
														}
														className="text-foreground focus-visible:ring-primary"
													/>
												</div>
												<div className="space-y-3">
													<Label htmlFor="subject">Subject</Label>
													<Input
														id="subject"
														type="text"
														required={true}
														value={form.subject}
														onChange={(d) =>
															setForm({
																...form,
																subject: d.target.value,
															})
														}
														className="text-foreground focus-visible:ring-primary"
													/>
												</div>
												<div className="space-y-3">
													<Label htmlFor="message">Message</Label>
													<Textarea
														id="message"
														required={true}
														rows={6}
														value={form.message}
														onChange={(d) =>
															setForm({
																...form,
																message: d.target.value,
															})
														}
														className="text-foreground resize-none focus-visible:ring-primary"
													/>
												</div>
												<Button
													type="submit"
													className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
													disabled={submitting}
												>
													{submitting ? 'Sending...' : 'Send Message'}
												</Button>
											</form>
										</CardContent>
									</Card>
								</div>
								<div className="space-y-8">
									<Card className="shadow-lg border-border/50">
										<CardHeader>
											<CardTitle className="text-2xl">Contact Information</CardTitle>
										</CardHeader>
										<CardContent className="space-y-8">
											<div className="flex items-start space-x-5">
												<div className="bg-primary/10 p-4 rounded-xl">
													<MapPin className="h-6 w-6 text-primary" />
												</div>
												<div>
													<h3 className="font-semibold mb-2 text-lg">Address</h3>
													<p className="text-muted-foreground leading-relaxed">
														Wollongong, NSW
														<br />
														Australia
													</p>
												</div>
											</div>
											<div className="flex items-start space-x-5">
												<div className="bg-primary/10 p-4 rounded-xl">
													<Phone className="h-6 w-6 text-primary" />
												</div>
												<div>
													<h3 className="font-semibold mb-2 text-lg">Phone</h3>
													<p className="text-muted-foreground">0401 979 847 (Margaret)</p>
												</div>
											</div>
											<div className="flex items-start space-x-5">
												<div className="bg-primary/10 p-4 rounded-xl">
													<Mail className="h-6 w-6 text-primary" />
												</div>
												<div>
													<h3 className="font-semibold mb-2 text-lg">Email</h3>
													<p className="text-muted-foreground">info@afillawarra.com.au</p>
												</div>
											</div>
											<div className="flex items-start space-x-5">
												<div className="bg-primary/10 p-4 rounded-xl">
													<Clock className="h-6 w-6 text-primary" />
												</div>
												<div>
													<h3 className="font-semibold mb-2 text-lg">Office Hours</h3>
													<p className="text-muted-foreground leading-relaxed">
														Monday - Friday: 9:00 AM - 5:00 PM
														<br />
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
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

export default Contact;

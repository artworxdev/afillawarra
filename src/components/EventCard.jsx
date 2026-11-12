import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbase';
import { ArrowUpRight, Calendar, Clock, Image as ImageIcon, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const EventCard = ({ event: event }) => {
	const navigate = useNavigate();
	if (!event) return null;
	const typeClass = (d) => {
			switch (d) {
				case 'Movie Screening':
					return 'bg-pink-100 text-pink-800 hover:bg-pink-200 border-transparent';
				case 'Workshop':
					return 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-transparent';
				case 'Cultural Event':
					return 'bg-purple-100 text-purple-800 hover:bg-purple-200 border-transparent';
				case 'Dinner':
					return 'bg-orange-100 text-orange-800 hover:bg-orange-200 border-transparent';
				default:
					return 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-transparent';
			}
		},
		imageUrl = event.image ? pb.files.getURL(event, event.image) : null,
		needsRegistration = event.requires_registration !== false,
		content = (
			<>
				<div className="event-tile-image-wrapper">
					{imageUrl ? (
						<img
							src={imageUrl}
							alt={event.title || 'Event image'}
							className="w-full h-full object-cover transition-transform duration-700 ease-out"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center bg-muted">
							<ImageIcon className="w-16 h-16 text-muted-foreground/20" />
						</div>
					)}
					<div className="event-tile-overlay" />
					{needsRegistration && (
						<div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm p-2 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
							<ArrowUpRight className="w-5 h-5 text-foreground" />
						</div>
					)}
				</div>
				<div className="p-6 flex flex-col flex-grow bg-card relative z-20">
					<div className="flex flex-wrap items-center gap-2 mb-4">
						<Badge className={`px-3 py-1 font-medium ${typeClass(event.event_type)}`}>{event.event_type || 'Event'}</Badge>
						{!needsRegistration && (
							<Badge variant="secondary" className="px-3 py-1 font-medium border-transparent">
								No Registration Required
							</Badge>
						)}
					</div>
					<h3
						className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-300 ${needsRegistration ? 'group-hover:text-primary' : ''}`}
					>
						{event.title || 'Untitled Event'}
					</h3>
					{event.description && (
						<div className="mb-6 relative">
							<p className="text-muted-foreground text-sm leading-relaxed text-expandable">{event.description}</p>
							<div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
						</div>
					)}
					<div className="mt-auto space-y-2.5 pt-2 border-t border-border/40">
						{event.event_date && (
							<div className="flex items-center text-sm font-medium text-foreground">
								<Calendar className="w-4 h-4 mr-3 text-primary/70 shrink-0" />
								<span className="truncate">{event.event_date}</span>
							</div>
						)}
						{event.event_time && (
							<div className="flex items-center text-sm font-medium text-foreground">
								<Clock className="w-4 h-4 mr-3 text-primary/70 shrink-0" />
								<span className="truncate">{event.event_time}</span>
							</div>
						)}
						{event.location && (
							<div className="flex items-center text-sm text-muted-foreground">
								<MapPin className="w-4 h-4 mr-3 text-muted-foreground/70 shrink-0" />
								<span className="truncate">{event.location}</span>
							</div>
						)}
					</div>
				</div>
			</>
		);
	return needsRegistration ? (
		<div
			onClick={() => navigate(`/register?eventId=${event.id}`)}
			className="group event-tile block h-full cursor-pointer"
			role="button"
			tabIndex={0}
			onKeyDown={(d) => {
				(d.key === 'Enter' || d.key === ' ') && (d.preventDefault(), navigate(`/register?eventId=${event.id}`));
			}}
		>
			{content}
		</div>
	) : (
		<div className="group event-tile block h-full cursor-default">{content}</div>
	);
};

export default EventCard;

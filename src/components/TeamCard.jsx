import pb from '@/lib/pocketbase';
import { Mail, User } from 'lucide-react';

const TeamCard = ({ member: member }) => {
	if (!member) return null;
	const imageUrl = member.image ? pb.files.getURL(member, member.image) : null;
	return (
		<article className="group team-tile h-full">
			<div className="team-tile-image-wrapper">
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={`Portrait of ${member.name}`}
						className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
						loading="lazy"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center bg-secondary/5">
						<User className="w-20 h-20 text-muted-foreground/20" />
					</div>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
			</div>
			<div className="p-6 flex flex-col flex-grow bg-card relative z-10">
				<h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 transition-colors duration-300 group-hover:text-primary">
					{member.name}
				</h3>
				<p className="text-sm font-semibold tracking-wide text-primary/80 uppercase mb-4">{member.role}</p>
				{member.description && (
					<div className="mb-6 relative flex-grow">
						<p className="text-muted-foreground text-sm leading-relaxed text-expandable">{member.description}</p>
						<div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
					</div>
				)}
				<div className="mt-auto pt-4 border-t border-border/40">
					<a
						href={`mailto:${member.email}`}
						className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
						aria-label={`Email ${member.name}`}
					>
						<Mail className="w-4 h-4 mr-2" />
						<span className="truncate">{member.email}</span>
					</a>
				</div>
			</div>
		</article>
	);
};

export default TeamCard;

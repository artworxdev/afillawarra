import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ClassCard = ({ classData: classData }) => {
	const levelClass = (o) => {
		switch (o) {
			case 'Beginner':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'Intermediate':
				return 'bg-blue-100 text-blue-800 border-blue-200';
			case 'Advanced':
				return 'bg-purple-100 text-purple-800 border-purple-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};
	return (
		<Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
			<CardHeader>
				<div className="flex items-center justify-between mb-2">
					<Badge className={levelClass(classData.level)}>{classData.level}</Badge>
					{classData.duration_weeks && <span className="text-sm text-muted-foreground">{classData.duration_weeks} weeks</span>}
				</div>
				<CardTitle className="text-2xl">{classData.title}</CardTitle>
				{classData.price && (
					<div className="text-xl font-bold text-primary mt-1">
						${classData.price} <span className="text-sm font-normal text-muted-foreground">per 10 week term</span>
					</div>
				)}
				<CardDescription className="leading-relaxed mt-2">{classData.description}</CardDescription>
			</CardHeader>
			<CardContent className="flex-grow space-y-3">
				{classData.instructor_name && (
					<div className="flex items-center space-x-2 text-sm">
						<User className="h-4 w-4 text-muted-foreground" />
						<span>{classData.instructor_name}</span>
					</div>
				)}
				{classData.schedule_day && (
					<div className="flex items-center space-x-2 text-sm">
						<Calendar className="h-4 w-4 text-muted-foreground" />
						<span>{classData.schedule_day}</span>
					</div>
				)}
				{classData.schedule_time && (
					<div className="flex items-center space-x-2 text-sm">
						<Clock className="h-4 w-4 text-muted-foreground" />
						<span>{classData.schedule_time}</span>
					</div>
				)}
			</CardContent>
			<CardFooter className="mt-auto">
				<Link to="/register" className="w-full">
					<Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Register Now</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};

export default ClassCard;

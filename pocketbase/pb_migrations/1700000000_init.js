/// <reference path="../pb_data/types.d.ts" />

// Collections for the Alliance Française Illawarra site.
// Public visitors can read team/events/classes/terms and *create* (never read)
// registrations and contact inquiries. Everything else needs a superuser login.

const created = { type: 'autodate', name: 'created', onCreate: true };
const updated = { type: 'autodate', name: 'updated', onCreate: true, onUpdate: true };
const imageField = {
	type: 'file',
	name: 'image',
	maxSelect: 1,
	maxSize: 10 * 1024 * 1024,
	mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
};

migrate(
	(app) => {
		const publicRead = { listRule: '', viewRule: '' };
		const publicCreate = { createRule: '' };

		app.save(
			new Collection({
				type: 'base',
				name: 'team',
				...publicRead,
				fields: [
					{ type: 'text', name: 'name', required: true },
					{ type: 'text', name: 'role' },
					{ type: 'text', name: 'description' },
					{ type: 'email', name: 'email' },
					{ type: 'number', name: 'position', onlyInt: true },
					imageField,
					created,
					updated,
				],
			}),
		);

		app.save(
			new Collection({
				type: 'base',
				name: 'events',
				...publicRead,
				fields: [
					{ type: 'text', name: 'title', required: true },
					{ type: 'text', name: 'description' },
					{ type: 'text', name: 'event_date' },
					{ type: 'text', name: 'event_time' },
					{
						type: 'select',
						name: 'event_type',
						maxSelect: 1,
						values: ['Cultural Event', 'Movie Screening', 'Workshop', 'Dinner'],
					},
					{ type: 'text', name: 'location' },
					{ type: 'number', name: 'capacity', onlyInt: true },
					{ type: 'bool', name: 'requires_registration' },
					imageField,
					created,
					updated,
				],
			}),
		);

		app.save(
			new Collection({
				type: 'base',
				name: 'classes',
				...publicRead,
				fields: [
					{ type: 'text', name: 'title', required: true },
					{ type: 'text', name: 'description' },
					{ type: 'select', name: 'level', required: true, maxSelect: 1, values: ['Beginner', 'Intermediate', 'Advanced'] },
					{ type: 'text', name: 'instructor_name' },
					{ type: 'text', name: 'schedule_day' },
					{ type: 'text', name: 'schedule_time' },
					{ type: 'number', name: 'duration_weeks', onlyInt: true },
					{ type: 'number', name: 'price' },
					created,
					updated,
				],
			}),
		);

		app.save(
			new Collection({
				type: 'base',
				name: 'terms',
				...publicRead,
				fields: [
					{ type: 'text', name: 'term_id', required: true },
					{ type: 'text', name: 'term_name', required: true },
					{ type: 'date', name: 'start_date' },
					{ type: 'date', name: 'end_date' },
					{ type: 'number', name: 'weeks', onlyInt: true },
					created,
					updated,
				],
			}),
		);

		const events = app.findCollectionByNameOrId('events');

		app.save(
			new Collection({
				type: 'base',
				name: 'class_registrations',
				...publicCreate,
				fields: [
					{ type: 'text', name: 'full_name', required: true },
					{ type: 'email', name: 'email', required: true },
					{ type: 'text', name: 'phone' },
					{ type: 'text', name: 'class_level' },
					{ type: 'text', name: 'selected_class' },
					created,
					updated,
				],
			}),
		);

		app.save(
			new Collection({
				type: 'base',
				name: 'event_registrations',
				...publicCreate,
				fields: [
					{ type: 'text', name: 'full_name', required: true },
					{ type: 'email', name: 'email', required: true },
					{ type: 'text', name: 'phone' },
					{ type: 'relation', name: 'selected_event', collectionId: events.id, maxSelect: 1, required: true },
					created,
					updated,
				],
			}),
		);

		app.save(
			new Collection({
				type: 'base',
				name: 'contact_inquiries',
				...publicCreate,
				fields: [
					{ type: 'text', name: 'full_name', required: true },
					{ type: 'email', name: 'email', required: true },
					{ type: 'text', name: 'subject', required: true },
					{ type: 'text', name: 'message', required: true, max: 5000 },
					created,
					updated,
				],
			}),
		);
	},
	(app) => {
		for (const name of ['contact_inquiries', 'event_registrations', 'class_registrations', 'terms', 'classes', 'events', 'team']) {
			try {
				app.delete(app.findCollectionByNameOrId(name));
			} catch (_) {
				// already gone
			}
		}
	},
);

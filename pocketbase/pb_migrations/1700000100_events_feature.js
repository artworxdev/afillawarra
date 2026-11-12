/// <reference path="../pb_data/types.d.ts" />

// Adds a "feature" flag to events. The home page shows one randomly chosen
// featured event (with an image) each time it loads.

migrate(
	(app) => {
		const events = app.findCollectionByNameOrId('events');
		events.fields.add(new BoolField({ name: 'feature' }));
		app.save(events);
	},
	(app) => {
		const events = app.findCollectionByNameOrId('events');
		events.fields.removeByName('feature');
		app.save(events);
	},
);

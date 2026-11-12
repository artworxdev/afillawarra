/// <reference path="../pb_data/types.d.ts" />

// Email the committee (and confirm to the registrant) when a form is submitted.
// Requires SMTP to be configured in the PocketBase admin UI (Settings > Mail settings).

onRecordAfterCreateSuccess((e) => {
	const { notify } = require(`${__hooks}/mail.js`)
	const r = e.record
	notify({
		subject: 'New class registration: ' + r.getString('full_name'),
		pairs: [
			['Name', r.getString('full_name')],
			['Email', r.getString('email')],
			['Phone', r.getString('phone')],
			['Level', r.getString('class_level')],
			['Class', r.getString('selected_class')],
		],
		replyTo: r.getString('email'),
		confirm: {
			name: r.getString('full_name'),
			subject: 'We received your class registration',
			body: 'Thank you for registering with Alliance Française Illawarra. Here is what we received:',
		},
	})
	e.next()
}, 'class_registrations')

onRecordAfterCreateSuccess((e) => {
	const { notify } = require(`${__hooks}/mail.js`)
	const r = e.record
	let eventTitle = ''
	let eventDate = ''
	try {
		const ev = $app.findRecordById('events', r.getString('selected_event'))
		eventTitle = ev.getString('title')
		eventDate = ev.getString('event_date') + ' ' + ev.getString('event_time')
	} catch (_) {}
	notify({
		subject: 'New event registration: ' + r.getString('full_name'),
		pairs: [
			['Name', r.getString('full_name')],
			['Email', r.getString('email')],
			['Phone', r.getString('phone')],
			['Event', eventTitle],
			['When', eventDate.trim()],
		],
		replyTo: r.getString('email'),
		confirm: {
			name: r.getString('full_name'),
			subject: 'We received your event registration',
			body: 'Thank you for registering for an Alliance Française Illawarra event. Here is what we received:',
		},
	})
	e.next()
}, 'event_registrations')

onRecordAfterCreateSuccess((e) => {
	const { notify } = require(`${__hooks}/mail.js`)
	const r = e.record
	notify({
		subject: 'Website message: ' + r.getString('subject'),
		pairs: [
			['Name', r.getString('full_name')],
			['Email', r.getString('email')],
			['Subject', r.getString('subject')],
			['Message', r.getString('message')],
		],
		replyTo: r.getString('email'),
	})
	e.next()
}, 'contact_inquiries')

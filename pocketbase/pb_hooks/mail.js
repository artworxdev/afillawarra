// Email helpers used by notifications.pb.js

const NOTIFY_TO = 'info@afillawarra.com.au'

function esc(s) {
	return String(s == null ? '' : s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

function rows(pairs) {
	return (
		'<table cellpadding="6" style="border-collapse:collapse">' +
		pairs
			.filter((p) => p[1])
			.map((p) => '<tr><td style="color:#666"><b>' + esc(p[0]) + '</b></td><td>' + esc(p[1]).replace(/\n/g, '<br>') + '</td></tr>')
			.join('') +
		'</table>'
	)
}

// Sends one email. Never throws: a mail failure must not break the form submission.
function send({ to, subject, html, replyTo }) {
	try {
		const settings = $app.settings()
		if (!settings.smtp.enabled) {
			$app.logger().warn('Email skipped: SMTP is not enabled', 'subject', subject)
			return
		}
		const message = new MailerMessage({
			from: { address: settings.meta.senderAddress, name: settings.meta.senderName },
			to: [{ address: to }],
			subject: subject,
			html: html,
			headers: replyTo ? { 'Reply-To': replyTo } : {},
		})
		$app.newMailClient().send(message)
	} catch (err) {
		$app.logger().error('Email failed', 'subject', subject, 'error', String(err))
	}
}

// Notify the committee, and optionally confirm to the person who submitted.
function notify({ subject, pairs, replyTo, confirm }) {
	send({
		to: NOTIFY_TO,
		subject: subject,
		html: '<p>' + esc(subject) + '</p>' + rows(pairs),
		replyTo: replyTo,
	})
	if (confirm && replyTo) {
		send({
			to: replyTo,
			subject: confirm.subject,
			html:
				'<p>Bonjour ' + esc(confirm.name) + ',</p><p>' + esc(confirm.body) + '</p>' +
				rows(pairs) +
				'<p>If you have any questions, just reply to this email.</p>' +
				'<p>À bientôt,<br>Alliance Française Illawarra</p>',
			replyTo: NOTIFY_TO,
		})
	}
}

module.exports = { notify }

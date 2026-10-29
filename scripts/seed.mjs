// Loads pocketbase/seed/*.json (and images) into a running PocketBase.
// Usage: PB_URL=http://127.0.0.1:8090 PB_ADMIN_EMAIL=... PB_ADMIN_PASSWORD=... node scripts/seed.mjs
import fs from 'node:fs';
import path from 'node:path';
import PocketBase from 'pocketbase';

const url = process.env.PB_URL || 'http://127.0.0.1:8090';
const email = process.env.PB_ADMIN_EMAIL;
const password = process.env.PB_ADMIN_PASSWORD;
if (!email || !password) {
	console.error('Set PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD (see .env.example).');
	process.exit(1);
}

const seedDir = path.resolve(import.meta.dirname, '../pocketbase/seed');
const pb = new PocketBase(url);
await pb.collection('_superusers').authWithPassword(email, password);

for (const name of ['team', 'events', 'classes', 'terms']) {
	const rows = JSON.parse(fs.readFileSync(path.join(seedDir, `${name}.json`), 'utf8'));
	for (const row of rows) {
		const { image, ...fields } = row;
		const body = new FormData();
		for (const [key, value] of Object.entries(fields)) body.append(key, String(value));
		if (image) {
			const file = path.join(seedDir, 'images', name, `${row.id}__${image}`);
			if (fs.existsSync(file)) body.append('image', new Blob([fs.readFileSync(file)]), image);
		}
		try {
			await pb.collection(name).getOne(row.id);
			await pb.collection(name).update(row.id, body);
			console.log(`updated ${name}/${row.id}`);
		} catch (error) {
			if (error.status !== 404) throw error;
			await pb.collection(name).create(body);
			console.log(`created ${name}/${row.id}`);
		}
	}
}

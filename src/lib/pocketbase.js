import PocketBase from 'pocketbase';

// In dev the Vite proxy forwards this path to the local PocketBase (see vite.config.js).
// In production, set VITE_PB_URL to the hosted PocketBase address.
const pb = new PocketBase(import.meta.env.VITE_PB_URL || '/hcgi/platform');

export default pb;

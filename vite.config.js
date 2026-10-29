import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src') } },
	server: {
		port: 5173,
		proxy: {
			// Same-origin PocketBase, matching the production /hcgi/platform path.
			'/hcgi/platform': {
				target: 'http://127.0.0.1:8090',
				changeOrigin: true,
				rewrite: (p) => p.replace(/^\/hcgi\/platform/, ''),
			},
		},
	},
});

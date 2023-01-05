import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
	  alias: {
		$lib: path.resolve(__dirname,'./src/lib'),
		$components: path.resolve(__dirname,'./src/components'),
		$assets: path.resolve(__dirname,'./src/lib/assets'),
		$styles: path.resolve(__dirname,'./src/lib/assets/styles'),
		$utils: path.resolve(__dirname,'./src/utils'),
		$stores: path.resolve(__dirname,'./src/stores'),
		$apollo: path.resolve(__dirname,'./src/lib/apollo'),
	  },
	},
	server: {
		port:3000,
		strictPort:false,
	}
};

export default config;

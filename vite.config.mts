import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    cacheDir: './node_modules/.vite/',

    server: {
        port: 4200,
        host: 'localhost',
    },

    preview: {
        port: 4300,
        host: 'localhost',
    },

    plugins: [react()],

    build: {
        outDir: './dist/',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
});

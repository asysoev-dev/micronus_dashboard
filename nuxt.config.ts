// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [],
    ssr: false,
    vite: {
        plugins: [tailwindcss()],
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE,
        },
    },
    css: ['~/assets/css/tailwind.css'],
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  // Static HTML for GitHub Pages; "/" falls back to 404.html (SPA) and redirects client-side
  nitro: {
    prerender: {
      routes: ['/register', '/pattern'],
      ignore: [/^\/$/]
    }
  },
  app: {
    head: {
      title: 'Nuxt App',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
        }
      ]
    }
  }
})

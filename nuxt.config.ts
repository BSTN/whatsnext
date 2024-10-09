// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/content'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2024-10-04',
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/less/ease.less";@import "@/less/animations.less"; @import "@/less/global.less";`
        }
      }
    },
    plugins: [
      // ViteYaml(),
      // svgLoader(),
      // ViteMarkdown({mode: ['html']})
    ]
  },
})
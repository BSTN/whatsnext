// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/content', 'nuxt-security', '@nuxtjs/i18n', '@nuxt/image'],

  routeRules: {
    '/': { prerender: true }
  },

  security: {
    corsHandler: {
      'origin': '*'
    }
  },

  content: {
    sources: {
      github: {
        driver: 'github',
        repo: 'BSTN/whatsnext-content',
      }
    }
  },

  i18n: {
    defaultLocale: 'nl'
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
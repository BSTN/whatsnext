// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "node:path";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/content', 'nuxt-security', '@nuxtjs/i18n', '@nuxt/image',['./modules/github.module', {
    repositories: [{
    name: 'content',
    owner: 'BSTN',
    repo: 'whatsnext-content',
    }]}]],

  routeRules: {
    '/': { prerender: true },
    '/page': {ssr: false}
  },

  security: {
    corsHandler: {
      'origin': '*'
    }
  },

  content: {
    sources: {
      content: {
        driver: 'fs',
        base: './repos/content'
      }
    }
  },

  runtimeConfig: {
    githubtoken: process.env.githubtoken
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'nl',
    detectBrowserLanguage: false
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
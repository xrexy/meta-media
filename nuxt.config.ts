// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/google-fonts",
    "shadcn-nuxt",
  ],

  app: {
    head: {
      htmlAttrs: {
        class: "dark",
        lang: "en-US",
      },
    },
  },

  appConfig: {
    mediaDir:
      import.meta.env.MEDIA_DIR ?? process.env.MEDIA_DIR ?? "./public/.media",
  },

  tailwindcss: {
    viewer: process.argv.includes("--tailwindcss"),
  },

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});

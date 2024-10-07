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

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});

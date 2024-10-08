declare module "nuxt/schema" {
  interface AppConfig {
    mediaDir: string;

    [key: string]: any;
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {};

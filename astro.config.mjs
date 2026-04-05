// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import netlify from "@astrojs/netlify";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV || "",
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  site: "https://jamesbuttonoboe.com/",

  adapter: netlify({
    imageCDN: true,
  }),

  image: {
    responsiveStyles: true,
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Playfair Display",
      cssVariable: "--font-Playfair",
      weights: [400, 700],
      subsets: ["latin"],
      styles: ["normal"],
    },
    {
      provider: fontProviders.google(),
      name: "Montserrat",
      cssVariable: "--font-Montserrat",
      weights: [400, 700],
      subsets: ["latin"],
      styles: ["normal"],
    },
  ],

  experimental: {
    svgo: true,
  },

  vite: {
    build: {
      target: "esnext",
      minify: false,
    },
  },

  integrations: [
    sitemap({
      filter: (page) =>
        [
          "https://jamesbuttonoboe.com/ds/",
          "https://jamesbuttonoboe.com/studio/",
        ].includes(page),
    }),
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      // Set useCdn to false if you're building statically.
      useCdn: false,
      studioBasePath: "/studio",
    }),
    react(),
  ],
});

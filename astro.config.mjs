// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { loadEnv } from "vite";
import netlify from "@astrojs/netlify";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  site: "https://jamesbuttonoboe.com/",

  adapter: netlify({
    imageCDN: true,
  }),

  trailingSlash: "always",

  image: {
    responsiveStyles: true,
  },

  experimental: {
    svgo: true,
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Playfair Display",
        cssVariable: "--font-Playfair",
        weights: [400, 700],
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
  },

  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      // Set useCdn to false if you're building statically.
      useCdn: false,
      studioBasePath: "/admin",
    }),
    ,
    react(),
  ],

  vite: {
    optimizeDeps: {
      exclude: ["fsevents"],
    },
    ssr: {
      external: ["fsevents"],
    },
  },
});

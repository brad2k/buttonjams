// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import netlify from "@astrojs/netlify";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Playfair Display",
        cssVariable: "--font-Playfair",
        subsets: ["latin"],
      },
      {
        provider: fontProviders.google(),
        name: "Montserrat",
        cssVariable: "--font-Montserrat",
        weights: ["400 700"],
        subsets: ["latin"],
      },
    ],
  },

  integrations: [react()],
});
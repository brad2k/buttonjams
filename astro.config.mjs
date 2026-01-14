// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Playfair Display",
        cssVariable: "--font-Playfair",
        styles: ["normal"],
      },
      {
        provider: fontProviders.google(),
        name: "Montserrat",
        cssVariable: "--font-Montserrat",
        weights: [400, 700],
        subsets: ["latin"],
      },
    ],
  },
});

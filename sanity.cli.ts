import { defineCliConfig } from "sanity/cli";
import dotenv from "dotenv";

// Loads the .env file from the root directory into process.env
dotenv.config();

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.PUBLIC_SANITY_DATASET,
  },
});

// sanity.config.ts
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";

const projectId =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
  process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset =
  import.meta.env.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET;

export default defineConfig({
  name: "james-button-studio",
  title: "James Button Studio",
  projectId: projectId || "ths10aea",
  dataset: dataset || "production",
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("page").title("Pages"),
            S.documentTypeListItem("event").title("Events"),
            orderableDocumentListDeskItem({
              type: "song",
              title: "Audio excerpts",
              S,
              context,
            }),
          ]),
    }),
  ],
  schema,
  deployment: {
    appId: "slsc3gobbhuuqk8wnz9cehje",
  },
});

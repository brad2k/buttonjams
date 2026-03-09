// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "james-button-studio",
  title: "James Button Studio",
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
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
});

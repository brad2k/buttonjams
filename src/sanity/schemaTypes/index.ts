import type { SchemaTypeDefinition } from "sanity";
import page from "./page";
import event from "./event";
import song from "./song";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, event, song],
};

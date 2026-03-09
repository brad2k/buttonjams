import type { SchemaTypeDefinition } from "sanity";
import page from "./page";
import event from "./event";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, event],
};

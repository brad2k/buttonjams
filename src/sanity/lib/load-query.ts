// ./src/sanity/lib/load-query.ts
import { createClient, type QueryParams } from "@sanity/client";

const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: "v2023-08-24",
  useCdn: false,
});

export async function loadQuery<QueryResponse>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}) {
  const { result } = await sanityClient.fetch<QueryResponse>(
    query,
    params ?? {},
    { filterResponse: false },
  );

  return {
    data: result,
  };
}

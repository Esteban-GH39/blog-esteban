import { createClient } from "@content-island/api-client";

export const client = createClient({
  accessToken: import.meta.env.CONTENT_ISLAND_TOKEN,
});
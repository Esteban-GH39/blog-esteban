import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        category: z.enum(["devlog", "notas"]),
    }),
});

export const collections = { blog };
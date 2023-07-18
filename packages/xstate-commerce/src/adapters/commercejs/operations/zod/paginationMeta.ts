import { z } from 'zod';

export const paginationMetaSchema = z.object({
  pagination: z.object({
    count: z.number(),
    current_page: z.number(),
    links: z.any(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number(),
  }),
});

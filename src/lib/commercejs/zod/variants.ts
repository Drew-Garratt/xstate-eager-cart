import { unknown, z } from 'zod';

export const variantSchema = z.object({
  data: z
    .array(
      z.object({
        id: z.string(),
        sku: z.string().or(z.null()),
        description: z.string().or(z.null()),
        inventory: z.number().or(z.null()),
        price: z.object({
          raw: z.number(),
          formatted: z.string(),
          formatted_with_symbol: z.string(),
          formatted_with_code: z.string(),
        }).or(z.null()),
        is_valid: z.boolean(),
        invalid_reason_code: z.null(),
        meta: z.null(),
        created: z.number(),
        updated: z.number(),
        options: z.unknown(),
        assets: z.array(z.unknown()),
      })
    )
    .or(z.undefined()),
  meta: z.object({
    pagination: z.object({
      total: z.number(),
      count: z.number(),
      per_page: z.number(),
      current_page: z.number(),
      total_pages: z.number(),
      links: z.object({}),
    }),
  }),
});

export type CommercejsVariant = z.infer<typeof variantSchema>;

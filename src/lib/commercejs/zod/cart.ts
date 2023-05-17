import { z } from 'zod';
import { assetSchema } from './asset';

export const commercejsCartSchema = z.object({
  id: z.string(),
  created: z.number(),
  updated: z.number(),
  expires: z.number(),
  total_items: z.number(),
  total_unique_items: z.number(),
  subtotal: z.object({
    raw: z.number(),
    formatted: z.string(),
    formatted_with_symbol: z.string(),
    formatted_with_code: z.string(),
  }),
  hosted_checkout_url: z.string(),
  line_items: z.array(
    z.object({
      id: z.string(),
      product_id: z.string(),
      name: z.string(),
      product_name: z.string(),
      sku: z.null(),
      permalink: z.string(),
      quantity: z.number(),
      price: z.object({
        raw: z.number(),
        formatted: z.string(),
        formatted_with_symbol: z.string(),
        formatted_with_code: z.string(),
      }),
      line_total: z.object({
        raw: z.number(),
        formatted: z.string(),
        formatted_with_symbol: z.string(),
        formatted_with_code: z.string(),
      }),
      is_valid: z.boolean(),
      product_meta: z.array(z.unknown()),
      selected_options: z.array(z.unknown()),
      variant: z.unknown(),
      image: z.object(assetSchema.shape).or(z.null()),
    })
  ),
  currency: z.object({ code: z.string(), symbol: z.string() }),
  discount: z.array(z.unknown()),
  meta: z.unknown(),
});

export type CommercejsCart = z.infer<typeof commercejsCartSchema>;

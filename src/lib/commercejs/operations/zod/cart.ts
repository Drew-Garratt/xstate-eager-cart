import { z } from 'zod';
import { assetSchema } from './asset';

export const commercejsPriceSchema = z.object({
  raw: z.number(),
  formatted: z.string(),
  formatted_with_symbol: z.string(),
  formatted_with_code: z.string(),
});

export const commercejsCurrencySchema = z.object({
  symbol: z.string(),
  code: z.string(),
});

export const commercejsVariantSchema = z.object({
  id: z.string(),
  sku: z.string().nullable(),
  description: z.string().nullable(),
  inventory: z.number().nullable(),
  price: commercejsPriceSchema.nullable(),
  is_valid: z.boolean(),
  invalid_reason_code: z.string().nullable(),
  meta: z.any(),
  created: z.union([z.number(), z.undefined()]).optional(),
  updated: z.union([z.number(), z.undefined()]).optional(),
  options: z.record(z.string()),
  assets: z.array(assetSchema),
});

export const commercejsSelectedVariantSchema = z.object({
  group_id: z.string(),
  group_name: z.string(),
  option_id: z.string(),
  option_name: z.string(),
  price: commercejsPriceSchema,
});

export const commercejsLineItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  product_id: z.string(),
  product_name: z.string(),
  product_meta: z.any(),
  sku: z.string().or(z.null()),
  permalink: z.string(),
  media: z.any(),
  selected_options: z.array(commercejsSelectedVariantSchema),
  variant: commercejsVariantSchema.optional(),
  price: commercejsPriceSchema,
  line_total: commercejsPriceSchema.or(z.number()),
  image: assetSchema.nullable(),
});

export const commercejsCartSchema = z.object({
  id: z.string(),
  created: z.number(),
  updated: z.number(),
  expires: z.number(),
  total_items: z.number(),
  total_unique_items: z.number(),
  subtotal: commercejsPriceSchema,
  currency: commercejsCurrencySchema,
  discount_code: z.any(),
  hosted_checkout_url: z.string(),
  line_items: z.array(commercejsLineItemSchema),
});
export type CommercejsCart = z.infer<typeof commercejsCartSchema>;

export const addUpdateResponseSchema = z.object({
  success: z.boolean(),
  event: z.literal('Cart.Item.Added').or(z.literal('Cart.Item.Updated')),
  line_item_id: z.string(),
  product_id: z.string(),
  product_name: z.string(),
  quantity: z.number(),
  line_total: commercejsPriceSchema.or(z.number()),
  cart: commercejsCartSchema,
  image: assetSchema.nullable(),
});
export type CommercejsAddUpdateResponse = z.infer<
  typeof addUpdateResponseSchema
>;

export const removeResponseSchema = z.object({
  success: z.boolean(),
  event: z.literal('Cart.Item.Removed'),
  line_item_id: z.string(),
  cart: commercejsCartSchema,
});
export type CommercejsCartRemoveResponse = z.infer<typeof removeResponseSchema>;

export const deleteResponseSchema = z.object({
  success: z.boolean(),
  event: z.string(),
  cart_id: z.string(),
});
export type CommercejsCartDeleteResponse = z.infer<typeof deleteResponseSchema>;

export const emptyResponseSchema = z.object({
  success: z.boolean(),
  event: z.string(),
  cart: commercejsCartSchema,
});
export type CommercejsCartEmptyResponse = z.infer<typeof emptyResponseSchema>;

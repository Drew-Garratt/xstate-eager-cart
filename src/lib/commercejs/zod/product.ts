import { z } from 'zod';
import { assetSchema } from './asset';

export const productSchema = z.object({
  id: z.string(),
  created: z.number(),
  updated: z.number(),
  active: z.boolean(),
  permalink: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.object({
    raw: z.number(),
    formatted: z.string(),
    formatted_with_symbol: z.string(),
    formatted_with_code: z.string(),
  }),
  inventory: z.object({ managed: z.boolean(), available: z.number() }),
  sku: z.string().or(z.null()),
  sort_order: z.number(),
  seo: z.object({ title: z.null(), description: z.null() }),
  thank_you_url: z.string().or(z.null()),
  media: z
    .object({
      type: z.string(),
      source: z.string(),
    })
    .or(z.undefined()),
  meta: z.any(),
  conditionals: z.object({
    is_active: z.boolean(),
    is_tax_exempt: z.boolean(),
    is_pay_what_you_want: z.boolean(),
    is_inventory_managed: z.boolean(),
    is_sold_out: z.boolean(),
    has_digital_delivery: z.boolean(),
    has_physical_delivery: z.boolean(),
    has_images: z.boolean(),
    collects_fullname: z.boolean(),
    collects_shipping_address: z.boolean(),
    collects_billing_address: z.boolean(),
    collects_extra_fields: z.boolean(),
  }),
  is: z.object({
    active: z.boolean(),
    tax_exempt: z.boolean(),
    pay_what_you_want: z.boolean(),
    inventory_managed: z.boolean(),
    sold_out: z.boolean(),
  }),
  has: z.object({
    digital_delivery: z.boolean(),
    physical_delivery: z.boolean(),
    images: z.boolean(),
  }),
  collects: z.object({
    fullname: z.boolean(),
    shipping_address: z.boolean(),
    billing_address: z.boolean(),
    extra_fields: z.boolean(),
  }),
  checkout_url: z.object({ checkout: z.string(), display: z.string() }),
  categories: z.array(z.unknown()),
  image: z.object(assetSchema.shape).or(z.null()),
  extra_fields: z.array(z.unknown()),
  variant_groups: z.array(z.unknown()),
  assets: z.array(z.object(assetSchema.shape)),
  attributes: z.unknown(),
  related_products: z.array(z.unknown()),
});

export type CommercejsProduct = z.infer<typeof productSchema>;

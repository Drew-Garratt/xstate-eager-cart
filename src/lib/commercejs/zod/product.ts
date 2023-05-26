import { z } from 'zod';
import { assetSchema } from './asset';

export const priceSchema = z.object({
  raw: z.number(),
  formatted: z.string(),
  formatted_with_symbol: z.string(),
  formatted_with_code: z.string()
})

export const productVariantOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: priceSchema,
  assets: z.array(z.string()).nullable(),
  meta: z.any(),
  created: z.number().nullable(),
  updated: z.number().nullable()
})

export const productAttributeOptionSchema = z.object({
  label: z.string(),
  value: z.string()
})

export const productAttributeSchema = z.object({
  id: z.string(),
  meta: z.any(),
  name: z.string(),
  value: z
    .union([z.string(), z.number(), z.array(productAttributeOptionSchema)])
    .nullable()
})

export const productVariantGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.any().optional(),
  created: z.number().nullable(),
  updated: z.number().nullable(),
  options: z.array(productVariantOptionSchema)
})

export const productSchema = z.object({
  id: z.string(),
  created: z.number(),
  updated: z.number(),
  active: z.boolean(),
  permalink: z.string(),
  name: z.string(),
  description: z.string(),
  price: priceSchema,
  inventory: z.object({
    managed: z.boolean(),
    available: z.number()
  }),
  media: z.object({
    type: z.string(),
    source: z.string()
  }).or(z.undefined()),
  sku: z.string().nullable(),
  sort_order: z.number(),
  seo: z.object({
    title: z.string().nullable(),
    description: z.string().nullable()
  }),
  thank_you_url: z.string().nullable(),
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
    collects_extra_fields: z.boolean().or(z.undefined())
  }),
  is: z.object({
    active: z.boolean(),
    tax_exempt: z.boolean(),
    pay_what_you_want: z.boolean(),
    inventory_managed: z.boolean(),
    sold_out: z.boolean()
  }),
  has: z.object({
    digital_delivery: z.boolean(),
    physical_delivery: z.boolean(),
    images: z.boolean(),
    video: z.boolean().or(z.undefined()),
    rich_embed: z.boolean().or(z.undefined())
  }),
  collects: z.object({
    fullname: z.boolean(),
    shipping_address: z.boolean(),
    billing_address: z.boolean(),
    extra_fields: z.boolean().or(z.undefined())
  }),
  checkout_url: z.object({
    checkout: z.string(),
    display: z.string()
  }),
  extra_fields: z.array(z.any()),
  variant_groups: z.array(productVariantGroupSchema),
  categories: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string()
    })
  ),
  assets: z.array(assetSchema),
  image: assetSchema.nullable(),
  attributes: z.array(productAttributeSchema),
  related_products: z.array(z.any())
})

export type CommercejsProduct = z.infer<typeof productSchema>;

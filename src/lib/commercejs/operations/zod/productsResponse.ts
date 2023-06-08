import { z } from 'zod';
import { paginationMetaSchema } from './paginationMeta';
import { productSchema } from './product';

export const productsResponseSchema = z.object({
  data: z.array(productSchema).optional(),
  meta: paginationMetaSchema,
});

export type CommercejsProductsResponse = z.infer<typeof productsResponseSchema>;

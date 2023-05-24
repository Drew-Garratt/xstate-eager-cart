import { z } from 'zod';

export const assetSchema = z.object({
  id: z.string(),
  url: z.string(),
  description: z.string().nullable(),
  is_image: z.boolean(),
  filename: z.string(),
  file_extension: z.string(),
  image_dimensions: z.object({
    width: z.number(),
    height: z.number()
  }),
  file_size: z.union([z.number(), z.undefined()]).optional(),
  meta: z.any(),
  created_at: z.number(),
  updated_at: z.number()
})
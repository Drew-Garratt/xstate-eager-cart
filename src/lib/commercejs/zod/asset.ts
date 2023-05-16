import { z } from 'zod';

export const assetSchema = z.object({
  id: z.string(),
  url: z.string(),
  description: z.null(),
  is_image: z.boolean(),
  filename: z.string(),
  file_size: z.number().or(z.null()),
  file_extension: z.string().or(z.null()),
  image_dimensions: z.unknown(),
  meta: z.array(z.unknown()),
  created_at: z.number(),
  updated_at: z.number(),
});

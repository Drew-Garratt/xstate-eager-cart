import { z } from 'zod';

export const apiMenuSchema = z.object({
  items: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
    })
  ),
});

export type CommercejsMenu = z.infer<typeof apiMenuSchema>;

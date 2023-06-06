import { commercejsFetcher } from './fetcher';
import { type CommercejsVariant, variantSchema } from './zod/variants';

export async function commercejsGetVariants({
  productId,
}: {
  productId: string;
}): Promise<CommercejsVariant | false> {
  return commercejsFetcher<CommercejsVariant>({
    path: `products/${productId}/variants`,
    schema: variantSchema,
  });
}

export default commercejsGetVariants;

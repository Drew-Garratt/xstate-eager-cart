import { CommercejsVariant, variantSchema } from './zod/variants';
import { commercejsFetcher } from './fetcher';

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

import { commercejsFetcher } from './fetcher';
import { type CommercejsProduct, productSchema } from './zod/product';

export async function commercejsGetProduct({
  permalink,
}: {
  permalink: string;
}): Promise<CommercejsProduct | false> {
  return commercejsFetcher<CommercejsProduct>({
    path: `products/${permalink}`,
    params: { type: 'permalink' },
    schema: productSchema,
  });
}

export default commercejsGetProduct;

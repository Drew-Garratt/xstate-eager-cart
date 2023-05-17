import { CommercejsCart, commercejsCartSchema } from './zod/cart';
import { commercejsFetcher } from './fetcher';

export async function commercejsAddToCart({
  cartId,
  productId,
  quantity,
}: {
  cartId: string;
  productId: string;
  quantity: number;
  options?: unknown;
  variantId?: string;
}): Promise<CommercejsCart | false> {
  return commercejsFetcher<CommercejsCart>({
    path: `cart/${cartId}`,
    method: 'POST',
    params: {
      id: cartId,
      productId,
      quantity: quantity.toString(),
    },
    schema: commercejsCartSchema,
  });
}

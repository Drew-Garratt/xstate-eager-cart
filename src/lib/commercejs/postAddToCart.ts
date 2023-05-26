import { addUpdateResponseSchema, CommercejsAddUpdateResponse } from './zod/cart';
import { commercejsFetcher } from './fetcher';

/**
 * Commmerce JS Add to Cart
 *
 * @description Add an item to the cart
 * @link https://commercejs.com/docs/sdk/cart/#add-to-cart
 *
 * @param param0 : { cartId: string; productId: string; quantity: number; options?: unknown; variantId?: string; }
 * @returns : Promise<CommercejsCart | false>
 */
export async function commercejsAddToCart({
  cartId,
  productId,
  quantity,
  variantId,
  options
}: {
  cartId: string;
  productId: string;
  quantity: number;
  options?: unknown;
  variantId?: string;
}): Promise<CommercejsAddUpdateResponse | false> {
  return commercejsFetcher<CommercejsAddUpdateResponse>({
    path: `carts/${cartId}`,
    method: 'POST',
    params: {
      id: variantId ?? productId,
      quantity: quantity.toString(),
      options
    },
    schema: addUpdateResponseSchema,
  });
}

export default commercejsAddToCart;

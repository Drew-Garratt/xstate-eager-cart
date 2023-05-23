import { CommercejsCart, commercejsCartSchema } from './zod/cart';
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
}: {
  cartId: string;
  productId: string;
  quantity: number;
  options?: unknown;
  variantId?: string;
}): Promise<CommercejsCart | false> {
  return commercejsFetcher<CommercejsCart>({
    path: `carts/${cartId}`,
    method: 'POST',
    params: {
      id: productId,
      quantity: quantity.toString(),
    },
    schema: commercejsCartSchema,
  });
}

export default commercejsAddToCart;

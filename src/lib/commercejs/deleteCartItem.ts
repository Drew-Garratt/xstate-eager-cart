import { CommercejsCart, commercejsCartSchema } from './zod/cart';
import { commercejsFetcher } from './fetcher';

/**
 * Commmerce JS Remove item from cart
 *
 * @description Remove item from cart
 * @link https://commercejs.com/docs/api/#remove-item-from-cart
 *
 * @returns : Promise<CommercejsCart | false>
 */
export async function commercejsRemoveFromCart({
  cartId,
  lineItemId,
}: {
  cartId: string;
  lineItemId: string;
}): Promise<CommercejsCart | false> {
  return commercejsFetcher<CommercejsCart>({
    path: `carts/${cartId}/items/${lineItemId}`,
    method: 'DELETE',
    schema: commercejsCartSchema,
  });
}

export default commercejsRemoveFromCart;

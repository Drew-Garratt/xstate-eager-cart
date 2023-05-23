import { CommercejsCart, commercejsCartSchema } from './zod/cart';
import { commercejsFetcher } from './fetcher';

/**
 * Commmerce JS Get Cart
 *
 * @description Get a fresh cart
 * @link https://commercejs.com/docs/sdk/cart/#retrieve-a-cart
 *
 * @returns : Promise<CommercejsCart | false>
 */
export async function commercejsGetCart(): Promise<CommercejsCart | false> {
  return commercejsFetcher<CommercejsCart>({
    path: `carts`,
    schema: commercejsCartSchema,
  });
}

export default commercejsGetCart;

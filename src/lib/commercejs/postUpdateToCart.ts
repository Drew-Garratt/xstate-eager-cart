import { CommercejsAddUpdateResponse, CommercejsCart, addUpdateResponseSchema, commercejsCartSchema } from './zod/cart';
import { commercejsFetcher } from './fetcher';

/**
 * Commmerce JS Update item in cart
 *
 * @description Update item in cart
 * @link https://commercejs.com/docs/api/#update-item-in-cart
 *
 * @param param0 : { cartId: string; productId: string; quantity: number; options?: unknown; variantId?: string; }
 * @returns : Promise<CommercejsCart | false>
 */
export async function commercejsUpdateToCart({
  cartId,
  lineItemId,
  quantity,
  options,
  variantId,
}: {
  cartId: string;
  lineItemId: string;
  quantity?: number;
  options?: unknown;
  variantId?: string;
}): Promise<CommercejsAddUpdateResponse | false> {
  const params: Record<string, unknown> = {};

  if (quantity) params.quantity = quantity;
  if (options) params.options = options;
  if (variantId) params.variant_id = variantId;

  return commercejsFetcher<CommercejsAddUpdateResponse>({
    path: `carts/${cartId}/items/${lineItemId}`,
    method: 'PUT',
    params,
    schema: addUpdateResponseSchema,
  });
}

export default commercejsUpdateToCart;

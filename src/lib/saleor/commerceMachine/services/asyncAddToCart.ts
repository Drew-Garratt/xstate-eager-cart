import { StoreActor } from '@/lib/vercelCommerce/machine';
import { addToCart } from '../..';
import { commercejsCleanCartResponse } from '@/lib/commercejs/utils/cleanCart';

export const asyncAddToCart: StoreActor = async (context, event) => {
  if (event.type !== 'ASYNC_ADD_TO_CART') return;

  /**
   * If there is no cart in the context return
   **/
  if (!context.cartContext.cart)  throw new Error('No cart in context');

  let payload: {
    cartId: string;
    productId: string;
    quantity: number;
    options?: unknown;
    variantId?: string;
  } = {
    cartId: context.cartContext.cart.id,
    productId: event.data.item.productId ?? event.data.item.variantId,
    quantity: event.data.item.quantity ?? 1,
  };

  const responce = await addToCart(
    context.cartContext.cart.id, 
    [{
        merchandiseId: payload.variantId ?? payload.productId,
        quantity: payload.quantity,
    }]
  );

  if (!responce) throw new Error('No return from commercejsAddToCart');

  if (!responce.success) throw new Error('Add to cart failed');

  return { type: 'ADD_TO_CART_DONE', cart: commercejsCleanCartResponse(responce) };
};

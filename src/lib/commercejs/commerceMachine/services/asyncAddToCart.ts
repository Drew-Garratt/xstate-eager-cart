import { StoreActor } from '@/lib/commerceMachine';
import commercejsAddToCart from '../../postAddToCart';
import { commercejsCleanCart } from '../../utils/cleanCart';

export const asyncAddToCart: StoreActor = async (context, event) => {
  if (event.type !== 'ASYNC_ADD_TO_CART') return;

  /**
   * If there is no cart in the context return
   **/
  if (!context.cartContext.cart) throw new Error('No cart in context');

  let payload: {
    cartId: string;
    productId: string;
    quantity: number;
    options?: unknown;
    variantId?: string;
  } | null = null;

  if (event.data.item.productId) {
    payload = {
      cartId: context.cartContext.cart.id,
      productId: event.data.item.productId,
      variantId: event.data.item.variantId,
      quantity: event.data.item.quantity ?? 1,
    };
  } else {
    payload = {
      cartId: context.cartContext.cart.id,
      productId: event.data.item.variantId,
      quantity: event.data.item.quantity ?? 1,
    };
  }

  const cart = await commercejsAddToCart(payload);

  if (!cart) throw new Error('Cart is undefined');

  return { type: 'ADD_TO_CART_DONE', cart: commercejsCleanCart(cart) };
};

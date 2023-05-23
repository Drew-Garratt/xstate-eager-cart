import { StoreActor } from '@/lib/storeMachine';
import { commercejsCleanCart } from '../../utils/cleanCart';
import commercejsRemoveFromCart from '../../deleteCartItem';
import { findLineItem } from '../../utils/findLineItem';

export const asyncRemoveFromCart: StoreActor = async (context, event) => {
  if (event.type !== 'ASYNC_REMOVE_FROM_CART') return;

  /**
   * If there is no cart in the context return
   **/
  if (!context.cartContext.cart) throw new Error('No cart in context');

  /**
   * Find the line item in the cart
   * If there is no line item return early
   * Otherwise destructure the line item and the line item ID
   */
  const cartLineItem = findLineItem({
    productId: event.data.itemId,
    lineItems: context.cartContext.cart.lineItems,
  });
  if (!cartLineItem) return context;
  const { lineItemId, lineItem } = cartLineItem;

  const cart = await commercejsRemoveFromCart({
    cartId: context.cartContext.cart.id,
    lineItemId,
  });

  if (!cart) throw new Error('Cart is undefined');

  return { type: 'REMOVE_FROM_CART_DONE', cart: commercejsCleanCart(cart) };
};

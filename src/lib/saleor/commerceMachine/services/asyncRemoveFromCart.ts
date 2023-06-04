import { StoreActor } from '@/lib/vercelCommerce/machine';
import { commercejsCleanCart } from '@/lib/commercejs/utils/cleanCart';
import { findLineItem } from '@/lib/commercejs/utils/findLineItem';
import commercejsRemoveFromCart from '@/lib/commercejs/deleteCartItem';

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
  const { lineItem } = cartLineItem;

  const cart = await commercejsRemoveFromCart({
    cartId: context.cartContext.cart.id,
    lineItemId: lineItem.id,
  });

  if (!cart) throw new Error('Cart is undefined');

  return { type: 'REMOVE_FROM_CART_DONE', cart: commercejsCleanCart(cart) };
};

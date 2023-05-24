import { StoreActor } from '@/lib/commerceMachine';
import { findLineItem } from '../../utils/findLineItem';
import commercejsUpdateToCart from '../../postUpdateToCart';
import { commercejsCleanCart } from '../../utils/cleanCart';

export const asyncUpdateCart: StoreActor = async (context, event) => {
  if (event.type !== 'ASYNC_UPDATE_CART') return;

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

  const cart = await commercejsUpdateToCart({
    cartId: context.cartContext.cart.id,
    lineItemId,
    quantity: event.data.item.quantity,
  });

  if (!cart) throw new Error('Cart is undefined');

  return { type: 'REMOVE_FROM_CART_DONE', cart: commercejsCleanCart(cart) };
};

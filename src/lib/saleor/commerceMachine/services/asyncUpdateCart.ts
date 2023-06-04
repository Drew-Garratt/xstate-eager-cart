import commercejsUpdateToCart from '@/lib/commercejs/postUpdateToCart';
import { findLineItem } from '@/lib/commercejs/utils/findLineItem';
import { StoreActor } from '@/lib/vercelCommerce/machine';
import { commercejsCleanCartResponse } from '@/lib/commercejs/utils/cleanCart';

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

  const { lineItem } = cartLineItem;

  const responce = await commercejsUpdateToCart({
    cartId: context.cartContext.cart.id,
    lineItemId: lineItem.id,
    quantity: event.data.item.quantity,
  });

  if (!responce) throw new Error('Cart is undefined');

  return { type: 'UPDATE_CART_DONE', cart: commercejsCleanCartResponse(responce) };
};

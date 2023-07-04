import { type OptimisticCartMachineOptions } from '@/lib/vercelCommerce/xstate/machines/optimisticCart';
import commercejsRemoveFromCart from '../../operations/deleteCartItem';
import { commercejsCleanCart } from '../../utils/cleanCart';
import { findLineItem } from '../../utils/findLineItem';

export const asyncRemoveFromCart: OptimisticCartMachineOptions['services']['asyncRemoveFromCart'] =
  async (context, event) => {
    /**
     * If there is no cart in the context return
     **/
    if (!context.cart) throw new Error('No cart in context');

    /**
     * Find the line item in the cart
     * If there is no line item return early
     * Otherwise destructure the line item and the line item ID
     */
    const cartLineItem = findLineItem({
      productId: event.data.itemId,
      lineItems: context.cart.lineItems,
    });

    if (!cartLineItem) throw new Error('No cart line found');

    const { lineItem } = cartLineItem;

    const cart = await commercejsRemoveFromCart({
      cartId: context.cart.id,
      lineItemId: lineItem.id,
    });

    if (!cart) throw new Error('Cart is undefined');

    return { cart: commercejsCleanCart(cart) };
  };

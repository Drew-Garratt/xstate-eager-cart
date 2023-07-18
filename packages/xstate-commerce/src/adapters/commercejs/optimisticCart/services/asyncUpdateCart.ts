import { type OptimisticCartMachineOptions } from '../../../../machines/optimisticCart';
import { commercejsUpdateToCart } from '../../operations/postUpdateToCart';
import { commercejsCleanCartResponse } from '../../utils/cleanCart';
import { findLineItem } from '../../utils/findLineItem';

export const asyncUpdateCart: OptimisticCartMachineOptions['services']['asyncUpdateCart'] =
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

    if (!cartLineItem) throw new Error('Cart line not found');

    const { lineItem } = cartLineItem;

    const responce = await commercejsUpdateToCart({
      cartId: context.cart.id,
      lineItemId: lineItem.id,
      quantity: event.data.item.quantity,
    });

    if (!responce) throw new Error('Cart is undefined');

    return {
      cart: commercejsCleanCartResponse(responce),
    };
  };

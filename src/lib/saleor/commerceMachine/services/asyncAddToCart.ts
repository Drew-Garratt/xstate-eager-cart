import { type StoreMachineOptions } from '@/lib/vercelCommerce/xstate';
import { saleorFetch } from '../../fetcher';
import { CheckoutAddLineDocument } from '../../generated/graphql';

import { saleorCheckoutToVercelCart } from '../../mappers';

export const asyncAddToCart: StoreMachineOptions['services']['asyncAddToCart'] =
  async (context, event) => {
    /**
     * If there is no cart in the context return
     **/
    if (!context.cartContext.cart) throw new Error('No cart in context');

    const cartId = context.cartContext.cart.id;

    const saleorCheckout = await saleorFetch({
      query: CheckoutAddLineDocument,
      variables: {
        checkoutId: cartId,
        lines: [
          {
            variantId: event.data.item.variantId,
            quantity: event.data.item.quantity ?? 1,
          },
        ],
      },
      cache: 'no-store',
    });

    if (!saleorCheckout.checkoutLinesAdd?.checkout) {
      console.error(saleorCheckout.checkoutLinesAdd?.errors);
      throw new Error(`Couldn't add lines to checkout.`);
    }

    const response = await saleorCheckoutToVercelCart(
      saleorCheckout.checkoutLinesAdd.checkout
    );

    return {
      cart: response,
    };
  };

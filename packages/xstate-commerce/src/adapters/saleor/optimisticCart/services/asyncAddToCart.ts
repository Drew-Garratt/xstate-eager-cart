import { type OptimisticCartMachineOptions } from '../../../../machines/optimisticCart';
import { saleorFetch } from '../../fetcher';
import { CheckoutAddLineDocument } from '../../generated/graphql';

import { saleorCheckoutToVercelCart } from '../../mappers';

export const asyncAddToCart: OptimisticCartMachineOptions['services']['asyncAddToCart'] =
  async (context, event) => {
    /**
     * If there is no cart in the context return
     **/
    if (!context.cart) throw new Error('No cart in context');

    const cartId = context.cart.id;

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

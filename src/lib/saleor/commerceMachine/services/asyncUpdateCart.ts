import { type StoreMachineOptions } from '@/lib/vercelCommerce/machine';
import { saleorFetch } from '../../fetcher';
import { CheckoutUpdateLineDocument } from '../../generated/graphql';
import { saleorCheckoutToVercelCart } from '../../mappers';

export const asyncUpdateCart: StoreMachineOptions['services']['asyncUpdateCart'] =
  async (context, event) => {
    /**
     * If there is no cart in the context return
     **/
    if (!context.cartContext.cart) throw new Error('No cart in context');

    const cartId = context.cartContext.cart.id;
    const saleorCheckout = await saleorFetch({
      query: CheckoutUpdateLineDocument,
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

    if (!saleorCheckout.checkoutLinesUpdate?.checkout) {
      console.error(saleorCheckout.checkoutLinesUpdate?.errors);
      throw new Error(`Couldn't update lines in checkout.`);
    }

    return {
      cart: saleorCheckoutToVercelCart(
        saleorCheckout.checkoutLinesUpdate.checkout
      ),
    };
  };

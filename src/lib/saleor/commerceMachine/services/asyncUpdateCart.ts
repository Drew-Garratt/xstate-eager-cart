import { type OptimisticCartMachineOptions } from '@/lib/vercelCommerce/xstate/machines/optimisticCart';
import { saleorFetch } from '../../fetcher';
import { CheckoutUpdateLineDocument } from '../../generated/graphql';
import { saleorCheckoutToVercelCart } from '../../mappers';

export const asyncUpdateCart: OptimisticCartMachineOptions['services']['asyncUpdateCart'] =
  async (context, event) => {
    /**
     * If there is no cart in the context return
     **/
    if (!context.cart) throw new Error('No cart in context');

    const cartId = context.cart.id;
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

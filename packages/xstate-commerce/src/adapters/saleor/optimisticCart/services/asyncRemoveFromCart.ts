import { type OptimisticCartMachineOptions } from '../../../../machines/optimisticCart/optimisticCartMachine';
import { saleorFetch } from '../../fetcher';
import { CheckoutDeleteLineDocument } from '../../generated/graphql';
import { saleorCheckoutToVercelCart } from '../../mappers';

export const asyncRemoveFromCart: OptimisticCartMachineOptions['services']['asyncRemoveFromCart'] =
  async (context, event) => {
    /**
     * If there is no cart in the context return
     **/
    if (!context.cart) throw new Error('No cart in context');

    const cartId = context.cart.id;

    const saleorCheckout = await saleorFetch({
      query: CheckoutDeleteLineDocument,
      variables: {
        checkoutId: cartId,
        lineIds: [event.data.itemId],
      },
      cache: 'no-store',
    });

    if (!saleorCheckout.checkoutLinesDelete?.checkout) {
      console.error(saleorCheckout.checkoutLinesDelete?.errors);
      throw new Error(`Couldn't remove lines from checkout.`);
    }

    return {
      cart: saleorCheckoutToVercelCart(
        saleorCheckout.checkoutLinesDelete.checkout
      ),
    };
  };

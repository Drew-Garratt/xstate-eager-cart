import { type OptimisticCartMachineOptions } from '@/lib/vercelCommerce/xstate/machines/optimisticCart';
import { saleorFetch } from '../../fetcher';
import { CreateCheckoutDocument } from '../../generated/graphql';
import { saleorCheckoutToVercelCart } from '../../mappers';

export const asyncCreateCart: OptimisticCartMachineOptions['services']['asyncCreateCart'] =
  async () => {
    const saleorCheckout = await saleorFetch({
      query: CreateCheckoutDocument,
      variables: {
        input: {
          channel: 'default-channel',
          lines: [],
        },
      },
      cache: 'no-store',
    });

    if (!saleorCheckout.checkoutCreate?.checkout) {
      console.error(saleorCheckout.checkoutCreate?.errors);
      throw new Error(`Couldn't create checkout.`);
    }

    return {
      cart: saleorCheckoutToVercelCart(saleorCheckout.checkoutCreate.checkout),
    };
  };

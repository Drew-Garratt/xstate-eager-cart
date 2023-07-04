import { type OptimisticCartMachineOptions } from '@/lib/vercelCommerce/xstate/machines/optimisticCart';
import { commercejsAddToCart } from '../../operations/postAddToCart';
import { commercejsCleanCartResponse } from '../../utils/cleanCart';

export const asyncAddToCart: OptimisticCartMachineOptions['services']['asyncAddToCart'] =
  async (context, event) => {
    /**
     * If there is no cart in the context return
     **/
    if (!context.cart) throw new Error('No cart in context');

    let payload: {
      cartId: string;
      productId: string;
      quantity: number;
      options?: unknown;
      variantId?: string;
    } = {
      cartId: context.cart.id,
      productId: event.data.item.productId ?? event.data.item.variantId,
      quantity: event.data.item.quantity ?? 1,
    };

    /**
     * Commerce JS the product ID, variant ID, and option ID of a product in order to add it to the cart
     * These are held as a single string and seperate by a ":" character
     *
     * If the product has no variants, the product ID is used alone
     */
    const variantIds = event.data.item.variantId.split(':');

    if (variantIds.length === 3) {
      const [productId, variantId, optionId] = variantIds;
      payload = {
        cartId: context.cart.id,
        productId,
        options: { [variantId]: optionId },
        quantity: event.data.item.quantity ?? 1,
      };
    }

    const responce = await commercejsAddToCart(payload);

    if (!responce) throw new Error('No return from commercejsAddToCart');

    if (!responce.success) throw new Error('Add to cart failed');

    return {
      cart: commercejsCleanCartResponse(responce),
    };
  };

import { type OptimisticCartMachineOptions } from '@/lib/vercelCommerce/xstate/machines/optimisticCart';
import { commercejsGetCart } from '../../operations/getCart';
import { commercejsCleanCart } from '../../utils/cleanCart';

export const asyncCreateCart: OptimisticCartMachineOptions['services']['asyncCreateCart'] =
  async () => {
    const cart = await commercejsGetCart();

    if (!cart) throw new Error('Cart is undefined');

    return { cart: commercejsCleanCart(cart) };
  };

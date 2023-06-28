import { type StoreMachineOptions } from '@/lib/vercelCommerce/xstate';
import { commercejsGetCart } from '../../operations/getCart';
import { commercejsCleanCart } from '../../utils/cleanCart';

export const asyncCreateCart: StoreMachineOptions['services']['asyncCreateCart'] =
  async () => {
    const cart = await commercejsGetCart();

    if (!cart) throw new Error('Cart is undefined');

    return { cart: commercejsCleanCart(cart) };
  };

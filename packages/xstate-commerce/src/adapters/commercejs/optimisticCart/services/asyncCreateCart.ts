import { type OptimisticCartMachineOptions } from '../../../../machines/optimisticCart/optimisticCartMachine';
import { commercejsGetCart } from '../../operations/getCart';
import { commercejsCleanCart } from '../../utils/cleanCart';

export const asyncCreateCart: OptimisticCartMachineOptions['services']['asyncCreateCart'] =
  async () => {
    const cart = await commercejsGetCart();

    if (!cart) throw new Error('Cart is undefined');

    return { cart: commercejsCleanCart(cart) };
  };

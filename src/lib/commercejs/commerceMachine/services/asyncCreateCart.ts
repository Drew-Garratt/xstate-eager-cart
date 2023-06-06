import { type StoreMachineOptions } from '@/lib/vercelCommerce/machine';
import { type Cart } from '@/lib/vercelCommerce/types/cart';
import commercejsGetCart from '../../getCart';
import { commercejsCleanCart } from '../../utils/cleanCart';

export const asyncCreateCart: StoreMachineOptions['services']['asyncCreateCart'] =
  async (): Promise<{
    type: 'CREATE_CART_DONE';
    cart: Cart;
  }> => {
    const cart = await commercejsGetCart();

    if (!cart) throw new Error('Cart is undefined');

    return { type: 'CREATE_CART_DONE', cart: commercejsCleanCart(cart) };
  };

import { commercejsGetCart } from '@/lib/commercejs';
import { commercejsCleanCart } from '@/lib/commercejs/utils/cleanCart';
import { StoreActor } from '@/lib/vercelCommerce/machine';
import { Cart } from '@/lib/vercelCommerce/types/cart';

export const asyncCreateCart: StoreActor = async (): Promise<{
  type: 'CREATE_CART_DONE';
  cart: Cart;
}> => {
  const cart = await commercejsGetCart();

  if (!cart) throw new Error('Cart is undefined');

  return { type: 'CREATE_CART_DONE', cart: commercejsCleanCart(cart) };
};

import { StoreActor } from '@/lib/storeMachine';
import { commercejsCleanCart } from '../../utils/cleanCart';
import commercejsGetCart from '../../getCart';
import { Cart } from 'types.d/cart';

export const asyncCreateCart: StoreActor = async (): Promise<{
  type: 'CREATE_CART_DONE';
  cart: Cart;
}> => {
  const cart = await commercejsGetCart();

  if (!cart) throw new Error('Cart is undefined');

  return { type: 'CREATE_CART_DONE', cart: commercejsCleanCart(cart) };
};

import { StoreActor } from '@/lib/storeMachine';
import commercejsAddToCart from '../../postAddToCart';

export const asyncAddToCart: StoreActor = async (context, event) => {
  if (event.type !== 'ASYNC_ADD_TO_CART') return;

  /**
   * If there is no cart in the context return
   **/
  if (!context.cartContext.cart) return;

  const cart = await commercejsAddToCart({
    cartId: context.cartContext.cart.id,
    productId: event.data.item.productId ?? '',
    quantity: event.data.item.quantity ?? 1,
  });

  return { data: null };
};

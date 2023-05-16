import { CartContext } from '@/components/providers/cart/CartProvider';
import { useContext } from 'react';
import { CartItemBody } from 'types.d/cart';

export function useAddItem(item: CartItemBody) {
  const cartService = useContext(CartContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  const { send } = cartService;

  return () => {
    send({
      type: 'SEND_TO_CART_QUEUE',
      data: { type: 'ADD_ITEM', data: { item } },
    });
  };
}

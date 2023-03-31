import { CartContext } from '@/components/providers/cart/CartProvider';
import { useContext } from 'react';
import { CartItemBody } from 'types.d/cart';

export function useUpdateItem(input: { itemId: string; item: CartItemBody }) {
  const cartService = useContext(CartContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  return cartService.send({ type: 'UPDATE_ITEM', input });
}

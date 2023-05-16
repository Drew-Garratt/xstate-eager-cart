import { CartContext } from '@/components/providers/cart/CartProvider';
import { useContext } from 'react';

export function useRemoveItem(input: { itemId: string }) {
  const cartService = useContext(CartContext);

  if (cartService === undefined) {
    throw new Error('useRemoveItem must be used within a CartProvider');
  }

  return cartService.send({ type: 'REMOVE_ITEM', input });
}

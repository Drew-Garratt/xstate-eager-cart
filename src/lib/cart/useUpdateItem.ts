import { StoreContext } from '@/components/providers/store/StoreProvider';
import { useContext } from 'react';
import { CartItemBody } from 'types.d/cart';

export function useUpdateItem(data: { itemId: string; item: CartItemBody }) {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useUpdateItem must be used within a CartProvider');
  }
  return cartService.send({
    type: 'SEND_TO_CART_QUEUE',
    data: { type: 'UPDATE_ITEM', data },
  });
}

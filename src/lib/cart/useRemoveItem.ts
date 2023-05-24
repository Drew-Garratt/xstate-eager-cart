import { StoreContext } from '_components/providers/store/StoreProvider';
import { useContext } from 'react';

export function useRemoveItem(data: { itemId: string }) {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useRemoveItem must be used within a CartProvider');
  }

  return cartService.send({
    type: 'SEND_TO_CART_QUEUE',
    data: { type: 'REMOVE_ITEM', data },
  });
}

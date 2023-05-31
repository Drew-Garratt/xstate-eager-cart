import { StoreContext } from '@/components/providers/commerce/CommerceProvider';
import { useContext } from 'react';

export function useRemoveItem(): (data: { itemId: string }) => void {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useRemoveItem must be used within a CartProvider');
  }

  return (data: { itemId: string }) => cartService.send({
    type: 'SEND_TO_CART_QUEUE',
    data: { type: 'REMOVE_ITEM', data },
  });
}

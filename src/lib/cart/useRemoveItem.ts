import { useContext } from 'react';
import { StoreContext } from '@/components/providers/commerce/CommerceProvider';

export function useRemoveItem(): (data: { itemId: string }) => void {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useRemoveItem must be used within a CartProvider');
  }

  return (data: { itemId: string }) =>
    cartService.send({ type: 'REMOVE_ITEM', data });
}

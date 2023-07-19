import { useContext } from 'react';
import { StoreContext } from '../providers/CommerceProvider';
import { type CartItemBody } from '../types/cart';

export function useUpdateItem(): (data: {
  itemId: string;
  item: CartItemBody;
}) => void {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useUpdateItem must be used within a CartProvider');
  }

  return (data: { itemId: string; item: CartItemBody }) =>
    cartService.send({ type: 'UPDATE_ITEM', data });
}

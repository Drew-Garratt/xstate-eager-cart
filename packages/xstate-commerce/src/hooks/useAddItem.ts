import { useContext } from 'react';
import { StoreContext } from '../providers/CommerceProvider';
import { type CartItemBody } from '../types/cart';

export function useAddItem() {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  const { send } = cartService;

  return (item: CartItemBody) => send({ type: 'ADD_ITEM', data: { item } });
}

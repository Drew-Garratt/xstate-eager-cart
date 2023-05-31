import { StoreContext } from '@/components/providers/commerce/CommerceProvider';
import { useContext } from 'react';
import { CartItemBody } from '@/lib/vercelCommerce/types/cart';

export function useAddItem() {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  const { send } = cartService;

  return (item: CartItemBody) => send({
    type: 'SEND_TO_CART_QUEUE',
    data: { type: 'ADD_ITEM', data: { item } },
  });
}

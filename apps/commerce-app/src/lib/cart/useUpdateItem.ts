import { useContext } from 'react';
import { StoreContext } from '@/components/providers/commerce/CommerceProvider';
import { type CartItemBody } from '@/lib/vercelCommerce/types/cart';

export function useUpdateItem(): (data: {
  itemId: string;
  item: CartItemBody;
}) => void {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useUpdateItem must be used within a CartProvider');
  }

  return (data: { itemId: string; item: CartItemBody }) =>
    cartService.send({
      type: 'SEND_TO_CART_QUEUE',
      data: { type: 'UPDATE_ITEM', data },
    });
}

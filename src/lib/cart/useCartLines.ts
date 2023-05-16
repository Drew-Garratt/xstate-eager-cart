import {
  CartContext,
  CartState,
} from '@/components/providers/cart/CartProvider';
import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import type { LineItem } from 'types.d/cart';

const selectLineItems = (state: CartState) =>
  state.context.cart?.lineItems ?? [];

export function useCartLines(): LineItem[] {
  const cartService = useContext(CartContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  return useSelector(cartService, selectLineItems);
}

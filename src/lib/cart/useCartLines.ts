import { StoreContext } from '@/components/providers/store/StoreProvider';
import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import type { LineItem } from 'types.d/cart';
import { StoreState } from '@/lib/storeMachine';

const selectLineItems = (state: StoreState) =>
  state.context.cartContext.cart?.lineItems ?? new Map();

export function useCartLines(): Map<string, LineItem> {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  return useSelector(cartService, selectLineItems);
}

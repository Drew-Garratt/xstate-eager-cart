import { StoreContext } from '@/components/providers/store/StoreProvider';
import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import type { LineItem } from '@/lib/vercelCommerce/types/cart';
import { StoreState } from '@/lib/vercelCommerce/machine';

const s = (state: StoreState) =>
  state.value === 'idle' ? state.context.cart : undefined;

export function useCartLines(): Map<string, LineItem> {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  return useSelector(cartService, selectLineItems);
}

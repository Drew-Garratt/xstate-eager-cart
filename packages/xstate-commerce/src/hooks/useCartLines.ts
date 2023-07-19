import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import { type StoreState } from '../machines/storeMachine';
import { StoreContext } from '../providers/CommerceProvider';

const selectLineItems = (state: StoreState) => state.context.cart?.lineItems;

export function useCartLinesIds() {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  const cartLines = useSelector(cartService, selectLineItems, (prev, next) => {
    const prevIds = prev ? Array.from(prev.keys()) : [];
    const nextIds = next ? Array.from(next.keys()) : [];

    return prevIds.join() === nextIds.join();
  });

  return cartLines ? Array.from(cartLines.keys()) : [];
}

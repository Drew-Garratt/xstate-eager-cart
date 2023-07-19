import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import { type StoreState } from '../machines/storeMachine';
import { StoreContext } from '../providers/CommerceProvider';

const selectLineItems = (state: StoreState) => state.context.cart?.lineItems;

export function useCartLine(lineId: string) {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  const cartLines = useSelector(cartService, selectLineItems, (prev, next) => {
    const prevLine = prev ? prev.get(lineId) : null;
    const nextLine = next ? next.get(lineId) : null;

    const prevCompare = `${prevLine?.id}${prevLine?.quantity}${prevLine?.variantId}`;
    const nextCompare = `${nextLine?.id}${nextLine?.quantity}${nextLine?.variantId}`;

    return prevCompare === nextCompare;
  });

  return cartLines?.get(lineId) ?? null;
}

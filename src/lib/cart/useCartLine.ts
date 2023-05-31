import { StoreContext } from '@/components/providers/commerce/CommerceProvider';
import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import type { LineItem } from '@/lib/vercelCommerce/types/cart';
import { StoreState } from '@/lib/vercelCommerce/machine';

const selectCartStatus = (state: StoreState) =>
  state.matches('Cart.Ready.Cart Async.Idle')

export function useCartLine(lineId: string) {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  const selectLineItems = (state: StoreState) =>
  state.context.cartContext.cart?.lineItems;

  const selectOptamisticLineItems = (state: StoreState) =>
  state.context.cartContext.optimisticCart?.lineItems;

  const cartStatus = useSelector(cartService, selectCartStatus);
  
  const cartLines = useSelector(cartService, cartStatus ? selectLineItems : selectOptamisticLineItems, (prev, next) => {
    const prevLine = prev ? prev.get(lineId) : null;
    const nextLine = next ? next.get(lineId) : null;

    const prevCompare = `${prevLine?.id}${prevLine?.quantity}${prevLine?.variantId}`
    const nextCompare = `${nextLine?.id}${nextLine?.quantity}${nextLine?.variantId}`
  
    return prevCompare === nextCompare;
  });

  return cartLines?.get(lineId) ?? null;
}

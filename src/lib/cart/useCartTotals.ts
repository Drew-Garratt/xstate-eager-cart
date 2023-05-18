import { StoreContext } from '@/components/providers/store/StoreProvider';
import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import { StoreState } from '@/lib/storeMachine';

const selectLineItemsSubtotalPrice = (state: StoreState) =>
  state.context.cartContext.cart?.lineItemsSubtotalPrice ?? 0;
const selectSubtotalPrice = (state: StoreState) =>
  state.context.cartContext.cart?.subtotalPrice ?? 0;
const selectTotalPrice = (state: StoreState) =>
  state.context.cartContext.cart?.totalPrice ?? 0;

export function useCartTotals(): {
  lineItemsSubtotalPrice: number;
  subtotalPrice: number;
  totalPrice: number;
} {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  return {
    lineItemsSubtotalPrice: useSelector(
      cartService,
      selectLineItemsSubtotalPrice
    ),
    subtotalPrice: useSelector(cartService, selectSubtotalPrice),
    totalPrice: useSelector(cartService, selectTotalPrice),
  };
}

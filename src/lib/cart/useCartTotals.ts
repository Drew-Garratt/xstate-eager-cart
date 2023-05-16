import {
  CartContext,
  CartState,
} from '@/components/providers/cart/CartProvider';
import { useSelector } from '@xstate/react';
import { useContext } from 'react';

const selectLineItemsSubtotalPrice = (state: CartState) =>
  state.context.cart?.lineItemsSubtotalPrice ?? 0;
const selectSubtotalPrice = (state: CartState) =>
  state.context.cart?.subtotalPrice ?? 0;
const selectTotalPrice = (state: CartState) =>
  state.context.cart?.totalPrice ?? 0;

export function useCartTotals(): {
  lineItemsSubtotalPrice: number;
  subtotalPrice: number;
  totalPrice: number;
} {
  const cartService = useContext(CartContext);

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

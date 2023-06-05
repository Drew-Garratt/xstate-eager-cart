import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import { StoreContext } from '@/components/providers/commerce/CommerceProvider';
import { type StoreState } from '@/lib/vercelCommerce/machine';

const selectCart = (state: StoreState) => state.context.cartContext.cart;

const selectOptamisticCart = (state: StoreState) =>
  state.context.cartContext.optimisticCart;

const selectCartStatus = (state: StoreState) =>
  state.matches('Cart.Ready.Cart Async.Idle');

export function useCartTotals(): {
  currencyCode: string;
  lineItemsSubtotalPrice: number;
  subtotalPrice: number;
  totalPrice: number;
} {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  const cartStatus = useSelector(cartService, selectCartStatus);

  const cart = useSelector(
    cartService,
    cartStatus ? selectCart : selectOptamisticCart,
    (prev, next) => {
      return prev?.totalPrice === next?.totalPrice;
    }
  );

  return {
    currencyCode: cart?.currency.code ?? 'USD',
    lineItemsSubtotalPrice: cart?.lineItemsSubtotalPrice ?? 0,
    subtotalPrice: cart?.subtotalPrice ?? 0,
    totalPrice: cart?.totalPrice ?? 0,
  };
}

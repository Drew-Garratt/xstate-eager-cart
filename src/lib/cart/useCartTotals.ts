import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import { StoreContext } from '@/components/providers/commerce/CommerceProvider';
import { type StoreState } from '../vercelCommerce/xstate/machines/storeMachine';

const selectCart = (state: StoreState) => state.context.cart;

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

  const cart = useSelector(cartService, selectCart, (prev, next) => {
    return prev?.totalPrice === next?.totalPrice;
  });

  return {
    currencyCode: cart?.currency.code ?? 'USD',
    lineItemsSubtotalPrice: cart?.lineItemsSubtotalPrice ?? 0,
    subtotalPrice: cart?.subtotalPrice ?? 0,
    totalPrice: cart?.totalPrice ?? 0,
  };
}

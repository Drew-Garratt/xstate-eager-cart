import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import { StoreContext } from '@/components/providers/commerce/CommerceProvider';
import { type StoreState } from '@/lib/vercelCommerce/machine';

const selectLineItems = (state: StoreState) =>
  state.context.cartContext.cart?.lineItems;

const selectOptamisticLineItems = (state: StoreState) =>
  state.context.cartContext.optimisticCart?.lineItems;

const selectCartStatus = (state: StoreState) =>
  state.matches('Cart.Ready.Cart Async.Idle');

export function useCartLinesIds() {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  const cartStatus = useSelector(cartService, selectCartStatus);

  const cartLines = useSelector(
    cartService,
    cartStatus ? selectLineItems : selectOptamisticLineItems,
    (prev, next) => {
      const prevIds = prev ? Array.from(prev.keys()) : [];
      const nextIds = next ? Array.from(next.keys()) : [];

      return prevIds.join() === nextIds.join();
    }
  );

  return cartLines ? Array.from(cartLines.keys()) : [];
}

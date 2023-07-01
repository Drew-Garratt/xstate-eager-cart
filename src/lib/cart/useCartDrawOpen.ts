import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import { StoreContext } from '@/components/providers/commerce/CommerceProvider';
import { type StoreState } from '../vercelCommerce/xstate/machines/storeMachine';

const selectCartDrawOpen = (state: StoreState) =>
  state.matches('Ready.Cart Draw.open');
const selectCartDrawClosed = (state: StoreState) =>
  state.matches('Ready.Cart Draw.closed');

export function useCartDrawOpen(): {
  isCartOpen: boolean;
  setCartIsOpen: () => void;
  setCartIsClosed: () => void;
} {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  let isCartOpen = false;

  if (useSelector(cartService, selectCartDrawOpen)) isCartOpen = true;

  if (useSelector(cartService, selectCartDrawClosed)) isCartOpen = false;

  return {
    isCartOpen,
    setCartIsOpen: () =>
      cartService.send({
        type: 'OPEN_CART_DRAW',
      }),
    setCartIsClosed: () =>
      cartService.send({
        type: 'CLOSE_CART_DRAW',
      }),
  };
}

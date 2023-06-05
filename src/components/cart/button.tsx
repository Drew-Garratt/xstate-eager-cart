'use client';

import { useCartDrawOpen } from '@/lib/cart/useCartDrawOpen';
import CartIcon from 'components/icons/cart';
import CartModal from './modal';

export default function CartButton() {
  const { isCartOpen, setCartIsOpen, setCartIsClosed } = useCartDrawOpen();

  return (
    <>
      <CartModal isOpen={isCartOpen} onClose={setCartIsClosed} />

      <button
        aria-label="Open cart"
        onClick={setCartIsOpen}
        className="relative right-0 top-0"
        data-testid="open-cart"
      >
        <CartIcon quantity={0} />
      </button>
    </>
  );
}

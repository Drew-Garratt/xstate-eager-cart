import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { useCartLinesIds } from '@/lib/cart/useCartLines';
import { useCartTotals } from '@/lib/cart/useCartTotals';
import CloseIcon from 'components/icons/close';
import ShoppingBagIcon from 'components/icons/shopping-bag';
import Price from 'components/price';
import CartLine from './cart-line';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const cartLineIds = useCartLinesIds();
  const cartTotals = useCartTotals();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <Dialog
          as={motion.div}
          initial="closed"
          animate="open"
          exit="closed"
          key="dialog"
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            variants={{
              open: { opacity: 1, backdropFilter: 'blur(0.5px)' },
              closed: { opacity: 0, backdropFilter: 'blur(0px)' },
            }}
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex justify-end" data-testid="cart">
            <Dialog.Panel
              as={motion.div}
              variants={{
                open: { translateX: 0 },
                closed: { translateX: '100%' },
              }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="flex w-full flex-col bg-white p-8 text-black dark:bg-black dark:text-white md:w-3/5 lg:w-2/5"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">My Cart</p>
                <button
                  aria-label="Close cart"
                  onClick={onClose}
                  className="text-black transition-colors hover:text-gray-500 dark:text-gray-100"
                  data-testid="close-cart"
                >
                  <CloseIcon className="h-7" />
                </button>
              </div>

              {cartLineIds.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingBagIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty.
                  </p>
                </div>
              ) : null}
              {cartLineIds.length !== 0 ? (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  <ul className="grow overflow-auto p-6">
                    {cartLineIds.map((id) => {
                      return <CartLine key={id} id={id} onClose={onClose} />;
                    })}
                  </ul>
                  <div className="border-t border-gray-200 pt-2 text-sm text-black dark:text-white">
                    <div className="mb-2 flex items-center justify-between">
                      <p>Subtotal</p>
                      <Price
                        className="text-right"
                        amount={cartTotals.lineItemsSubtotalPrice}
                        currencyCode={cartTotals.currencyCode}
                      />
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                      <p>Taxes</p>
                      <Price
                        className="text-right"
                        amount={0}
                        currencyCode={cartTotals.currencyCode}
                      />
                    </div>
                    <div className="mb-2 flex items-center justify-between font-bold">
                      <p>Total</p>
                      <Price
                        className="text-right"
                        amount={cartTotals.totalPrice}
                        currencyCode={cartTotals.currencyCode}
                      />
                    </div>
                  </div>
                  <a
                    href={''}
                    className="flex w-full items-center justify-center bg-black p-3 text-sm font-medium uppercase text-white opacity-90 hover:opacity-100 dark:bg-white dark:text-black"
                  >
                    <span>Proceed to Checkout</span>
                  </a>
                </div>
              ) : null}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

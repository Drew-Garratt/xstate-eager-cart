'use client';

import { useCartLines } from '@/lib/cart/useCartLines';
import { useCartTotals } from '@/lib/cart/useCartTotals';

const CartSummaryItems = () => {
  const items = useCartLines();
  const { lineItemsSubtotalPrice } = useCartTotals();

  return (
    <div className="flex justify-between mt-10 mb-5">
      <span className="font-semibold text-sm uppercase">
        Items {items.length}
      </span>
      <span className="font-semibold text-sm">{lineItemsSubtotalPrice}</span>
    </div>
  );
};

export default CartSummaryItems;

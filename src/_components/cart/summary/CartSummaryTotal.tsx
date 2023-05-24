'use client';

import { useCartTotals } from '@/lib/cart/useCartTotals';

const CartSummaryTotal = () => {
  const { totalPrice } = useCartTotals();

  return (
    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
      <span>Total cost</span>
      <span>${totalPrice}</span>
    </div>
  );
};

export default CartSummaryTotal;

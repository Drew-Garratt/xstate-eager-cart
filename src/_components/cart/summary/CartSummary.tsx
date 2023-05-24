import CartSummaryItems from './CartSummaryItems';
import CartSummaryTotal from './CartSummaryTotal';

const CartSummary = () => {
  return (
    <div id="summary" className="w-1/4 px-8 py-10">
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
      <CartSummaryItems />
      <div className="border-t mt-8">
        <CartSummaryTotal />
        <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;

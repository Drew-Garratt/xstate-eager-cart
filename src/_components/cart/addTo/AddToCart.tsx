'use client';

import { useAddItem } from '@/lib/cart/useAddItem';
import { CartItemBody } from '@/lib/vercelCommerce/types/cart';

const AddToCart = ({ item }: { item: CartItemBody }) => {
  const sendAddToCart = useAddItem(item);

  return (
    <button type="button" onClick={sendAddToCart}>
      Add to cart
    </button>
  );
};

export default AddToCart;

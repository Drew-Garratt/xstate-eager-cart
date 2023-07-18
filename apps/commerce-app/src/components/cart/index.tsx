// import { createCart, getCart } from 'lib/saleor';
import { cookies } from 'next/headers';
import { use } from 'react';
import CartButton from './button';

export default async function Cart() {
  return <CartButton />;
}

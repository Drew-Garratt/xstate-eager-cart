// import { createCart, getCart } from 'lib/saleor';
import { cookies } from 'next/headers';
import CartButton from './button';
import { use } from 'react';

export default async function Cart() {
  return <CartButton/>;
}

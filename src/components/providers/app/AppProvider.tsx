'use client';
'use client';

import { ReactNode } from 'react';
import { CartProvider } from '../cart/CartProvider';

const AppProvider = ({ children }: { children: ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default AppProvider;

'use client';

import { ReactNode, useRef } from 'react';
import { CartProvider } from '../cart/CartProvider';
import { inspect } from '@xstate/inspect';

const AppProvider = ({ children }: { children: ReactNode }) => {
  if (process.env.NODE_ENV === 'development') {
    const inspectCalled = useRef(false);

    if (inspectCalled.current === false) {
      inspect({ iframe: false });
      inspectCalled.current = true;
    }
  }

  return (
    <>
      <CartProvider>{children}</CartProvider>
    </>
  );
};

export default AppProvider;

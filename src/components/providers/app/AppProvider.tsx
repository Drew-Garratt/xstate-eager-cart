'use client';

import { ReactNode } from 'react';
import { StoreProvider } from '../store/StoreProvider';
// import { inspect } from '@xstate/inspect';

const AppProvider = ({ children }: { children: ReactNode }) => {
  // if (process.env.NODE_ENV === 'development') {
  //   const inspectCalled = useRef(false);

  //   if (inspectCalled.current === false) {
  //     inspect({ iframe: false });
  //     inspectCalled.current = true;
  //   }
  // }

  return (
    <StoreProvider>{children}</StoreProvider>
  );
};

export default AppProvider;

'use client';

import { ReactNode } from 'react';
import { CommerceProvider } from '../commerce/CommerceProvider';
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
    <CommerceProvider>{children}</CommerceProvider>
  );
};

export default AppProvider;

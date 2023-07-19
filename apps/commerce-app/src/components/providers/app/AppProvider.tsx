'use client';

import { CommerceProvider } from '@your-org/xstate-commerce';
import { services } from '@your-org/xstate-commerce/adapters/commercejs/optimisticCart';
import { cartMachine } from '@your-org/xstate-commerce/machines/optimisticCart';
import { type ReactNode } from 'react';
import XStateInspect from '@/components/xstate/inspect';

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CommerceProvider cartMachine={cartMachine({ services })}>
      {process.env.NODE_ENV === 'development' &&
        typeof window !== undefined && <XStateInspect />}
      {children}
    </CommerceProvider>
  );
};

export default AppProvider;

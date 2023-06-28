'use client';

import { type ReactNode } from 'react';
import XStateInspect from '@/components/xstate/inspect';
import { CommerceProvider } from '../commerce/CommerceProvider';

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CommerceProvider>
      {process.env.NODE_ENV === 'development' && <XStateInspect />}
      {children}
    </CommerceProvider>
  );
};

export default AppProvider;

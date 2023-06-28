'use client';

import { inspect } from '@xstate/inspect';
import { useRef } from 'react';

const XStateInspect = () => {
  const firstRender = useRef(false);

  if (firstRender.current === false) {
    inspect({ iframe: false });
    firstRender.current = true;
  }

  return null;
};

export default XStateInspect;

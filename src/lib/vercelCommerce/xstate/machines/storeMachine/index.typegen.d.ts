// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.Store Machine.Initialise:invocation[0]': {
      type: 'done.invoke.Store Machine.Initialise:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.cart': {
      type: 'done.invoke.cart';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.cart': { type: 'error.platform.cart'; data: unknown };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    cartMachine: 'done.invoke.cart';
    initialiseCart: 'done.invoke.Store Machine.Initialise:invocation[0]';
  };
  missingImplementations: {
    actions: 'sendAddToCart' | 'sendUpdateCart' | 'sendcRemoveFromCart';
    delays: never;
    guards: never;
    services: 'cartMachine' | 'initialiseCart';
  };
  eventsCausingActions: {
    sendAddToCart: 'ADD_TO_CART';
    sendUpdateCart: 'UPDATE_CART';
    sendcRemoveFromCart: 'REMOVE_FROM_CART';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    cartMachine:
      | 'ADD_TO_CART'
      | 'REMOVE_FROM_CART'
      | 'UPDATE_CART'
      | 'done.invoke.Store Machine.Initialise:invocation[0]';
    initialiseCart: 'xstate.init';
  };
  matchesStates: 'Initialise' | 'Ready' | 'Ready.Cart' | { Ready?: 'Cart' };
  tags: never;
}

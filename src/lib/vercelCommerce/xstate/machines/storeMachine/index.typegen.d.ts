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
    initialiseStore: 'done.invoke.Store Machine.Initialise:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: 'cartMachine' | 'initialiseStore';
  };
  eventsCausingActions: {
    assaignCart: 'CART_SUCCESS' | 'UPDATE_CART';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    cartMachine:
      | 'ADD_ITEM'
      | 'REMOVE_ITEM'
      | 'UPDATE_CART'
      | 'UPDATE_ITEM'
      | 'done.invoke.Store Machine.Initialise:invocation[0]';
    initialiseStore: 'xstate.init';
  };
  matchesStates:
    | 'Initialise'
    | 'Ready'
    | 'Ready.Cart'
    | 'Ready.Cart Draw'
    | 'Ready.Cart Draw.closed'
    | 'Ready.Cart Draw.open'
    | 'Ready.Cart.Cart Machine'
    | 'Ready.Cart.Cart Process'
    | 'Ready.Cart.Cart Process.Blocked'
    | 'Ready.Cart.Cart Process.Idle'
    | 'Ready.Cart.Cart Process.Idle.Error'
    | 'Ready.Cart.Cart Process.Idle.No Error'
    | 'Ready.Cart.Cart Process.Idle.Success'
    | 'Ready.Cart.Cart Process.Working'
    | {
        Ready?:
          | 'Cart'
          | 'Cart Draw'
          | {
              Cart?:
                | 'Cart Machine'
                | 'Cart Process'
                | {
                    'Cart Process'?:
                      | 'Blocked'
                      | 'Idle'
                      | 'Working'
                      | { Idle?: 'Error' | 'No Error' | 'Success' };
                  };
              'Cart Draw'?: 'closed' | 'open';
            };
      };
  tags: never;
}

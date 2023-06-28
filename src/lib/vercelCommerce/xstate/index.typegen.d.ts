// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'done.invoke.Store Machine.Initialise:invocation[0]': {
      type: 'done.invoke.Store Machine.Initialise:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Add to Cart:invocation[0]': {
      type: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Add to Cart:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Create Cart:invocation[0]': {
      type: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Create Cart:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Remove from Cart:invocation[0]': {
      type: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Remove from Cart:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Update Cart:invocation[0]': {
      type: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Update Cart:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.cart': {
      type: 'done.invoke.cart';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.Store Machine.Ready.Cart.Cart Async.Execute async action.Add to Cart:invocation[0]': {
      type: 'error.platform.Store Machine.Ready.Cart.Cart Async.Execute async action.Add to Cart:invocation[0]';
      data: unknown;
    };
    'error.platform.Store Machine.Ready.Cart.Cart Async.Execute async action.Create Cart:invocation[0]': {
      type: 'error.platform.Store Machine.Ready.Cart.Cart Async.Execute async action.Create Cart:invocation[0]';
      data: unknown;
    };
    'error.platform.Store Machine.Ready.Cart.Cart Async.Execute async action.Remove from Cart:invocation[0]': {
      type: 'error.platform.Store Machine.Ready.Cart.Cart Async.Execute async action.Remove from Cart:invocation[0]';
      data: unknown;
    };
    'error.platform.Store Machine.Ready.Cart.Cart Async.Execute async action.Update Cart:invocation[0]': {
      type: 'error.platform.Store Machine.Ready.Cart.Cart Async.Execute async action.Update Cart:invocation[0]';
      data: unknown;
    };
    'error.platform.cart': { type: 'error.platform.cart'; data: unknown };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    asyncAddToCart: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Add to Cart:invocation[0]';
    asyncCreateCart: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Create Cart:invocation[0]';
    asyncRemoveFromCart: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Remove from Cart:invocation[0]';
    asyncUpdateCart: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Update Cart:invocation[0]';
    cartMachine: 'done.invoke.cart';
    checkAsyncQueue: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Check Queue:invocation[0]';
    checkOptimisticQueue: 'done.invoke.Store Machine.Ready.Cart.Cart Optimistic.Execute Optimistic Action.Check Action:invocation[0]';
    initialiseCart: 'done.invoke.Store Machine.Initialise:invocation[0]';
    openCart: 'done.invoke.Store Machine.Ready.Cart.Cart Optimistic.Execute Optimistic Action.Open Cart:invocation[0]';
  };
  missingImplementations: {
    actions:
      | 'addActionToAsyncQueue'
      | 'addActionToOptimisticQueue'
      | 'addSuccessMessage'
      | 'addToCartContext'
      | 'assignCart'
      | 'assignError'
      | 'assignOptimisticCart'
      | 'clearOptimisticQueue'
      | 'optimisticAddToCart'
      | 'optimisticRemoveFromCart'
      | 'optimisticUpdateCart'
      | 'removeFromCartContext'
      | 'removeOldestFromOptQueue'
      | 'removeOldestItemFromAsyncQueue'
      | 'updateCartContext';
    delays: never;
    guards:
      | 'cartExists'
      | 'ifThereAreErrors'
      | 'thereAreMoreAsyncActionsInQueue'
      | 'thereAreMoreOptimisticActionsInQueue';
    services:
      | 'asyncAddToCart'
      | 'asyncCreateCart'
      | 'asyncRemoveFromCart'
      | 'asyncUpdateCart'
      | 'cartMachine'
      | 'checkAsyncQueue'
      | 'checkOptimisticQueue'
      | 'initialiseCart'
      | 'openCart';
  };
  eventsCausingActions: {
    addActionToAsyncQueue: 'SEND_TO_CART_QUEUE';
    addActionToOptimisticQueue: 'SEND_TO_CART_QUEUE';
    addSuccessMessage:
      | 'ASYNC_QUEUE_IS_EMPTY'
      | 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Add to Cart:invocation[0]'
      | 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Remove from Cart:invocation[0]'
      | 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Update Cart:invocation[0]';
    addToCartContext: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Add to Cart:invocation[0]';
    assignCart: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Create Cart:invocation[0]';
    assignError:
      | 'error.platform.Store Machine.Ready.Cart.Cart Async.Execute async action.Add to Cart:invocation[0]'
      | 'error.platform.Store Machine.Ready.Cart.Cart Async.Execute async action.Create Cart:invocation[0]'
      | 'error.platform.Store Machine.Ready.Cart.Cart Async.Execute async action.Remove from Cart:invocation[0]'
      | 'error.platform.Store Machine.Ready.Cart.Cart Async.Execute async action.Update Cart:invocation[0]';
    assignOptimisticCart: '';
    clearOptimisticQueue: '';
    optimisticAddToCart: 'OPTIMISTIC_ADD_TO_CART';
    optimisticRemoveFromCart: 'OPTIMISTIC_REMOVE_FROM_CART';
    optimisticUpdateCart: 'OPTIMISTIC_UPDATE_CART';
    removeFromCartContext: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Remove from Cart:invocation[0]';
    removeOldestFromOptQueue:
      | ''
      | 'OPTIMISTIC_REMOVE_FROM_CART'
      | 'OPTIMISTIC_UPDATE_CART'
      | 'SKIP_ACTION';
    removeOldestItemFromAsyncQueue:
      | 'ASYNC_QUEUE_IS_EMPTY'
      | 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Add to Cart:invocation[0]'
      | 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Remove from Cart:invocation[0]'
      | 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Update Cart:invocation[0]';
    updateCartContext: 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Update Cart:invocation[0]';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    cartExists: '';
    ifThereAreErrors: 'done.state.Store Machine.Ready.Cart.Cart Async.Execute async action';
    thereAreMoreAsyncActionsInQueue: '';
    thereAreMoreOptimisticActionsInQueue: '';
  };
  eventsCausingServices: {
    asyncAddToCart: 'ASYNC_ADD_TO_CART';
    asyncCreateCart: '';
    asyncRemoveFromCart: 'ASYNC_REMOVE_FROM_CART';
    asyncUpdateCart: 'ASYNC_UPDATE_CART';
    cartMachine: 'done.invoke.Store Machine.Initialise:invocation[0]';
    checkAsyncQueue:
      | ''
      | 'done.invoke.Store Machine.Ready.Cart.Cart Async.Execute async action.Create Cart:invocation[0]';
    checkOptimisticQueue: '' | 'SEND_TO_CART_QUEUE';
    initialiseCart: 'xstate.init';
    openCart: 'OPTIMISTIC_ADD_TO_CART';
  };
  matchesStates:
    | 'Initialise'
    | 'Ready'
    | 'Ready.Cart'
    | 'Ready.Cart.Cart Async'
    | 'Ready.Cart.Cart Async.Awaiting retry'
    | 'Ready.Cart.Cart Async.Check Async Queue'
    | 'Ready.Cart.Cart Async.Execute async action'
    | 'Ready.Cart.Cart Async.Execute async action.Action done'
    | 'Ready.Cart.Cart Async.Execute async action.Action errored'
    | 'Ready.Cart.Cart Async.Execute async action.Add to Cart'
    | 'Ready.Cart.Cart Async.Execute async action.Check Queue'
    | 'Ready.Cart.Cart Async.Execute async action.Check for Cart'
    | 'Ready.Cart.Cart Async.Execute async action.Create Cart'
    | 'Ready.Cart.Cart Async.Execute async action.Remove from Cart'
    | 'Ready.Cart.Cart Async.Execute async action.Update Cart'
    | 'Ready.Cart.Cart Async.Idle'
    | 'Ready.Cart.Cart Draw'
    | 'Ready.Cart.Cart Draw.closed'
    | 'Ready.Cart.Cart Draw.open'
    | 'Ready.Cart.Cart Optimistic'
    | 'Ready.Cart.Cart Optimistic.Check Optimistic Queue'
    | 'Ready.Cart.Cart Optimistic.Execute Optimistic Action'
    | 'Ready.Cart.Cart Optimistic.Execute Optimistic Action.Action done'
    | 'Ready.Cart.Cart Optimistic.Execute Optimistic Action.Check Action'
    | 'Ready.Cart.Cart Optimistic.Execute Optimistic Action.Open Cart'
    | 'Ready.Cart.Cart Optimistic.Idle'
    | {
        Ready?:
          | 'Cart'
          | {
              Cart?:
                | 'Cart Async'
                | 'Cart Draw'
                | 'Cart Optimistic'
                | {
                    'Cart Async'?:
                      | 'Awaiting retry'
                      | 'Check Async Queue'
                      | 'Execute async action'
                      | 'Idle'
                      | {
                          'Execute async action'?:
                            | 'Action done'
                            | 'Action errored'
                            | 'Add to Cart'
                            | 'Check Queue'
                            | 'Check for Cart'
                            | 'Create Cart'
                            | 'Remove from Cart'
                            | 'Update Cart';
                        };
                    'Cart Draw'?: 'closed' | 'open';
                    'Cart Optimistic'?:
                      | 'Check Optimistic Queue'
                      | 'Execute Optimistic Action'
                      | 'Idle'
                      | {
                          'Execute Optimistic Action'?:
                            | 'Action done'
                            | 'Check Action'
                            | 'Open Cart';
                        };
                  };
            };
      };
  tags: never;
}

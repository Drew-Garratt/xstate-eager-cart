// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Add to Cart:invocation[0]': {
      type: 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Add to Cart:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Remove from Cart:invocation[0]': {
      type: 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Remove from Cart:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Update Cart:invocation[0]': {
      type: 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Update Cart:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.Store Machine.Cart.Ready.Cart Async.Execute async action.Add to Cart:invocation[0]': {
      type: 'error.platform.Store Machine.Cart.Ready.Cart Async.Execute async action.Add to Cart:invocation[0]';
      data: unknown;
    };
    'error.platform.Store Machine.Cart.Ready.Cart Async.Execute async action.Remove from Cart:invocation[0]': {
      type: 'error.platform.Store Machine.Cart.Ready.Cart Async.Execute async action.Remove from Cart:invocation[0]';
      data: unknown;
    };
    'error.platform.Store Machine.Cart.Ready.Cart Async.Execute async action.Update Cart:invocation[0]': {
      type: 'error.platform.Store Machine.Cart.Ready.Cart Async.Execute async action.Update Cart:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    asyncAddToCart: 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Add to Cart:invocation[0]';
    asyncRemoveFromCart: 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Remove from Cart:invocation[0]';
    asyncUpdateCart: 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Update Cart:invocation[0]';
    checkAsyncQueue: 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Check Queue:invocation[0]';
    checkOptimisticQueue: 'done.invoke.Store Machine.Cart.Ready.Cart Optimistic.Execute Optimistic Action.Check Action:invocation[0]';
    initialiseCart: 'done.invoke.Store Machine.Cart.Initialise:invocation[0]';
  };
  missingImplementations: {
    actions:
      | 'addActionToOptimisticQueue'
      | 'addSuccessMessage'
      | 'assignError'
      | 'removeOldestFromOptQueue'
      | 'removeOldestItemFromQueue';
    delays: never;
    guards:
      | 'ifThereAreErrors'
      | 'thereAreMoreAsyncActionsInQueue'
      | 'thereAreMoreOptimisticActionsInQueue';
    services:
      | 'asyncAddToCart'
      | 'asyncRemoveFromCart'
      | 'asyncUpdateCart'
      | 'checkAsyncQueue'
      | 'checkOptimisticQueue'
      | 'initialiseCart';
  };
  eventsCausingActions: {
    addActionToOptimisticQueue: 'SEND_TO_CART_QUEUE';
    addSuccessMessage:
      | 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Add to Cart:invocation[0]'
      | 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Remove from Cart:invocation[0]'
      | 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Update Cart:invocation[0]';
    assignError:
      | 'error.platform.Store Machine.Cart.Ready.Cart Async.Execute async action.Add to Cart:invocation[0]'
      | 'error.platform.Store Machine.Cart.Ready.Cart Async.Execute async action.Remove from Cart:invocation[0]'
      | 'error.platform.Store Machine.Cart.Ready.Cart Async.Execute async action.Update Cart:invocation[0]';
    removeOldestFromOptQueue:
      | 'OPTIMISTIC_REMOVE_FROM_CART'
      | 'OPTIMISTIC_UPDATE_CART'
      | 'SKIP_ACTION';
    removeOldestItemFromQueue:
      | 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Add to Cart:invocation[0]'
      | 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Remove from Cart:invocation[0]'
      | 'done.invoke.Store Machine.Cart.Ready.Cart Async.Execute async action.Update Cart:invocation[0]';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    ifThereAreErrors: 'done.state.Store Machine.Cart.Ready.Cart Async.Execute async action';
    thereAreMoreAsyncActionsInQueue: '';
    thereAreMoreOptimisticActionsInQueue: '';
  };
  eventsCausingServices: {
    asyncAddToCart: 'ASYNC_ADD_TO_CART';
    asyncRemoveFromCart: 'ASYNC_REMOVE_FROM_CART';
    asyncUpdateCart: 'ASYNC_UPDATE_CART';
    checkAsyncQueue: '' | 'RETRY' | 'SEND_TO_CART_QUEUE';
    checkOptimisticQueue: '' | 'SEND_TO_CART_QUEUE';
    initialiseCart: 'xstate.init';
  };
  matchesStates:
    | 'Cart'
    | 'Cart.Initialise'
    | 'Cart.Ready'
    | 'Cart.Ready.Cart Async'
    | 'Cart.Ready.Cart Async.Awaiting retry'
    | 'Cart.Ready.Cart Async.Check Async Queue'
    | 'Cart.Ready.Cart Async.Execute async action'
    | 'Cart.Ready.Cart Async.Execute async action.Action done'
    | 'Cart.Ready.Cart Async.Execute async action.Action errored'
    | 'Cart.Ready.Cart Async.Execute async action.Add to Cart'
    | 'Cart.Ready.Cart Async.Execute async action.Check Queue'
    | 'Cart.Ready.Cart Async.Execute async action.Remove from Cart'
    | 'Cart.Ready.Cart Async.Execute async action.Update Cart'
    | 'Cart.Ready.Cart Async.Idle'
    | 'Cart.Ready.Cart Optimistic'
    | 'Cart.Ready.Cart Optimistic.Check Optimistic Queue'
    | 'Cart.Ready.Cart Optimistic.Execute Optimistic Action'
    | 'Cart.Ready.Cart Optimistic.Execute Optimistic Action.Action done'
    | 'Cart.Ready.Cart Optimistic.Execute Optimistic Action.Check Action'
    | 'Cart.Ready.Cart Optimistic.Idle'
    | {
        Cart?:
          | 'Initialise'
          | 'Ready'
          | {
              Ready?:
                | 'Cart Async'
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
                            | 'Remove from Cart'
                            | 'Update Cart';
                        };
                    'Cart Optimistic'?:
                      | 'Check Optimistic Queue'
                      | 'Execute Optimistic Action'
                      | 'Idle'
                      | {
                          'Execute Optimistic Action'?:
                            | 'Action done'
                            | 'Check Action';
                        };
                  };
            };
      };
  tags: never;
}

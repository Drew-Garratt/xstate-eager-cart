// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'done.invoke.Optimistic Cart.Async.Execute async action.Add to Cart:invocation[0]': {
      type: 'done.invoke.Optimistic Cart.Async.Execute async action.Add to Cart:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.Optimistic Cart.Async.Execute async action.Create Cart:invocation[0]': {
      type: 'done.invoke.Optimistic Cart.Async.Execute async action.Create Cart:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.Optimistic Cart.Async.Execute async action.Remove from Cart:invocation[0]': {
      type: 'done.invoke.Optimistic Cart.Async.Execute async action.Remove from Cart:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.Optimistic Cart.Async.Execute async action.Update Cart:invocation[0]': {
      type: 'done.invoke.Optimistic Cart.Async.Execute async action.Update Cart:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.Optimistic Cart.Async.Execute async action.Add to Cart:invocation[0]': {
      type: 'error.platform.Optimistic Cart.Async.Execute async action.Add to Cart:invocation[0]';
      data: unknown;
    };
    'error.platform.Optimistic Cart.Async.Execute async action.Create Cart:invocation[0]': {
      type: 'error.platform.Optimistic Cart.Async.Execute async action.Create Cart:invocation[0]';
      data: unknown;
    };
    'error.platform.Optimistic Cart.Async.Execute async action.Remove from Cart:invocation[0]': {
      type: 'error.platform.Optimistic Cart.Async.Execute async action.Remove from Cart:invocation[0]';
      data: unknown;
    };
    'error.platform.Optimistic Cart.Async.Execute async action.Update Cart:invocation[0]': {
      type: 'error.platform.Optimistic Cart.Async.Execute async action.Update Cart:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    asyncAddToCart: 'done.invoke.Optimistic Cart.Async.Execute async action.Add to Cart:invocation[0]';
    asyncCreateCart: 'done.invoke.Optimistic Cart.Async.Execute async action.Create Cart:invocation[0]';
    asyncRemoveFromCart: 'done.invoke.Optimistic Cart.Async.Execute async action.Remove from Cart:invocation[0]';
    asyncUpdateCart: 'done.invoke.Optimistic Cart.Async.Execute async action.Update Cart:invocation[0]';
    checkAsyncQueue: 'done.invoke.Optimistic Cart.Async.Execute async action.Check Queue:invocation[0]';
    checkOptimisticQueue: 'done.invoke.Optimistic Cart.Optimistic.Execute Optimistic Action.Check Action:invocation[0]';
    sortParentMessages: 'done.invoke.Optimistic Cart.Sort Messages from Parent.Sort Messages:invocation[0]';
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
      | 'checkAsyncQueue'
      | 'checkOptimisticQueue'
      | 'sortParentMessages';
  };
  eventsCausingActions: {
    addActionToAsyncQueue: 'SEND_TO_CART_QUEUE';
    addActionToOptimisticQueue: 'SEND_TO_CART_QUEUE';
    addSuccessMessage:
      | 'ASYNC_QUEUE_IS_EMPTY'
      | 'done.invoke.Optimistic Cart.Async.Execute async action.Add to Cart:invocation[0]'
      | 'done.invoke.Optimistic Cart.Async.Execute async action.Remove from Cart:invocation[0]'
      | 'done.invoke.Optimistic Cart.Async.Execute async action.Update Cart:invocation[0]';
    addToCartContext: 'done.invoke.Optimistic Cart.Async.Execute async action.Add to Cart:invocation[0]';
    assignCart: 'done.invoke.Optimistic Cart.Async.Execute async action.Create Cart:invocation[0]';
    assignError:
      | 'error.platform.Optimistic Cart.Async.Execute async action.Add to Cart:invocation[0]'
      | 'error.platform.Optimistic Cart.Async.Execute async action.Create Cart:invocation[0]'
      | 'error.platform.Optimistic Cart.Async.Execute async action.Remove from Cart:invocation[0]'
      | 'error.platform.Optimistic Cart.Async.Execute async action.Update Cart:invocation[0]';
    assignOptimisticCart: '';
    clearOptimisticQueue: '';
    optimisticAddToCart: 'OPTIMISTIC_ADD_TO_CART';
    optimisticRemoveFromCart: 'OPTIMISTIC_REMOVE_FROM_CART';
    optimisticUpdateCart: 'OPTIMISTIC_UPDATE_CART';
    removeFromCartContext: 'done.invoke.Optimistic Cart.Async.Execute async action.Remove from Cart:invocation[0]';
    removeOldestFromOptQueue:
      | 'OPTIMISTIC_ADD_TO_CART'
      | 'OPTIMISTIC_REMOVE_FROM_CART'
      | 'OPTIMISTIC_UPDATE_CART'
      | 'SKIP_ACTION';
    removeOldestItemFromAsyncQueue:
      | 'ASYNC_QUEUE_IS_EMPTY'
      | 'done.invoke.Optimistic Cart.Async.Execute async action.Add to Cart:invocation[0]'
      | 'done.invoke.Optimistic Cart.Async.Execute async action.Remove from Cart:invocation[0]'
      | 'done.invoke.Optimistic Cart.Async.Execute async action.Update Cart:invocation[0]';
    sendCartUpdateToParent: '';
    updateCartContext: 'done.invoke.Optimistic Cart.Async.Execute async action.Update Cart:invocation[0]';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    cartExists: '';
    ifThereAreErrors: 'done.state.Optimistic Cart.Async.Execute async action';
    thereAreMoreAsyncActionsInQueue: '';
    thereAreMoreOptimisticActionsInQueue: '';
  };
  eventsCausingServices: {
    asyncAddToCart: 'ASYNC_ADD_TO_CART';
    asyncCreateCart: '';
    asyncRemoveFromCart: 'ASYNC_REMOVE_FROM_CART';
    asyncUpdateCart: 'ASYNC_UPDATE_CART';
    checkAsyncQueue:
      | ''
      | 'done.invoke.Optimistic Cart.Async.Execute async action.Create Cart:invocation[0]';
    checkOptimisticQueue: '' | 'SEND_TO_CART_QUEUE';
    sortParentMessages:
      | 'ADD_ITEM'
      | 'REMOVE_ITEM'
      | 'SEND_TO_CART_QUEUE'
      | 'UPDATE_ITEM'
      | 'xstate.init';
  };
  matchesStates:
    | 'Async'
    | 'Async.Awaiting retry'
    | 'Async.Check Async Queue'
    | 'Async.Execute async action'
    | 'Async.Execute async action.Action done'
    | 'Async.Execute async action.Action errored'
    | 'Async.Execute async action.Add to Cart'
    | 'Async.Execute async action.Check Queue'
    | 'Async.Execute async action.Check for Cart'
    | 'Async.Execute async action.Create Cart'
    | 'Async.Execute async action.Remove from Cart'
    | 'Async.Execute async action.Update Cart'
    | 'Async.Idle'
    | 'Async.Send Cart Cart Working to Parent'
    | 'Async.Send Cart Update To Parent'
    | 'Optimistic'
    | 'Optimistic.Check Optimistic Queue'
    | 'Optimistic.Execute Optimistic Action'
    | 'Optimistic.Execute Optimistic Action.Action done'
    | 'Optimistic.Execute Optimistic Action.Check Action'
    | 'Optimistic.Idle'
    | 'Optimistic.Send Cart Update To Parent'
    | 'Sort Messages from Parent'
    | 'Sort Messages from Parent.Sort Messages'
    | {
        Async?:
          | 'Awaiting retry'
          | 'Check Async Queue'
          | 'Execute async action'
          | 'Idle'
          | 'Send Cart Cart Working to Parent'
          | 'Send Cart Update To Parent'
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
        Optimistic?:
          | 'Check Optimistic Queue'
          | 'Execute Optimistic Action'
          | 'Idle'
          | 'Send Cart Update To Parent'
          | { 'Execute Optimistic Action'?: 'Action done' | 'Check Action' };
        'Sort Messages from Parent'?: 'Sort Messages';
      };
  tags: never;
}

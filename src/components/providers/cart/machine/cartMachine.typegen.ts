// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'error.platform.cart.queue.executingItem.addToCart:invocation[0]': {
      type: 'error.platform.cart.queue.executingItem.addToCart:invocation[0]';
      data: unknown;
    };
    'error.platform.cart.queue.executingItem.removeFromCart:invocation[0]': {
      type: 'error.platform.cart.queue.executingItem.removeFromCart:invocation[0]';
      data: unknown;
    };
    'error.platform.cart.queue.executingItem.updateCart:invocation[0]': {
      type: 'error.platform.cart.queue.executingItem.updateCart:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    executeAddToCartFromQueue: 'done.invoke.cart.queue.executingItem.addToCart:invocation[0]';
    executeRemoveFromCartQueue: 'done.invoke.cart.queue.executingItem.removeFromCart:invocation[0]';
    executeUpdateCartFromQueue: 'done.invoke.cart.queue.executingItem.updateCart:invocation[0]';
  };
  missingImplementations: {
    actions:
      | 'addItemAndUpdateTotals'
      | 'assignCart'
      | 'pusAddItemToQueue'
      | 'pushRemoveItemToQueue'
      | 'pushUpdateItemToQueue'
      | 'removeItemAndUpdateTotals'
      | 'removeOldestItemFromQueue'
      | 'throwErrorMessage'
      | 'updateItemAndUpdateTotals';
    delays: never;
    guards:
      | 'itemIsAddToCart'
      | 'itemIsRemoveFromCart'
      | 'itemIsUpdateCart'
      | 'thereAreMoreItemsInTheQueue';
    services:
      | 'executeAddToCartFromQueue'
      | 'executeRemoveFromCartQueue'
      | 'executeUpdateCartFromQueue';
  };
  eventsCausingActions: {
    addItemAndUpdateTotals: 'ADD_ITEM';
    assignCart: '';
    pusAddItemToQueue: 'ADD_ITEM';
    pushRemoveItemToQueue: 'REMOVE_ITEM';
    pushUpdateItemToQueue: 'UPDATE_ITEM';
    removeItemAndUpdateTotals: 'REMOVE_ITEM';
    removeOldestItemFromQueue: 'done.state.cart.queue.executingItem';
    throwErrorMessage:
      | 'error.platform.cart.queue.executingItem.addToCart:invocation[0]'
      | 'error.platform.cart.queue.executingItem.removeFromCart:invocation[0]'
      | 'error.platform.cart.queue.executingItem.updateCart:invocation[0]';
    updateItemAndUpdateTotals: 'UPDATE_ITEM';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    itemIsAddToCart: '';
    itemIsRemoveFromCart: '';
    itemIsUpdateCart: '';
    thereAreMoreItemsInTheQueue: '';
  };
  eventsCausingServices: {
    executeAddToCartFromQueue: '';
    executeRemoveFromCartQueue: '';
    executeUpdateCartFromQueue: '';
  };
  matchesStates:
    | 'actions'
    | 'queue'
    | 'queue.awaitingRetry'
    | 'queue.checkingIfThereAreMoreItems'
    | 'queue.empty'
    | 'queue.executingItem'
    | 'queue.executingItem.addToCart'
    | 'queue.executingItem.removeFromCart'
    | 'queue.executingItem.success'
    | 'queue.executingItem.updateCart'
    | 'status'
    | 'status.error'
    | 'status.idle'
    | 'status.success'
    | {
        queue?:
          | 'awaitingRetry'
          | 'checkingIfThereAreMoreItems'
          | 'empty'
          | 'executingItem'
          | {
              executingItem?:
                | 'addToCart'
                | 'removeFromCart'
                | 'success'
                | 'updateCart';
            };
        status?: 'error' | 'idle' | 'success';
      };
  tags: never;
}

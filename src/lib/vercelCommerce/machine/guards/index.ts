import { type StoreMachineOptions } from '..';

const ifThereAreErrors: StoreMachineOptions['guards']['ifThereAreErrors'] = (
  context
) => {
  return !!context.cartContext?.error;
};

const thereAreMoreOptimisticActionsInQueue: StoreMachineOptions['guards']['thereAreMoreOptimisticActionsInQueue'] =
  (context) => {
    return context.cartContext.optimisticQueue.length > 0;
  };

const thereAreMoreAsyncActionsInQueue: StoreMachineOptions['guards']['thereAreMoreAsyncActionsInQueue'] =
  (context) => {
    return context.cartContext.asyncQueue.length > 0;
  };

const cartExists: StoreMachineOptions['guards']['cartExists'] = (context) => {
  return context.cartContext.cart !== null;
};

const guards: StoreMachineOptions['guards'] = {
  ifThereAreErrors,
  thereAreMoreOptimisticActionsInQueue,
  thereAreMoreAsyncActionsInQueue,
  cartExists,
};

export default guards;

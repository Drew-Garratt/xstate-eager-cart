import { StoreGuard } from '..';

const ifThereAreErrors: StoreGuard = (context) => {
  return !!context.cartContext?.error;
};

const thereAreMoreOptimisticActionsInQueue: StoreGuard = (context) => {
  return context.cartContext.optimisticQueue.length > 0;
};

const thereAreMoreAsyncActionsInQueue: StoreGuard = (context) => {
  return context.cartContext.asyncQueue.length > 0;
};

const cartExists: StoreGuard = (context) => {
  return context.cartContext.cart !== null;
};

export default {
  ifThereAreErrors,
  thereAreMoreOptimisticActionsInQueue,
  thereAreMoreAsyncActionsInQueue,
  cartExists,
};

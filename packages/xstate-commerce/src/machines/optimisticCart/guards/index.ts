import { type OptimisticCartMachineOptions } from '../optimisticCartMachine';

const ifThereAreErrors: OptimisticCartMachineOptions['guards']['ifThereAreErrors'] =
  (context) => {
    return !!context?.error;
  };

const thereAreMoreOptimisticActionsInQueue: OptimisticCartMachineOptions['guards']['thereAreMoreOptimisticActionsInQueue'] =
  (context) => {
    return context.optimisticQueue.length > 0;
  };

const thereAreMoreAsyncActionsInQueue: OptimisticCartMachineOptions['guards']['thereAreMoreAsyncActionsInQueue'] =
  (context) => {
    return context.asyncQueue.length > 0;
  };

const cartExists: OptimisticCartMachineOptions['guards']['cartExists'] = (
  context
) => {
  return context.cart !== null;
};

const guards: OptimisticCartMachineOptions['guards'] = {
  ifThereAreErrors,
  thereAreMoreOptimisticActionsInQueue,
  thereAreMoreAsyncActionsInQueue,
  cartExists,
};

export default guards;

import { StoreAction } from '..';
import { assign } from 'xstate';

const removeOldestItemFromQueue: StoreAction = () => {};
const addSuccessMessage: StoreAction = () => {};
const assignError: StoreAction = () => {};
const addActionToOptimisticQueue: StoreAction = assign((context, event) => {
  if (event.type !== 'SEND_TO_CART_QUEUE') return context;

  return {
    ...context,
    cartContext: {
      ...context.cartContext,
      optimisticQueue: [event.data, ...context.cartContext.optimisticQueue],
    },
  };
});
const removeOldestFromOptQueue: StoreAction = assign((context) => {
  return {
    ...context,
    cartContext: {
      ...context.cartContext,
      optimisticQueue: context.cartContext.optimisticQueue.slice(1),
    },
  };
});
const assignCart: StoreAction = () => {};

export default {
  removeOldestItemFromQueue,
  addSuccessMessage,
  assignError,
  addActionToOptimisticQueue,
  removeOldestFromOptQueue,
  assignCart,
};

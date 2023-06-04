import { StoreActor } from '@/lib/vercelCommerce/machine';

export const checkOptimisticQueue: StoreActor = (context) => (sendBack) => {
  if (context.cartContext.optimisticQueue.length < 1) return;

  /**
   * Get the last event in the async queue
   */
  const event =
    context.cartContext.optimisticQueue[
      context.cartContext.optimisticQueue.length - 1
    ];

  switch (event.type) {
    case 'ADD_ITEM':
      sendBack({
        type: 'OPTIMISTIC_ADD_TO_CART',
        data: event.data,
      });
      break;
    case 'UPDATE_ITEM':
      sendBack({
        type: 'OPTIMISTIC_UPDATE_CART',
        data: event.data,
      });
      break;
    case 'REMOVE_ITEM':
      sendBack({
        type: 'OPTIMISTIC_REMOVE_FROM_CART',
        data: event.data,
      });
      break;
    default:
      return;
  }
};

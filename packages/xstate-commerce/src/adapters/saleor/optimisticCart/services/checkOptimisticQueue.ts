import { type OptimisticCartMachineOptions } from '../../../../machines/optimisticCart';

export const checkOptimisticQueue: OptimisticCartMachineOptions['services']['checkOptimisticQueue'] =
  (context) => (sendBack) => {
    if (context.optimisticQueue.length < 1) return;

    /**
     * Get the last event in the async queue
     */
    const event = context.optimisticQueue[context.optimisticQueue.length - 1];

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

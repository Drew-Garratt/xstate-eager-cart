import { type OptimisticCartMachineOptions } from '..';
import { type CartEvents } from '../../storeMachine';

export const defaultServices: Pick<
  OptimisticCartMachineOptions['services'],
  'sortParentMessages' | 'checkAsyncQueue' | 'checkOptimisticQueue'
> = {
  sortParentMessages: () => (sendBack, onReceive) => {
    onReceive(
      (
        message:
          | CartEvents
          | {
              type: 'SEND_TO_CART_QUEUE';
              data: CartEvents;
            }
      ) => {
        if (message.type !== 'SEND_TO_CART_QUEUE') {
          sendBack({
            type: 'SEND_TO_CART_QUEUE',
            data: message,
          });
        }
      }
    );
  },
  checkAsyncQueue: (context) => (sendBack) => {
    /**
     * Cart Queue
     *
     * Refrence the cart queue from the context
     */
    const cartQueue = context.asyncQueue;

    /**
     * If the queue is empty return
     */
    if (!cartQueue[0]) {
      sendBack({ type: 'ASYNC_QUEUE_IS_EMPTY' });
      return;
    }

    /**
     * Get the first event in the queue
     */
    const event = cartQueue[0];

    /**
     * Send the event to the machine based on it's type
     */
    switch (event.type) {
      case 'ADD_ITEM':
        sendBack({ type: 'ASYNC_ADD_TO_CART', data: event.data });
        break;
      case 'UPDATE_ITEM':
        sendBack({ type: 'ASYNC_UPDATE_CART', data: event.data });
        break;
      case 'REMOVE_ITEM':
        sendBack({
          type: 'ASYNC_REMOVE_FROM_CART',
          data: event.data,
        });
        break;
      default:
        return;
    }
  },
  checkOptimisticQueue: (context) => (sendBack) => {
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
  },
};

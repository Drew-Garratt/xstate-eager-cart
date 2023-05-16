import { createContext, ReactNode } from 'react';
import { useInterpret } from '@xstate/react';
import { cartMachine } from './machine/cartMachine';
import { assign, ContextFrom, InterpreterFrom, StateFrom } from 'xstate';

/**
 * Generic types for the cart context
 *
 * Using Xstate's ContextFrom, StateFrom, and InterpreterFrom
 * we can get the types for the cart machine and use them
 * in or functions to provide type safety.
 */
export type CartService = InterpreterFrom<typeof cartMachine>;
export type CartMachineContext = ContextFrom<typeof cartMachine>;
export type CartState = StateFrom<typeof cartMachine>;

/**
 * Type for the cart context value
 *
 * This will be used in the creation of our context and provides
 * a undefined fallback that can be used to check if the context
 * has been provided in accompanying hooks and components
 */
type CartContextType = CartService | undefined;

/**
 * Create a context for the cart machine
 *
 * This will be used in the CartProvider component we provide an init
 */
export const CartContext = createContext<CartContextType>(undefined);

/**
 * Cart Provider
 *
 * This component will provide the cart machine to the rest of the application
 * @param input: { children: ReactNode }
 * @returns
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  /**
   * Create a cart machine using the useInterpret hook
   * The useInterpret hook will create a machine and start it
   * the machine will be returned as a service.xState services can be used to send events to the machine.
   *
   * React components can use the useService hook to subscribe to the service.
   *
   * useSelector can be used to subscribe to the specific values in state without triggering a re-render for every state change.
   */
  const cartService = useInterpret(
    cartMachine,
    {
      // Enable devTools in development
      devTools: true,
      /**
       * Services
       *
       * Services are actors that invoked by the machine when a transition to a given state occurs.
       * Actors can be used to make API calls, perform side effects, or anything else that is synchronous effect.
       * https://stately.ai/docs/xstate/actors/actions-vs-actors
       */
      services: {
        initialiseCart: async () => {
          return { data: null };
        },
        checkAsyncQueue: (_, event) => (sendBack) => {
          if (event.type !== 'SEND_TO_CART_QUEUE') return;
          switch (event.data.type) {
            case 'ADD_ITEM':
              sendBack({ type: 'ASYNC_ADD_TO_CART', data: event.data.data });
              break;
            case 'UPDATE_ITEM':
              sendBack({ type: 'ASYNC_UPDATE_CART', data: event.data.data });
              break;
            case 'REMOVE_ITEM':
              sendBack({
                type: 'ASYNC_REMOVE_FROM_CART',
                data: event.data.data,
              });
              break;
            default:
              return;
          }
        },
        asyncAddToCart: async () => {
          return { data: null };
        },
        asyncUpdateCart: async () => {
          return { data: null };
        },
        asyncRemoveFromCart: async () => {
          return { data: null };
        },
        checkOptimisticQueue: (context) => (sendBack) => {
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
                type: 'SKIP_ACTION',
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
      },
      /**
       * Actions
       *
       * Actions are functions that are executed when a transition occurs.
       * Here we load actions from the actions folder and assign them to machine.
       */
      actions: {
        removeOldestItemFromQueue: () => {},
        addSuccessMessage: () => {},
        assignError: () => {},
        addActionToOptimisticQueue: assign((context, event) => {
          return {
            ...context,
            cartContext: {
              ...context.cartContext,
              optimisticQueue: [
                event.data,
                ...context.cartContext.optimisticQueue,
              ],
            },
          };
        }),
        removeOldestFromOptQueue: assign((context) => {
          return {
            ...context,
            cartContext: {
              ...context.cartContext,
              optimisticQueue: context.cartContext.optimisticQueue.slice(1),
            },
          };
        }),
      },
      /**
       * Guards
       *
       * Guards are functions that are executed when a transition occurs.
       * They are used to determine if a transition should occur
       */
      guards: {
        ifThereAreErrors: (context) => {
          return false;
        },
        thereAreMoreOptimisticActionsInQueue: (context) => {
          return context.cartContext.optimisticQueue.length > 0;
        },
        thereAreMoreAsyncActionsInQueue: (context) => {
          return context.cartContext.asyncQueue.length > 0;
        },
      },
    },
    (state) => {
      // subscribes to state changes
      console.log(state);
    }
  );

  return (
    <CartContext.Provider value={cartService}>{children}</CartContext.Provider>
  );
};

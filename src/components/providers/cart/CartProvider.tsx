import { createContext, ReactNode } from 'react';
import { useInterpret } from '@xstate/react';
import { cartMachine } from './machine/cartMachine';
import { assign, ContextFrom, InterpreterFrom, StateFrom } from 'xstate';
import pusAddItemToQueue from './actions/pusAddItemToQueue';

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
  const cartService = useInterpret(cartMachine, {
    // Enable devTools in development
    devTools: process.env.NODE_ENV === 'development',
    /**
     * Services
     *
     * Services are actors that invoked by the machine when a transition to a given state occurs.
     * Actors can be used to make API calls, perform side effects, or anything else that is synchronous effect.
     * https://stately.ai/docs/xstate/actors/actions-vs-actors
     */
    services: {
      executeAddToCartFromQueue: async () => {
        return { data: null };
      },
      executeRemoveFromCartQueue: async () => {
        return { data: null };
      },
      executeUpdateCartFromQueue: async () => {
        return { data: null };
      },
    },
    /**
     * Actions
     *
     * Actions are functions that are executed when a transition occurs.
     * Here we load actions from the actions folder and assign them to machine.
     */
    actions: {
      pusAddItemToQueue,
      pushUpdateItemToQueue: assign({
        queue: (context, event) => [...context.queue, event],
      }),
      pushRemoveItemToQueue: assign({
        queue: (context, event) => [...context.queue, event],
      }),
      removeOldestItemFromQueue: assign({
        queue: (context) => [context.queue[0], ...context.queue],
      }),
      addItemAndUpdateTotals: () => {},
      updateItemAndUpdateTotals: () => {},
      removeItemAndUpdateTotals: () => {},
      assignCart: assign({
        cart: (context) => context.workingCart,
      }),
      throwErrorMessage: () => {},
    },
    /**
     * Guards
     *
     * Guards are functions that are executed when a transition occurs.
     * They are used to determine if a transition should occur
     */
    guards: {
      itemIsAddToCart: (context) => context.queue[0].type === 'ADD_ITEM',
      itemIsUpdateCart: (context) => context.queue[0].type === 'UPDATE_ITEM',
      itemIsRemoveFromCart: (context) =>
        context.queue[0].type === 'REMOVE_ITEM',
      thereAreMoreItemsInTheQueue: (context) => context.queue.length > 0,
    },
  });

  return (
    <CartContext.Provider value={cartService}>{children}</CartContext.Provider>
  );
};

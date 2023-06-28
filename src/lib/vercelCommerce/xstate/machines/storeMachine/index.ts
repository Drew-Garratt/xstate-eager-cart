/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  type ContextFrom,
  createMachine,
  type EventFrom,
  type InterpreterFrom,
  type StateFrom,
  MachineOptionsFrom,
} from 'xstate';
import { type Cart, type CartItemBody } from '../../../types/cart';

export interface AddItemCartInput {
  data: { item: CartItemBody };
}

export interface UpdateItemCartInput {
  data: { itemId: string; item: CartItemBody };
}

export interface RemoveItemCartInput {
  data: { itemId: string };
}

export type AddItemCartEvent = {
  type: 'ADD_ITEM';
} & AddItemCartInput;

export type UpdateItemCartEvent = {
  type: 'UPDATE_ITEM';
} & UpdateItemCartInput;

export type RemoveItemCartEvent = {
  type: 'REMOVE_ITEM';
} & RemoveItemCartInput;

export type CartEvents =
  | AddItemCartEvent
  | UpdateItemCartEvent
  | RemoveItemCartEvent;

/**
 * Generic types for the cart context
 *
 * Using Xstate's ContextFrom, StateFrom, and InterpreterFrom
 * we can get the types for the cart machine and use them
 * in or functions to provide type safety.
 */
type StoreMachineType = typeof storeMachine;
export type StoreService = InterpreterFrom<StoreMachineType>;
export type StoreMachineContext = ContextFrom<StoreMachineType>;
export type StoreState = StateFrom<StoreMachineType>;
export type StoreEvents = EventFrom<StoreMachineType>;

export type StoreMachineOptions = MachineOptionsFrom<StoreMachineType, true>;

export const storeMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAuB7ATmABAWQEMBjACwEsA7MAOgEkKzUyCAbM2MAYgnSusoBu6ANY00WXIVKUa9RszYcEg9EQJNeAbQAMAXR27EoAA7pY83kZAAPRAGZt1AJwA2AOxuALHadPPAVgBGT0DAgBoQAE9EACYXJ2p4uwAObWT-GLdk5JcXOwBffIjxbHxicj4AJTACCEjqAGECTFROAFUABQARAEEAFQBRAH0Gnsq+gytTcw0KK1sEZJjk6iXUu09czP87OwjohECY6jdQpzt4z3TU90DC4oxSqQqaatr6ppbOSoG8AHkAGrDABilT+eBGYwmeimZgscyQNkQ-icbmoQX86X8uXOgWS4SiiCOJzOFz8120uWS9xAJUk5Rk1DedUazVaPS6XSGfT+kPGk0R03h80QIUcLkCdhimQuLmSbn8nn2ROOp0C50uFNuNLpZWkVHa3X6w1G4xGfwAcoMABrQwyCuGzEUIbyOc5ZIKBNwuSkhZUIAC0MUVJ08bkpLkynhiF20BRpFHQEDgVl1zxksJmZEsiIWAa91Dj0ux2m0iuuTn9+cj1GWqW9u3DR0pOse9P1sgYTFY7DAmeFudFMX9+PRrYkepeTJqdX7TsHCGW-mom2yqSWcrc0qVhMDXhO2Uprj8MUC-jc46eDKqM4+bLn2YRoAWuzsK7lh438u3-riCXcdhZE4oSBNonjAfGhRAA */
  id: 'Store Machine',

  tsTypes: {} as import('./index.typegen.d.ts').Typegen0,

  schema: {
    events: {} as
      | {
          type: 'UPDATE_CART_CONTEXT';
        }
      | ({ type: 'ADD_TO_CART' } & AddItemCartInput)
      | ({ type: 'UPDATE_CART' } & UpdateItemCartInput)
      | ({ type: 'REMOVE_FROM_CART' } & RemoveItemCartInput),
    services: {} as {
      cartMachine: { data: unknown };
    },
  },

  context: {
    cartStatus: 'idle',
    cart: null,
    error: null,
  } as {
    cart: Cart | null;
    cartStatus: 'idle' | 'working' | 'error';
    error: unknown[] | null;
  },

  states: {
    Initialise: {
      invoke: {
        src: 'initialiseCart',
        onDone: [
          {
            target: 'Ready',
          },
        ],
      },
    },
    Ready: {
      states: {
        Cart: {
          invoke: {
            src: 'cartMachine',
            id: 'cart',
          },

          on: {
            UPDATE_CART: {
              target: 'Cart',
              actions: 'sendUpdateCart',
            },
            REMOVE_FROM_CART: {
              target: 'Cart',
              actions: 'sendcRemoveFromCart',
            },
            ADD_TO_CART: {
              target: 'Cart',
              actions: 'sendAddToCart',
            },
            UPDATE_CART_CONTEXT: {
              target: '#Store Machine',
              internal: true,
            },
          },
        },
      },
      type: 'parallel',
    },
  },

  initial: 'Initialise',
  predictableActionArguments: true,
  preserveActionOrder: true,
});

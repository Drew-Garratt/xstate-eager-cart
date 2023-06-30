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
  forwardTo,
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
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAuB7ATmABAWQEMBjACwEsA7MAOgEkKzUyCAbM2MAYgnSusoBu6ANY00WXIVKUa9RszYcEg9EQJNeAbQAMAXR27EoAA7pY83kZAAPRAFoAnA+raATAEYAHABYHrgGyBAOwO-gA0IACeiO4O2tRB3gCsAMyuQUkOmUE+QQC+eRHi2PjE5HwASmAEEJHUAMIEmKgNTail0lScFQCieADyAGo9APq0ACp9Blam5hoUVrYI-qnUDt5BHt4Brp7a2xHRCHb+QdTJ26kpbtoOId4FRRglUuU0VTV1jc2tzR1vnAAqgAFAAiAEFJmNJnhpkgQLMLAt4UtvJ5-NQUu4Lp4ktoUkEgqdDvZTuckpcUtdXLd7o8QMVJGUZNQPrVfi1vu1XjJOODQaDoVM9DMzEjFog0klqO5-J5XNssoE8e4kiTjmSLq4rjc7ut6Yz-iy2V82hyjV0QRCofVwRVxnCTGL5hKEO53Np4kF9nsgmlPJt3Oq7N4Uud3K4qSl5d5Tjl8oUGc8mZ13tV2VzzcDMKo4LA6BAWFxbfaRgAhAAy-XqAGkeqDHQjnWRLCjEBlPNQkv4PSqsn73EF1elXNR-Ck-BskrsHLEkgbkxa058OVmc0Q8wWi9RkABXIgb2CwTgl8YjeoVnp2kbIcaQwHIRuIl1thAEzu+bxuTxxJzY9WhmcWL4v4s4Bm4QSyguEhLqy6amj8XI4NmuZHluNA9JgOaYCedpnheV4VDed7jA+T7Nq2oBLO+5zrN+v6zt4w7yl2aI+N4sb+No7jRv40EvMylTwauSEoYe+ZliwqiiBAuGlj0FQVP0FTkXMLbIlRMS0jKbgqrpWLhFEiAeO4Y4cdokH7JBDieLZ-Epm8cErpmonrpuknSZAcn4f0ABy4y0L5gI9Kp4qvuszjeIOBKhHEGQbOqKSZJiWJ+qc6IWRO9mwSaIltMhbloQA6lgwiUFA3k3oC9T1D0yCPiK8LPuproeui1C7D2yRJIk7GeOqSTumOoTRhSEYOElCZPDBPJCc5Zquah+YlZgZUUBVp4jApSkqY1TpqZRNhaXcOnatx+mysOQ3+OZlkbLEtmeNls3Lhm+WgpgBAAO7UEQUkcLJ-TAj0vnnnhIyghU4JFaFL6aW+tljqcPYhKkfiBOqWSdp42JEpGqSygSz2Ca9CHtB933UOgxhgBQJ5VsgoybZD0Owy1r7Rt4CTXLZqN+hZ47qjjYZJedXEBp1DjE6mTlvYh+ViZutCFsW4NFcpNaBQA4mzh1LBkZynPsHE-qN8oAXiXZpYN2jTlStzS45uUuQrhUSVJRAyZVyDVbV9W6xpR1uto7Wde6co2bshIDddI2eCkN2hBxCcFImFDoBAcBWIaL2igdgdLHYsrxAGPhyoN45+P1RnHPb5yEpBsoeiHROJjnJN0AwTCsOwYB52F8NFxG1Cl7GuKE34ITqokXb4lFg42WkXWO8a8H93DQdeGGOTC-HmTJLiQ413YCqjnchKqrGs45KqK9zXLqDr+z8ORlzn70bcjHBqq0obBfE27BHIEO+pM8p-Fzk1CiBdEA+GlFiJI8pqS2X8OkYMZJz6QSSINa42x9ggNlmTNcS0n562Mixd+M5P7-hrtsFwVwqQ-hQbGdw+DnYLVdktdCJDoFvmuLRL8lC-xMRruNLs9CL641OCkVhwkXZ-EVmhZW249wHjzNw10oYvSyhuuOWIScMgx1MqBccuIoquAmj1GR815byLduhagmFsLqNfMnMcsQLKuBMgEBOwijgeDOLbKkg4caxACHgtui4XoELAe0BR+YlE0F8ugHAjisDOPhqGIxvFrjYhNnsNUNckrOCCWlHIXE-RSwiTNDubCbGxLsR5T2kB0lBxsr-JwHFxygVDCg4cmwxwTgVBkGcc4rEPyIeJagK01pQBaUsGyXMJw5DiPKW2AYClHGSPEHqCdpw427J41wYyyY4Apl9OZxksQJFsjxPe6wEE9WntqEeeJP5ElnIOB4VSBIy1qeTT6P0-pmGaZA-Orp0jOB3rcopB9Hk12QZiO5Y09jxz4t8hyq9rH-MptTWmFyEAILOHcGkPU-SRlCULdq0YinIpbmigoQA */
  id: 'Store Machine',

  tsTypes: {} as import('./index.typegen.d.ts').Typegen0,

  schema: {
    events: {} as
      | CartEvents
      | {
          type: 'UPDATE_CART';
          data: { cart: Cart | null };
        }
      | { type: 'CART_SUCCESS' }
      | { type: 'CART_ERROR'; data: unknown[] }
      | { type: 'CART_BLOCKED' }
      | { type: 'CART_CONTINUE' }
      | { type: 'CART_CLEAR_STATUS' }
      | { type: 'OPEN_CART_DRAW' }
      | { type: 'CLOSE_CART_DRAW' },
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
        src: 'initialiseStore',
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
          states: {
            'Cart Machine': {
              on: {
                REMOVE_ITEM: {
                  target: 'Cart Machine',
                  actions: forwardTo('cart'),
                  internal: true,
                },

                UPDATE_ITEM: {
                  target: 'Cart Machine',
                  actions: forwardTo('cart'),
                  internal: true,
                },

                ADD_ITEM: {
                  target: 'Cart Machine',
                  actions: [forwardTo('cart')],
                  internal: true,
                },

                UPDATE_CART: {
                  target: 'Cart Machine',
                  internal: true,
                },
              },

              invoke: {
                src: 'cartMachine',
                id: 'cart',
              },
            },
            'Cart Process': {
              states: {
                Idle: {
                  states: {
                    Success: {
                      on: {
                        CART_CLEAR_STATUS: 'No Error',
                      },
                    },

                    Error: {
                      on: {
                        CART_CLEAR_STATUS: 'No Error',
                      },
                    },

                    'No Error': {},
                  },

                  initial: 'No Error',

                  on: {
                    CART_BLOCKED: 'Blocked',
                    CART_WORKING: 'Working',
                  },
                },

                Blocked: {
                  on: {
                    CART_ERROR: 'Idle.Error',
                    CART_CONTINUE: 'Working',
                    CART_SUCCESS: 'Idle.Success',
                  },
                },

                Working: {
                  on: {
                    CART_SUCCESS: 'Idle.Success',
                    CART_ERROR: 'Idle.Error',
                  },
                },
              },

              initial: 'Idle',
            },
          },

          type: 'parallel',
        },

        'Cart Draw': {
          states: {
            closed: {
              on: {
                OPEN_CART_DRAW: 'open',
              },
            },
            open: {
              on: {
                CLOSE_CART_DRAW: 'closed',
              },
            },
          },

          initial: 'closed',
        },
      },
      type: 'parallel',
    },
  },

  initial: 'Initialise',
  predictableActionArguments: true,
  preserveActionOrder: true,
});

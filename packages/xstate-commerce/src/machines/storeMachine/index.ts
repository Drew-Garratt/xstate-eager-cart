/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  type ContextFrom,
  createMachine,
  type EventFrom,
  type InterpreterFrom,
  type StateFrom,
  type MachineOptionsFrom,
  forwardTo,
  assign,
} from 'xstate';
import { type Cart, type CartItemBody } from '../../types/cart';

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

export const storeMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUAuB7ATmABAWQEMBjACwEsA7MAOgEkKzUyCAbM2MAYgnSusoBu6ANY00WXIVKUa9RszYcEg9EQJNeAbQAMAXR27EoAA7pY83kZAAPRAFoAnA+raATAEYAHABYHrgGyBAOwO-gA0IACeiO4O2tRB3gCsAMyuQUkOmUE+QQC+eRHi2PjE5HwASmAEEJHUAMIEmKgNTail0lScFQCieADyAGo9APq0ACp9Blam5hoUVrYI-qnUDt5BHt4Brp7a2xHRCHb+QdTJ26kpbtoOId4FRRglUuU0VTV1jc2tzR1vnAAqgAFAAiAEFJmNJnhpkgQLMLAt4UtvJ5-NQUu4Lp4ktoUkEgqdDvZTuckpcUtdXLd7o8QMVJGUZNQPrVfi1vu1XjJOODQaDoVM9DMzEjFog0klqO5-J5XNssoE8e4kiTjmSLq4rjc7ut6Yz-iy2V82hyjV0QRCofVwRVxnCTGL5hKEO53Np4kF9nsgmlPJt3Oq7N4Uud3K4qSl5d5Tjl8oUGc8mZ13tV2VzzcDMKo4LA6BAWFxbfaRgAhAAy-XqAGkeqDHQjnWRLCjEBlPNQkv4PSqsn73EF1elXNR-Ck-BskrsHLEkgbkxa058OVmc0Q8wWi5wS+MRgB1foVGu0AByAHFG4iXW2EBkzqd9t40Q5o0l5erkvEkn6Vr3I9cDgLhIS6sumpo-FyODZrmsD5rQhZiAArkQG5wTudp7vUFY9HaIzIOMkKAsgV7Nq2oBLASna+N4bieHETjYp+BKYh6KT+LOAZuEEsrAS8zKVOBq5QTBaHwYh1A9JgOaYBhpbYbhFT4YR4zEaRcwtsiFGSjk5zrHRDGzt4w7yl2aI+M+gTaO40b+HxKZvGBK6ZiJ66bmWLCqKIEByXuPQVBUR7qeKt4encMpuCqkVYuEUSIB47hjs+2g8fsPEOJ4mX2aBJrCW00FuXB1AeV5kC+SM9T9Ke4xnoCPTBTe2kIOszjeIOBKhHEGQbOqKSZJiWK-jk-gpRO2U8oJzlmq5sH5iVRDeeVyCAvU9Q9MgJEivC16aa6HrotQuw9rK9HygGQ5xQgSTumOoTRuxvj+M+7HjQJy4ZtN+WiZu+5YMIlBQEtK1rRtDW7aF2gHUd2JJD+aLPp46rXYlHHjribWuK+P6vamTkfZBX2Ffmv2YP9FCA7uIz+YFFRg+RNgxLSEXatZ0WysON1PbRqUbLEmWeDjjm5VBoKYAQADu1BEJ5HA+f0wI9KeFWYSMoIVOC+501pDMINGnbjrGmRZPRmyI5dIRhj4HjxpsNIvYmhoTe9EHtKLEvUOgxhgBQO5VsgoyU2rGta660beAk6yeLKo30V46p3IlmXYiE3bXZGdkO4uTt4y7OBu5L0tmGV-KChMwqGNtZHa6iHhjqqNmbG1tyDrFRwegq5wTrKqQbHcmwFImFDoBAcBWI7b2ihp9NLHY0fUAGPhytd45+GbRx2FS8QbISriRt2KW74LLJyEwrDsGAk8hU1s8RvPOSxrisoTukDjqokXb4m1g4ZWkPYPJnIFs4mkvo1HWXgww5CjvdTIyRcQXXXgqUcfdG4ThyNqUMR9Jr41QCA8GTVIzhxogZW4RlgyqmlNvTYT0Jw-nRPOAB-FcbC0+n8J2uDp6IB8NKLE75Ix0XROkYMZJkHkJsvsGk-8niALejnPKfxvpwXYdXeKpkiEzhIUxS62wXBXC8LHZIBIExSMYULISLlCazS3BfSuU9lG62uHpWi6jGLGUuhGZwsMqQ0i5lkTBzs5HtAUeJIs1BkAoTEko10oYvSyieuOWIoQpxI05nddG7i+pGKTNIphZiWGBKJlYyS0ksCRNvM9OuXVd7ugCA9DmZxtC6JyO6PwI1JFZJMcaXJBN5EFIQiE086AcBSRkqUpqoYUa2WuNiBGew1SXT6s4Kk7VTjolGkBBhDlOlTW6fkyx81vKjJ1hlChThLLsXWOxVww5NhjmflOGcc4-GyPMT0yxJMyZQEOUsDK4dUH0UhjSd8GRPx4i7L+acUduy71cE85hfx85fPiliBISdoHrHfD+N+2gMQpG2ABdE2xbgZ2MZsrBud85SxlpARFCAX4oqgZ4BZsDMWXUyjixlmQKReEhvbElOUumuzFpLT23saVArWJsBphI0hYj8OqNlmIOVZDansRlGcChAA */
    id: 'Store Machine',

    tsTypes: {} as import('./index.typegen.d.ts').Typegen0,

    schema: {
      events: {} as
        | CartEvents
        | { type: 'UPDATE_CART'; data: { cart: Cart | null } }
        | { type: 'CART_SUCCESS'; data: { cart: Cart | null } }
        | { type: 'CART_WORKING' }
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
                    actions: 'assaignCart',
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
                      CART_SUCCESS: {
                        target: 'Idle.Success',
                        actions: 'assaignCart',
                      },
                    },
                  },

                  Working: {
                    on: {
                      CART_SUCCESS: {
                        target: 'Idle.Success',
                        actions: 'assaignCart',
                      },
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
                  ADD_ITEM: 'open',
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
  },
  {
    actions: {
      assaignCart: assign({
        cart: (context, event) => {
          return event.data.cart ?? context.cart;
        },
      }),
    },
  }
);

/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */

import { createMachine, type MachineOptionsFrom } from 'xstate';
import { Cart } from '../../../types/cart';
import {
  AddItemCartInput,
  CartEvents,
  RemoveItemCartInput,
  UpdateItemCartInput,
} from '../storeMachine';

type OptimisticCartMachineType = typeof optimisticCartMachine;

export type OptimisticCartMachineOptions = MachineOptionsFrom<
  OptimisticCartMachineType,
  true
>;

export const optimisticCartMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHkAOAXAlgW07LAxgAQDCAhgE7oB0AygPZVECycsZMsRAZhfdkQAKlMADsaDJq1jtOAYgCqggCIBBACoBRAPoBJLcwDaABgC6iUKnqxMWeqIsgAHogBMr49QCMXgGwAWAHZAr1d-LwBmLwAOVwAaEABPRAiATk9XX2jUgFZjQNjo2JyAXxKEtCxcfExicio6RnQWNg44Hj4BYQoxCSaWmTbYOQAlTWZkADUdfXGTcyQQKxs7B0WXBAjor2pjCP8c1y9g-1jIhOTN9OpM7LyC1yLXUvKQSpw8QlJKPqlWzg6-CEInEjT+g3kqmUyj0BnmjmWtkw9kcG0CEWowQigT2riiWS8-niSRS11uuXyhWKZQqGA+NTqPzBzWksnavCB3V6zIGbOGtE0ADkYepkNoSKoRuptABFBSaeXwxaI1aoxDRfbUXypKKBQ4BCK+UIXUkZLKpba5NLGIn+GlvOnVL71GiqWCJUQEaiaJxgAgAV3QYCIZHdnpDBFWcgg9jA1HwZCD1HeTtq3wabo9Xp9fsDwdDWYjqyVlmsSJR60Qx3y1FOrgtvmMMUJIRNCFinn8xht2WixkergK9pTnzTLuomc93t9AaDIbDxDIkeRomjsfj6ETcZHDPTroX09zc4L4aXxa8C1LKxXaoQx0y1CiPi8uUy-mxvjbpxymOxxhyBLons2LDo6o6MhmB45rO+YLkWK5yAKwraKK4qStKcoKpoJZLGWqqVpsOReD+eLuKk-hEhaOQ5NEbaNhiOQRHsVHuKELy0lU4F7hOUEznm86FmeK7UCQAAWfoANZEDK-pgLJciqLQACagokNoUIimKEpSjhKo3gRzwAbsHiRPWhJhP4n4kneERMbs3b-v4FqEtRoGcbu46TtmfHHnBQn2CJ4kEFJMlyWACnKap2hjBM0zaAAYiMyDMGhOlmAieH6aAGz7M8uxYtRhqPKkVmXJEdkOY5zkHOxDruc6TJeYeMECaey4BWJknSbJ8mKSpalKGoWipeoumZRW2VuKk003I22wFDE6K+Dkbamak1DTdN+yRMYjY5IEbn0g1kFZs1-Enou7WiIFXWhb1kVqZh8p6LQ2jjII6hKWN14Tc4bh+NEj7BHkETuNsGqrbZniVTkTnbDVh2phB+6ndB51+Vd1AjGA2D0AAbsGHICC6a6iHGmCiHj9ASduYEeY1vFHrBgmY9juME4CxM-AgFNUwQiYrvM33lmsk2bBROyPHserbIOgS+KVVb7T+qTPHiu1nNEsOI1xnmMy1F3wQFbP44TnR7nIYAUHwFDUKgAA2ibcIw2DJnTx0o1OaO+SzqxYzjpuc3uPOU-Q-PFmYwv4WLhozQUhrURqzxWqtlkYuENFHIEmSNpkOv0ydXs+czbV+6oEAQEQ6D0BbMZk9QvPU7T9VjgzqPF61l1lxXVc1y6Id8wL9hC+lyrjaLf0IM8ASPqDOK+ExgThORq3KxtzxeMYFpRLZviuPnHs8e3TOd0b13l5X1cW1bNt2476DOxQrs7ofTXeyXXfCRfvfB434eC5HUeV4Ra3kHEUR8qRyrywAjkciERU4L1rMRM42cFb9n3q8F+rdC7eRPobfy10FCoAgFuWu65G40zdi3ZGR8i54Ixn7IhJC5z9z-kPUQI9Ly4R+hPHK3Yfw+D3hqPwAQV7WWInqdehwmJZCOFrA+2DPa4INgw4STDSEkxvowO+TsXZUKOoo2hyj0a+zUcQjR3M2ER1MFHLKk9QaPExERaasNDSBB1CtcRackH7W7NEPUep9gKJoW-Du+DMadWCjwRgFtbG-Q2IOJyTjQhZF1NEBWis7zGD7EDYi-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-H7Am49L-jeDfjpDmpFIWmKkOZLZOkqz64FCTrG6nCSZRAbR0bEovhbBcn2EF4ZYMhOYUmamoF4k3AZxdg0T0mJmxB4qRA0SuJ-hHDfYkkOEjmEBqFy6Um14WgSxtlG7pKeJlS7SUYHDnG4gUTawNl-alK7lA405U5dQvkTx6q3jhA+FbR7QxAORnlVjEQYjhqZB7BEhumh6Pmy7PmYzvnlGxiUlpAYigELxEikEVonpeLyxajNLgXbCEgRBQVIybGO7CETm3iSLTrojY52q2aJmHq1iZyi4ahLxorEXgR0DBlIZqkfqOkUW+ZVY7Bdj3bBZ0VLzYm1oeC7RCphD3YYJlBAA */
  id: 'Optimistic Cart',

  tsTypes: {} as import('./index.typegen.d.ts').Typegen0,

  context: {
    cartStatus: 'idle',
    cart: null,
    optimisticCart: null,
    successMessage: [],
    error: null,
    asyncQueue: [],
    optimisticQueue: [],
  } as {
    cartStatus: 'idle' | 'working' | 'error';
    cart: Cart | null;
    optimisticCart: Cart | null;
    successMessage: string[];
    error: unknown[] | null;
    asyncQueue: Array<CartEvents>;
    optimisticQueue: Array<CartEvents>;
  },

  schema: {
    events: {} as
      | CartEvents
      | {
          type: 'SEND_TO_CART_QUEUE';
          data: CartEvents;
        }
      | ({ type: 'ASYNC_ADD_TO_CART' } & AddItemCartInput)
      | ({ type: 'ASYNC_UPDATE_CART' } & UpdateItemCartInput)
      | ({ type: 'ASYNC_REMOVE_FROM_CART' } & RemoveItemCartInput)
      | { type: 'ASYNC_QUEUE_IS_EMPTY' }
      | { type: 'RETRY' }
      | { type: 'SKIP_ACTION' }
      | ({ type: 'OPTIMISTIC_ADD_TO_CART' } & AddItemCartInput)
      | ({ type: 'OPTIMISTIC_UPDATE_CART' } & UpdateItemCartInput)
      | ({ type: 'OPTIMISTIC_REMOVE_FROM_CART' } & RemoveItemCartInput)
      | { type: 'OPEN_CART_DRAW' }
      | { type: 'CLOSE_CART_DRAW' },
    services: {} as {
      sortParentMessages: { data: unknown };
      asyncAddToCart: { data: { cart: Cart } };
      asyncCreateCart: { data: { cart: Cart } };
      asyncRemoveFromCart: { data: { cart: Cart } };
      asyncUpdateCart: { data: { cart: Cart } };
      checkAsyncQueue: { data: unknown };
      checkOptimisticQueue: { data: unknown };
    },
  },

  states: {
    'Sort Messages from Parent': {
      states: {
        'Sort Messages': {
          on: {
            UPDATE_ITEM: {
              target: 'Sort Messages',
              internal: true,
            },

            REMOVE_ITEM: {
              target: 'Sort Messages',
              internal: true,
            },

            ADD_ITEM: {
              target: 'Sort Messages',
              internal: true,
            },

            SEND_TO_CART_QUEUE: {
              target: 'Sort Messages',
              internal: true,
            },
          },

          invoke: {
            src: 'sortParentMessages',
          },
        },
      },

      initial: 'Sort Messages',
      description: `Messages incoming from the parent machine are recieved here.`,
    },

    Async: {
      initial: 'Check Async Queue',
      states: {
        'Execute async action': {
          initial: 'Check for Cart',
          states: {
            'Check Queue': {
              invoke: {
                src: 'checkAsyncQueue',
              },
              on: {
                ASYNC_ADD_TO_CART: {
                  target: 'Add to Cart',
                },

                ASYNC_REMOVE_FROM_CART: {
                  target: 'Remove from Cart',
                },

                ASYNC_UPDATE_CART: {
                  target: 'Update Cart',
                },

                ASYNC_QUEUE_IS_EMPTY: {
                  target: 'Action done',
                },
              },
            },

            'Remove from Cart': {
              invoke: {
                src: 'asyncRemoveFromCart',

                onError: [
                  {
                    target: 'Action errored',
                  },
                ],

                onDone: {
                  target: 'Action done',
                  actions: 'removeFromCartContext',
                },
              },
            },

            'Add to Cart': {
              invoke: {
                src: 'asyncAddToCart',

                onError: [
                  {
                    target: 'Action errored',
                  },
                ],

                onDone: {
                  target: 'Action done',
                  actions: ['addToCartContext'],
                },
              },
            },

            'Update Cart': {
              invoke: {
                src: 'asyncUpdateCart',

                onError: [
                  {
                    target: 'Action errored',
                  },
                ],

                onDone: {
                  target: 'Action done',
                  actions: 'updateCartContext',
                },
              },
            },

            'Action done': {
              entry: ['removeOldestItemFromAsyncQueue', 'addSuccessMessage'],
              type: 'final',
            },

            'Action errored': {
              entry: 'assignError',
              type: 'final',
            },

            'Check for Cart': {
              always: [
                {
                  target: 'Check Queue',
                  cond: 'cartExists',
                },
                'Create Cart',
              ],
            },

            'Create Cart': {
              invoke: {
                src: 'asyncCreateCart',
                onDone: {
                  target: 'Check Queue',
                  actions: 'assignCart',
                },
                onError: 'Action errored',
              },
            },
          },
          on: {
            SEND_TO_CART_QUEUE: {
              actions: 'addActionToAsyncQueue',
            },
          },
          onDone: [
            {
              target: 'Send Cart Error to Parent',
              cond: 'ifThereAreErrors',
            },
            {
              target: 'Check Async Queue',
            },
          ],
        },

        'Awaiting retry': {
          on: {
            RETRY: {
              target: 'Execute async action',
            },
            SEND_TO_CART_QUEUE: {
              target: 'Execute async action',
              actions: 'addActionToAsyncQueue',
            },
          },
        },

        Idle: {
          on: {
            SEND_TO_CART_QUEUE: {
              target: 'Execute async action',
              actions: 'addActionToAsyncQueue',
            },
          },
        },

        'Check Async Queue': {
          description: 'Check if there are any actions in the async queue',
          always: [
            {
              target: 'Send Cart Working to Parent',
              cond: 'thereAreMoreAsyncActionsInQueue',
            },
            {
              target: 'Send Cart Update To Parent',
              actions: ['assignOptimisticCart', 'clearOptimisticQueue'],
            },
          ],
          on: {
            SEND_TO_CART_QUEUE: {
              target: 'Check Async Queue',
              internal: false,
              actions: 'addActionToAsyncQueue',
            },
          },
        },

        'Send Cart Update To Parent': {
          always: {
            target: 'Send Cart Success to Parent',
            actions: 'sendCartUpdateToParent',
          },
        },

        'Send Cart Working to Parent': {
          always: {
            target: 'Execute async action',
            actions: 'sendCartWorkingToParent',
          },
        },

        'Send Cart Success to Parent': {
          always: {
            target: 'Idle',
            actions: 'sendCartSuccessToParent',
          },
        },

        'Send Cart Error to Parent': {
          always: {
            target: 'Awaiting retry',
            actions: 'sendCartErrorToParent',
          },
        },
      },
    },

    Optimistic: {
      initial: 'Check Optimistic Queue',

      states: {
        Idle: {
          on: {
            SEND_TO_CART_QUEUE: {
              target: 'Execute Optimistic Action',
              actions: 'addActionToOptimisticQueue',
            },
          },
        },

        'Execute Optimistic Action': {
          initial: 'Check Action',
          states: {
            'Check Action': {
              on: {
                OPTIMISTIC_UPDATE_CART: {
                  target: 'Action done',
                  actions: 'optimisticUpdateCart',
                },
                OPTIMISTIC_REMOVE_FROM_CART: {
                  target: 'Action done',
                  actions: 'optimisticRemoveFromCart',
                },
                SKIP_ACTION: 'Action done',
                OPTIMISTIC_ADD_TO_CART: {
                  target: 'Action done',
                  actions: 'optimisticAddToCart',
                },
              },

              invoke: {
                src: 'checkOptimisticQueue',
              },
            },

            'Action done': {
              type: 'final',
              entry: 'removeOldestFromOptQueue',
            },
          },
          on: {
            SEND_TO_CART_QUEUE: {
              actions: 'addActionToOptimisticQueue',
            },
          },
          onDone: 'Send Cart Update To Parent',
        },

        'Check Optimistic Queue': {
          description: 'Check if there are any items in the optimistic queue',
          always: [
            {
              target: 'Execute Optimistic Action',
              cond: 'thereAreMoreOptimisticActionsInQueue',
            },
            'Idle',
          ],
        },

        'Send Cart Update To Parent': {
          always: {
            target: 'Idle',
            actions: 'sendCartUpdateToParent',
          },
        },
      },
    },
  },
  type: 'parallel',
  predictableActionArguments: true,
  preserveActionOrder: true,
});

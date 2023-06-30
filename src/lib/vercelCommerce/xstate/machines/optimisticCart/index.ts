/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */

import { createMachine, type MachineOptionsFrom, sendParent } from 'xstate';
import { Cart } from '../../../types';
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

export const optimisticCartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHkAOAXAlgW07LAxgAQDCAhgE7oB0AygPZVECycsZMsRAZhfdkQAKlMADsaDJq1jtOAYgCqggCIBBACoBRAPoBJLcwDaABgC6iUKnqxMWeqIsgAHogBMr49QCMXgGwAWAHZAr1d-LwBmLwAOVwAaEABPRAiATk9XX2jUgFZjQNjo2JyAXxKEtCxcfExicio6RnQWNg44Hj4BYQoxCSaWmTbYOQAlTWZkADUdfXGTcyQQKxs7B0WXBAjor2pjCP8c1y9g-1jIhOTN9OpM7LyC1yLXUvKQSpw8QlJKPqlWzg6-CEInEjT+g3kqmUyj0BnmjmWtkw9kcG0CEWowQigT2riiWS8-niSRS11uuXyhWKZQqGA+NTqPzBzWksnavCB3V6zIGbOGtE0ADkYepkNoSKoRuptABFBSaeXwxaI1aoxDRfbUXypKKBQ4BCK+UIXUkZLKpba5NLGIn+GlvOnVL71GiqWCJUQEaiaJxgAgAV3QYCIZHdnpDBFWcgg9jA1HwZCD1HeTtq3wabo9Xp9fsDwdDWYjqyVlmsSJR60QfmM0S1NuyqVS6OMOVSxMukWMrhuNY8Ov8Op1rntKc+aZd1Eznu9voDQZDYeIZEjyNE0dj8fQibjo4Z6ddi5nufnBfDy+LXgWpZWq7VCD8rkC1H8EQiXaJxi8OSCXhN95rGK+NiWRRN+qShNEI6OmOjIZoeOZzvmi5FqucgCsK2iiuKkrSnKCqaCWSxlqqlabOEvjUBE34eEcvg5FRER-l4NoUYERx6kBOS+JkqRQVUMH7pO8GznmC6Fueq7UCQAAWfoANZEDK-pgMpciqLQACagokNoUIimKEpSoRKq3qRYQ5E+hIeP4xgBE24T+ExWLeOB4SPF+ra8a8u7OkyU7ZiJJ7IRJ9hSbJBAKUpKlgGpmnadoYwTNM2gAGIjMgzDYUZZgIsRpmgBsr6ZC5bZAcYFppIxJL3s5XiuRBHmNnx9K+XBWZHohYlniuoUyfJinKap6laTpShqFoWXqMZeUVgVbjpJ4WyPs8OTUa+VUdrV4GuOBqQBIEA6Qd50F7hO-kdaJp5Lj1ohhf1UVDXFOl4fKei0No4yCOoGnTTes3OG4tmpM+jbhOVQFZE56IuYSDWrU1x38adfnCceSHiTd1AjGA2D0AAbsGHICC666iHGmCiHj9ByTuJ2tQe7UIZdwWY9juME4CxM-AgFNUwQiarvMv3lmsc2bPs3Y2e4GrfrE6LRH+Hh1d4fg5EUOR+BEO0RM1qawQz05M0FGOrFjOP44TnT7nIYAUHwFDUKgAA2ibcIw2DJnT44o4zgXo91ptsxbnP7jzlP0PzxZmMLJFi4axieOkq2cVk5XtlW6QUb4+THLk2cHVkusCWdqOdVdKGhaoEAQEQ6D0NbMZk9QvPU7TSP00Jvto1112m1XNd16HLeR4L0c5cqM2iwDCBhHRz7fkaNlEuBviK5+wM+AEviBL4dGnHsRfI21ht+z3Fe3f3tf1yTtv247LvoG7FAez53vHwF3flyFF-V1fQ-hyPewQtx7XhFneck1ANZawOGkPshImKZzrCEQIed8j+CAofDu50jb+17pJBQqAIDbgbhuFuNNPbtzfgbD+ZcWamwIUQ+cLow58wFkAseV4iJ-SnhsHatkbhbDquVde4E17K03mraIGsgI7UwVQzuJ9P50PwYQ4hN87aMHvq7d2FCWryOwafL+mMGFqO5sPNhohgGcJMv9QqoRgbRHROkXU7hnEIP4fnFsjjyrZD1HI-WCiaHMxNpJPqEUeCMGtjHfK09Mh5GoI43U2d6KGlfExQ4GIuKPG4tEA4jZvz+MEgYpRITerhQUk-KJl5crcPAXRHIz5tR+AHK2DwOQmLhB2GkVaCcKT0QPojPRATim0NKbdEgPRTFUFJuTcO5DX7DNLsEgOoTJlMLMQAixVialgLMukWseIbTHC-DEIkHSd7UAtOiSqFkXxq0KSXLuoyVm9TWcGdRd9nbaOfrovWRSlnGxeeMt5-9WFR1MNE2xKRIjA1OBaLisRMhbCYtiTwlIjR4gyfCh5PtpyqAAO5kCRKIKARAejoAoIkUYmh1AjB+iArhuyxYxFWpiJ4uTEU7z1OkokPYd4vg1BqR8R1aSUMWe1AlRKsAkrJWAClVL0L6UmrKeUioGU2J4VWQ43YjixD2EUG0+SnJ+BuK2UIA42wWrtIMv5jzpy6AgE7GKirMIGRwiq-CkLNWbFst2KIhp3BhBfOEDaVYWKYnYlxKi3FtQ4vfndcJ-kBrRTQkKJVhlcKqoIuqyed46pcQSUBdBIR9jmsctVI0tZwhsRrOVZiu8vKiqGf89qYSFJJoejFL1eaii1lsjWgo2ocmpD-G2YG29ckJyOI8KRw4bXF1xV6NtRAO2DS7dUietSzJhG7E2XejwUFxLxH+bIGJ3Aa3AgdA6rZfBxuoXQMQNcXREBMfOdQ9cuTiDkN2syh6bhsWeAEIozE9qjpbJcjW0RF7rx8NapttqmQLOoA6p1qaMJYQzR6tV1jc2kWYtsBJQQuxjueI8UNCA2y1h3oI2I-giQwrvb8mCF15wLJXTdGZm5txMaPjQJDOCiBsdUDdH9zLtaXM-EBbEydyIoqov+gcIQJ3lRePBhdDR+OnyExxl1GH3UvWzThrdYs8gNLbIaDyYMBy2VHY8TEQFti0fo2kRjmnu7adNsu4TUZkBfV0MwXQtB1C6FGioDQOgM2ienuRSBGscTcQTqcw0KLmKYgtA5KDNoWKua9kE1juX2OefKYV1CvngsBaCyFhK4wpg6DShlSaUW0T8Mc+gwkXEbRqxS54FBuTCSZaXre+dvGeOEBY8GDzoTivedQrQAA0roQQukSDBeQIKJrYaDg3DouiR4QQbKQ2qpEV8mIDpNjYscBicGHRisEm5zqk2yn9Rm-YOQZX-OBeCzpPSrrGs5uM9PUIOx0vVo5ZWui3W0t9dONnQbOWxUJoUmxzt37-tMuntkTE9F4ZcXQTacjhRKJSNydndyEt4dDMR4JgrKPDAbtAbHaL28BHgSKC+fIFpfzVUJ1sNWeOyfhAp3rB9ogn0-Bfaot9H6QToFR0Z9HGxtqQMbFO-D1mFbc5tFqVsr50GGk4nOtTI3zq0Effuc3AB1RgckKaksHp+2XG37yNifC4qBmXWdMRhTcGywQx3Ea1mUV4oh6AQDgI4NjLodmM42AAWncDcTIO1t4gRZTvc522igq4Xv11TN3m0TkkCyf47IrYO+jzE3hDSsQ4i1vibYtpFaah3qe3pzxEuBEY0X3kQwQ4O55KyIYFeoUIFx94bOoQ+c6jVu06q+v7PZCNAEGIIRDf54Q+-Yf3rCQHRuDEDwWxoiGtyH+fplzjiz1ySENyjGRnLLwf9DV4Cuw7CtSBiGGuOzPCfBZKDLT9gJyrS34Aq4LnxU6dpb7gJZ7PhPBdjBA1ihCBBMTZzAzBB4juC7yEgJyd7DZYIgFnzfxmzsyWxAhR6boK4pBay1hFBZDSzfgHR0ZMTAZIKhDajazZAirr7qb3oCZGJ9y-yDxkEM6V5uAHDA6H57T8rojlodjMH5ysFjpbAWjAFPL35gGvrvI-CQFmTZDdgAath0YFxqzkYxAEbyE8TsHKG4H6L4F8GSQvaiBECNxgDaFixkZVpcQ6jUbmjpwzxhCoHoKZaGj0QHAqGKLPIP4Xw3REC3yMCQCuHTxKEUQcGlqIFXIyFVgGqUQWR+B0R5x1Rr6R6LrjYEGYzLqVJCGMox6iFdhsoPhQZH5HBc4djoJ+qwyfj-7ZycFFHxq8HKKvJgBTLoAJG8LZD+CYj9YeBsQHA1irxHb7ANLopH45HZA1hhFeiSrEqkrkqUojFViYHbZ5CCIAY+Cz4djUR8oGiCpawFDrHIaOouHkHVGbCRANJsHoKUZ9gZEUaPjPhkaNjMRfg0F3FebIQQFPEiH3jQHfhAngSloHBzGXD8oJJvheIX65KPh3Gm6i7m4aFEDvrAg9DiB7EzynCu4cS84+AthIHVRthPhEgYlAQhCAGFEFYTgLIknPCXK5Kg4w4xBAan5RAQa0awZqxGg6zWEBJIYoaPHCEj6bw6rhDfheLlRpLc7FSvFSIvioq0RC7MYCaPZTxP6kTQwg7HBg78lnFhpzwBBWqNgf56kMglGGlU4OEklgwJKNjxyQYJwthe70TeAzGZB7BEgpKOljYGkFYOGTjRHOEkmVS7CsESxSIGFNjnJZx6g2T7DbCEgSlG4dxIbLrI5rokl6gJI4jSGSK2jHoVrKwHByy6rYjFrhm1Ai5i5MB4kEnl4Qkj4BBmYywDhUTMS7YnoalUS9rpB+C5CNpcHG6HjYntnNDPpW4UA24yr24y4kkxCpDjH+oAEz7Ua+HMTybagMFQbagaxEhB4lBAA */
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
                target: 'Awaiting retry',
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
                target: 'Send Cart Cart Working to Parent',
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
              target: 'Idle',
              actions: 'sendCartUpdateToParent',
            },
          },

          'Send Cart Cart Working to Parent': {
            always: 'Execute async action',
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
            onDone: {
              target: 'Idle',
            },
          },

          'Check Optimistic Queue': {
            description: 'Check if there are any items in the optimistic queue',
            always: [
              {
                target: 'Execute Optimistic Action',
                cond: 'thereAreMoreOptimisticActionsInQueue',
              },
              'Send Cart Update To Parent',
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
  },
  {
    actions: {
      sendCartUpdateToParent: sendParent((context) => ({
        type: 'UPDATE_CART',
        data: { cart: context.cart },
      })),
    },
  }
);

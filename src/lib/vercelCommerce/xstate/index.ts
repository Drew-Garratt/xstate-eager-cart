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
import { type Cart, type CartItemBody } from '../types/cart';

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
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAuB7ATmABAWQEMBjACwEsA7MAOgEkKzUyCAbM2MAYgnSusoBu6ANY00WXIVKUa9RszYcEg9EQJNeAbQAMAXR27EoAA7pY83kZAAPRAFYATABoQAT0QBGABwA2H9TsAdgBOL0C7ABYvLwcvDwcAXwSXcWx8YnI+ACUwAghXagBhAkxUIpLUHABBWFcKImoAUWswIgBXVFwCWvqcYg0Kbl4aWFR1MQw0qUyaHLyC4tLy0uqehubWjq61vqIBgytTcwGrWwQ7bWDqYNCAZm1A2+8fQMCfF3cED2CI2+oI4IeOxxbTA7QOCKJZIgVKSDIyahzfLLMqLSo1OrrFrtTp9Hb9Mi8IZ8Ubjaiw9LSbK5ZFolGrTFNbFbPGY3b7DyGJAgI4WCinRC3HweajgjyvOy3IUOOxBD6ePzaAKA77aX73CFQlKTOFU2Y0hYVekY+pMza47psglE5CNAByABEAPoAFQA8k7ClUsi6nQBFACqjSDB25vJO3LODm0PiuHnuwReDnugTC8q+UX8DkTDh8XllXnBkKS2oklJmiINKONazNOO2Vr2hIoRRIrWEOD9bTA3c4VWQAE07YUnVUHc73Z7vS7QyYzHyBV8vBElbHbr8XvHo8F0w4PPGArHAjHQYWISWYTrywikYalmiGaaNvXWb1rS3Cm2iB2uz2uP2hxHLJGjwN0ADVGidAAxLI3TwKcfVnHl5wjUAzm8FdqDXDdAi3S5028J5-njCI7B8U8iy1S8y2mG8qzpB8TSxc0GzfJteFbdtO27XsAOHJ0AwABQdKoXUgr1EL0Q4UObRcMNXYJ1yFXDbm3AjgkCBx-kBYEPAozULwpWjqXmatGNrZ8WUtNiBk479uL-PtB34wNg0g2hkCdEDBJdAckPDWTI08ZcFKUzdVPwtxEAcBxj2oPSwjzAsi0Mq9jP1UyGIqR9mJfayiHZZtKwAW3QARcAAM0wdBipwNFiRoFRRHJNL4RM2kjXMxlLItfF2JbHJSvKnAqpquqKmUCghDUfY9H8mTLCChAIW0JVwUU+NxULRxAgImIIniiFbkU5KDOhIy2oyjr72ypi6ysvrbMGsrKuq2r6rATBqswahjBYdQKqwYqWpoy7K0yzrbos5lesbJ6wCG16xrRSbpvUZsDHm45ArQ6KVzW7MnieVNQVigjXn8HwjpOsEztLKYwdvMyoe6mHWIK99qCqCAIBwDBxtKBr+CmkQJlBvVweu1EWafNnXw5-quZ5vn0AF1BUdUdGtDmqSwwW-klpWgmNuJ7ayai5a9KzQsfF+U6IlS8WKyZrKVjunr2cKjjud5-mPq+rBfv+1BAcwYGLoll3Ibd6GWPlr2Wx9lW1Y1maMZ1rk52xxbceW-HRUJzaSZ23dT2oEnbdue3HYZyP6Oj9FY7yx6ioDYwIHGNWhaasXa+d+ubpj1m4-yhPqDbjvcRRlQ0+1-RdazhdDfz9aia20ndot74fDsahoxlbx7aoiP+4hwfG+H5u4db9vO-976g4BoGQb7uiz+lofZZHluOInu+JpnlrCgmMF7IWzgbXORsC4m3XiXLegJAjl3BHYQ+tNiznVanXd+NZL4PWvhxT8XFQ5dyxkvXOiZd5eHXIRVMVc9y3F3LmEUIQ9zaG8ICKubwa66lPlLHBX8r42SKoQ+yxD6qaE5NJcBi4KHUCoREGhVDHDxl3HpXeMp7jHWOvGIIPhuHXnaneD+F8BF4KEQQ7A-9BY8D4D3F+PC358K6qY2G5iPyWKngAkWs9gEZykWQmwnghQHWXBpCIrwohCkcKXYIu8VIaTzBw3R+j0qSyMfw3KZiFa2UKB43A99A5-SfmHexBirrpOcZk1x2ThF5JToA2a89M5gICehYJciASBHCV0qhO9nBbx3og24XStFHxSYzAexicpcwAO4EHkBQKAOBsCoEwK4TgwEXRZD8qAgKOdAnnEuNcO4Dwni+ApuTRwAQgihEeNoM86D6YOMMczT+DQqhzIWUslZazOC2kdK6D0ElfSuRDLs-Wi4LhXBuFQ05zwLlbxiLvKIQQ9x5g1I86ir8XmuxMQ0WgEAWBcH+ROIF05-RBjBc0vZECDm-CuMorpUR4VvFLvEYiG1IhSkouMrBTiZYNBER2JiDlewksBQhEFlLGikNQnS461xfDCmCPcqmspN6fBuJTfGqCHm3F5bwipAq7LCp2L+XssqcYHLzFpMivhvhxHOayre0ZEHZipklNBx9MGGteXik1OVRVcAkdSiFS0bWHntaEFl7wt73K8PFHV+YvUGscUalYbpjBMGKuwJg+LCXEvtKSyVFK3KWv2VGeNiapSShXL8LwO4LaqVIv8HeiYngxTUYEVNOKG44Ezdm3NZAqm4AHWQHNoxh3VH6kLUknRSmpKjufftWbx1DpHSuwdk6CpVH6uW2llbojVqruuNUtwG3pnXNmf4jwJRU1YUEHt5S-WbrXdu+6uIx0TrzdOgYfyi0SuBaWql-i5VtJeHvUiq0ulBHiOuS94I3X3KBDGTtoJu0YKdmml9X710ftHau79U7d05K-MKmdbofK0DwB5F0tARxCREmJSV+65I6Kwig2IIQunHiBJe6hoppThHvV2p9aScOEbwx7V9RGd2KyFb+5snBKN0Zo8gOjQEQLgUgjBOCLHwXSKWvuKuHH4hhDCbxuwl7fiIOFBEfGIn0NiaXVM3D77pNuZ-SR4RZHFM2gANK0EEqOQodG3R2lY0Z9jO8zPcfCWwqzTba3xWCDKGUjnH2Yexc+3FMmpNy088R+TvnvNEhU9R2j9HRzjkA9OSLudjO7xi1xizCXL0Or3r4WKZE0OZaeWU8TuXCsbuG35lsmawAUBIQZ1pCoW0qU0muWJpEGFNpilpJFUo4i9Yw-1xdkz6TDYDaN81waZtgc8B4Hee9yJ+GzDxtrFtcx2CuNGOIFwMu7axc8nLfajsKZOzxYNki9aGdzjEJUMQniKQBDFEIsbPjSgOrGNLPWH1fZPth3LDpMAEBmdQIgLAzCQGU4Je0JaHRZCqAAdXq-KrSsZHAoIiLbZcwzEufFthjn1WO+047x9QdAxhJucEKAAGTdLaCnVPafnatWcX4DPYkHxZ1EGzHP7CJgCM5yZ3cRbNTUKUOn6FK57xlGRVL4RgS20va8BNKPz2pklNEGISRoQUHQBAOAVhMdUFA-LxAABaBHQf-CrXD74Mi3wWeXDE3IJgrB2BgH9xWxAkJ0xxG11ln7aSU8HuClpGtKrYz7T3NEXcYRRTh8iLEnefhXg6-fnnxcyYlRF5jKETU3gvC24OhcVaPghTxDeB4B22eBsuYyc3w2R6xQSilGquUFsVVxmOlq2UGk1R2Eb-yt5+H47vmn7ncIVxyJvBQYWPSNwNdfAt3IkZuEN-HlIjv9N-rpOj05gp07R+DlAnCFhPmDvOEimGmE9p2v8MCG8Mmg8q-i+u7HLJ-orM9MNKNO9BUL-lGMPtQFErEPuLXk8HtPcsROuGRPpJir7r9suggd-PgonMrH7BgaDrNpbFclDnZo4A2jbk9pcEqBbseORGgnAbljQYIjUr-LfJ4qUJgdFKPgmpbqmPgWRIQfAgCNpECCCCmuPvttgpUvvkgbZKVlNjYsnswRdstC8FcJpKRLEldmqF0iHstA8PbkeCeEIdoRMrocah-j-InP1DgJ9N9JADIRYSEOXBCC9iguROEizntDEBxgfDAUWGPntp4bvu-ogb4QGmIkwYvOYYWLZg8DFpfpcLEowpKFhDKHbDFCzsXsIX2qIVkmPLkrkFIagCEcZiKFvrwefj8FKKXIWFXpoopEklwh4Xym-tMh8vMkwIsssmAKsp8HkQHggFXF0XuPPtKOqntCggEBCKmAorCnTN9hPgdnoQSkSiEVXGHhseEAvubhqtFNoCZrElQq8IpBit6lhr2tQbWApiKj-mYSsQvgXOKHcVsUvp8FfgmmXqPlXFoakRMRJlunmiEV0lcFDt8OuKlrFImLuFHgEAohcLmOEjFFKPUcukdhcaYcsanstFKLZg6vmOenmPuNZvcNcLesJjthSa5pJu5gVvyV5v1GiRpHIsmFibDriY4U8HpOXL4CzgISAfquMb6kNkKcOvvqNkYQGkYSEcuJQhKTDjifDpemSZyZKOevEA+l4LyYdhqSNg6WNlzP4SYR0T0tcM2qrnuImLhPxmofEJadtqwnoqqbzpSQ6VqU6TqRNlNmiB0aRIgldnmPtLBsmBEO1qEDgRolaTyWGT8XySiZqQDk6YCbSfnggCCOKdDtiXDniU9rbFcGqECBCLbLKL8HaQ+PzjMiEbFAmu3iXl3o2p8BcPITcBpIWGwnmOCCqYiWqXzrjvjoTsThAFcbmDgVXMXp3pCN8OmORLalQlKEeceSkScToekTgN2YLsLrSjSouLbP4I8JCPIqSXXnuaCKKIeV0jOernaVQDMjgHOrgB4B0ZuZyXECfrFDKA8Lbt4OXFTEioCFBdvm7kAA */
  id: 'Store Machine',
  tsTypes: {} as import('./index.typegen.d.ts').Typegen0,
  schema: {
    events: {} as
      | {
          type: 'SEND_TO_CART_QUEUE';
          data: AddItemCartEvent | UpdateItemCartEvent | RemoveItemCartEvent;
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
      asyncAddToCart: { data: { cart: Cart } };
      asyncCreateCart: { data: { cart: Cart } };
      asyncRemoveFromCart: { data: { cart: Cart } };
      asyncUpdateCart: { data: { cart: Cart } };
      checkAsyncQueue: { data: unknown };
      checkOptimisticQueue: { data: unknown };
      initialiseCart: { data: null };
    },
  },
  context: {
    cartContext: {
      status: 'idle',
      asyncQueue: [],
      cart: null,
      successMessage: [],
      optimisticQueue: [],
      optimisticCart: null,
      error: null,
    },
  } as {
    cartContext: {
      cart: Cart | null;
      optimisticCart: Cart | null;
      successMessage: string[];
      status: 'idle' | 'working' | 'error';
      asyncQueue: Array<CartEvents>;
      optimisticQueue: Array<CartEvents>;
      error: unknown[] | null;
    };
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
          type: 'parallel',

          states: {
            'Cart Async': {
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
                      entry: [
                        'removeOldestItemFromAsyncQueue',
                        'addSuccessMessage',
                      ],
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
                  description:
                    'Check if there are any actions in the async queue',
                  always: [
                    {
                      target: 'Execute async action',
                      cond: 'thereAreMoreAsyncActionsInQueue',
                    },
                    {
                      target: 'Idle',
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
              },
            },

            'Cart Optimistic': {
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
                          target: 'Open Cart',
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

                    'Open Cart': {
                      always: 'Action done',

                      invoke: {
                        src: 'openCart',
                      },
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
                  description:
                    'Check if there are any items in the optimistic queue',
                  always: [
                    {
                      target: 'Execute Optimistic Action',
                      cond: 'thereAreMoreOptimisticActionsInQueue',
                    },
                    {
                      target: 'Idle',
                    },
                  ],
                },
              },
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

          invoke: {
            src: 'cartMachine',
            id: 'cart',
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

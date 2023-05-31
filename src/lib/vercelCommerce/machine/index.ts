import { Cart, CartItemBody } from '../types/cart';
import {
  ActionFunction,
  AnyStateMachine,
  ConditionPredicate,
  ContextFrom,
  createMachine,
  EventFrom,
  InterpreterFrom,
  InvokeCreator,
  StateFrom,
} from 'xstate';

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

export type StoreActor =
  | AnyStateMachine
  | InvokeCreator<StoreMachineContext, StoreEvents>;
export type StoreGuard = ConditionPredicate<StoreMachineContext, StoreEvents>;
export type StoreAction<T = void> = ActionFunction<
  StoreMachineContext,
  StoreEvents & T
>;

export const storeMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAuB7ATmABAWQEMBjACwEsA7MAOgGEDNVqBJCs1MggGzNjAGII6KtUoA3dAGsaaLLkKlKNeoxZsO3XmATj0RAh2EBtAAwBdU2cSgADuljsyw6yAAeiAEwBGEwE5qXgCsHiYAbIG+Jl6h0QAsADQgAJ6IALSh-gDsABw52V5esb6xmb4eoQC+FYmy2PjE5CIqTABKYAQQSXQMqDgAgrBJFETUAKKuYEQArqi4BIPDOMSGFILCNLCoBjIYdQqNyj3UbR1dzf0LI+OTM3OXS0Qrli52Disu7gg++dTZ5VGZWIxDy+MqJFIIYqxaixADM0VCpUyoVh3kyVRqu3kDSU3VUJ06eN6AyGVwm01mS3uyycqyEIk222otWxiiaRwJZx6F1JY3JtyppIeTy8ViQIFejmc4s+mUyJmosMywURuT+yPBiB80V+oNiBXhgRMgWy2QxIBZ9TZh3x7UJ5xJwz5N0p8yFNOE-GQowAcgARAD6ABUAPIB2h9FpBgMARQAqqME89xZL3jKtX5MtQPMqPEDAV4PIFYZqviZstCQuXYb5sn5USbzZb9rjmsc7VzGDyndcKXd3Y9aXQSJNJDgY1MwJP+H1kABNH20AN9P2B0PhyNB5O2exSigfLWArNFUKI8o+VXZUuZIvUZGwkwmIHFf6BJtYq0HInt05E7tkl1+0WD0KGHUdx0nadZwXJcWlGPAQwANVGAMADEWhDPANyjbcJV3NNQE+bwyjvQoTByWt5V8TJr1ve8nw8CsTFhNV3zkT9Ww5Ds-0dAC+0FYDB2EMCiDHCcpwEaDFwDOMAAU-T6IMUIjHDzBefDaQPL5fBNX4SlCOEDMLTIS2SRAb0CO8UQYpiWLNaoLQ-Ft2VtX8HUuZ1+LdQSVhEsTIMk+dpPjRMUOYZAA3g2SgznXDU009MviKbI7xNWJH1hI1axNUsfF8UJqCMwJYliE1UWYti9hxFzWm49zeV7AVvKIYUhzaABbdAxFwAAzTB0HanBmjWERdGkZknOqm1arc7leM8prqSE0COq63r+sG5odAoCR9Cecw4o06VCMPQIvF+TLEQyJUlRzXKvEiagwnS7JQkYit4VhSrWS-NtOR4jzGtdJbfNW7qcD6gahp6fgwEwfrMGoGwuAMHqsHaib2Oc6af3tObAf5YGB1BsBOvByHNp6bbdoMWlLEOt4EpOhBvCNAIstVM7gnKXLjXOo94XCV6stib6OJq3HO2JAnAIElqQOoPoIAgHAMGhxgRpoMadixqbv3++qe0JoD5eWxXldV9B1dQam9Fp4wDrUlMjv3RKvDlDwnpzctciLLxDVLaiUsywJiwrWt9S+hzmz1v66vxhrjbl1rhKVlW1eGuGEaRlHUDRzAMZj619fjrt5qBk2U9AtPLet229rpx2xR3RnjrcTx3YVWFYg8GtqKCExvED08AhKYr3eyaizzF7GS9msuZa8kGhzjGwIG2a3NdEHapB1qri7j+fpcT2Xmqr6hV-Xyktt0BuHYsJ2W73LT3YyGFYQ--3SsBXJfF53xzofzOqEXIJVmKAhnrHLiR9-wLSJj5Fea8N6Z3hlgHOqN0aY33r9aBeMF4nyXsTRBV9cA3x3nfCg9NH54Vbq7Zm3hER3liK9IIKI3r5FCLzcsvw6zd3yuUTK2Q3zR0mgfXBUtYEV2TgrWgI5RIQywJvBmz83YREsvlG8pVoiRFPB4UsY8nqRARDpQIcpXrohEbrMRrk8HHyNqfZewlZHgXzko0U6laEv2ROdYIJR6yZAejkThZkEB91+KHIs4RChwmVKLSx2DOI2IkeXJOZ8ZHYGQTDekWsd7jSLjgpJAMCGLSIU4jJ18qa33tpQpuHiVHMweiPDIxY-ChGNO9QI+iSp3gAY+fSHhvCMUgdYmatjJGpMcaBWg5TSEwyzmg5GGCC5YJ+ok0ZyTF4lIQWU9oFTGD12qVQ5uND6ntxZjWFKQJmEDNepHUqXCUqmmYieARJpKjxNWRLA23IQw2A4O1XgHA+ICl+f8wFZAWp9DNr8sAFAlHUPim3T4QRsiwl1MUQe3dyKBHCKWAZN5Cp-AGaYoIJlhGYisQU9ZRSnR9AAO4EEcBQKAOBsCoEwEkfgcEgwtFigil2L8gj+Geg+UxJo-jd2vMxQq1z5QgjOulOJFKElfNLnYkY9LGUcGZaysA7LOXen9MGMMKlowhSTPyzxbtMzZlzMaQy3cTKljrAqeUZ1-jkSESxYZVLJY0pGMwCAXABCGrXCazcsYEwWuOYiuhZy8pZhzL4xE+oiymQhBER5LF3birlE+H1ay-WGxGM4+RvEIISS9L6MN2EzVRtGMogiZyciJvlIWV+MRix-xCd3T2OkJ6ZmYqCeyyrPk42+fgp0paxzlvEtORtTN41PjRSxes1FYkVlLN3SyIR3ZlEKJEZdBbVUwPmtO-8Fb53uOdlahpBRoRPnLGSyIod3b6MHtQCIT4jQGSfPqXwUdR3i3HWqnAoKyAAs2BClgQaQ3VuNbWyNoUF1Is8EWBU38p5tqiHdEJIQSgBB0sxUOapIgWKA7PQ+YzwOQaBXA3ANHwWQuWlvRkswVnAbntRv5EGmP0bAzx2jEL+jLRQ3G5Fqa7ze2LFiiIuVIjQmCEI16eZt1KscpSwtE7eiMag8CykumgUiZWFWo165TVIejXUptRF0MwlMVhqIOGaJ4e9gEDIqaHphHlIBjTKqQMwMM9BqRQXmO+XPVCkzIZorMDwOFIMzAlxyQUkpWtYmtJ1kskUUqqL3ZYoSK56VIcojruKvqY9AXuNgr0-x0LxmhwRZY9FhLcXkAJdgvBJCKF0KYTS5a05yLCyezTaUMoCqbzBIhAMorocStyjK14CrXGJGhdq4Jpj9WnFyJnSx5AABpZgslly0ASyGH06W3bUU9p-Y0LFGKFnynigZBVP6h28TJgyS2qMrfWzVkLv2jORYa9tzbqxmuxfi4l5cq4EOmouw0oo-gSi5gGSCJUwQnszaKO01ExRfP5K06B1b566tzoEPD5typszpUynu9KbSvC5QldmDKuj5TGhRF98Rf5icg9JwFfgRhr1Pxs1qB6aKjS90HmUABz2me9xZ4+kq0QvCopHX5sdy2-x+kwAQOl1AiBcHsJAfg0XfSIb9C0PoAB1Cnnw1SpVKMENtpRyx4osoqNhRpxXFE5x8zj33te6-1+gGwsL+C0AADIhm9Bbq3tv+ui4QKA6gAD8jljCP3RieLUUFRV-CbxAz4RVAchQdAEA4AuAJ1Qazi7Pih2hDkE0PnMyooKxCVIdmwEAJRJlEqod3kUagYwWvqGEBtM9k33IzFW+SpCakaIfb0oAa-SA13HgueqFYI4TQfBR-iYzN3GEt2awxC-n8UsqQqfd-KBWW-SJN-rP31pcIrrlMt6DnPjNwcSi5BI+lZiV6QfDXAPbnYtZ-RKDIFKKfD-HIL-LUUqPSFtZiB8O7cIR-ItBOexQhbZONWNF+UqV1NKDKLKZTPFD+RUX-V-ZEbxHuDA7TcZBxUpKZEHMnCAhpYoLMHSeERiG8V6U0btDNeUbMBvIRZhftKIeg0DFJJg3A9sMmdaKGZodgs5abYbM8cBB8ADdvRAIRLMYqN6FiTKI8B6KQ09TZeBU2XyGuDOHoFQ5FeULMBER8aXXIbuK8EJPQz9IEHMV-TKPUMwsZGQnAqw4hTJEfG9AbLUftAIP-QJaiADdNXQ0xbwt6ZEI0fw4oQIjZYpSw8+IHYQHAbJeww8EIQxX2AfGIU-XKB8aEFiLRRiEOVXclEAyjMArA-TSuBWAouFeZbACAEolmHNbw2bfUNpasTpEJf2aVYIHwcoN6EqABcjVo4falYtfjNJM2c9VxZQyIpPIVSsABEoC5NpTKLdbpR1SeUxbwHwY0bI-1DYyZOgGZa2QYh6CIJ6UxV6O7aIPgrdMoisIJLFIsADIse484Vbf7arQHaFMPOFXYkXOvU6fwXuabQoEybwD+THT2XLE0ABHSeVcEjoxWBlJlFlNlDlQYyIaAh6OY0oPKQoZ1BXEBbRVEeUP4ABIkydANWDN4zuQqceIoM6cibLUsFpRUfFEyKeIEJULk9VPyC9NgvYpEhAQEAqGAmfT-HQhAZHcJABIIe7LtP3IfEZTArsULQYqiGEYoMqPLRVXKPE1PLFJ5fIZhYIOUgTaE6DQNYNN4nuSyOsSIOyUOF9eXBUIjGsVEdHUoDff3NowpCEgHYLJOOrHoy0lI7LW0kye0qYnSfwd2aIJ8XIAySeZY6vSrH7L0zoz03jPTUHBUtM5Usff2VERUHDbuSOXuYoPFJ8AqREfPDFEBcsD0yElMpMsLIcHooo9YN4-wmENEMbYlYw8g4oQqG0wJAoNREc8chU-nCSS0kBX4csfUIdXudE3KREY8LFEBYU9pD0nXPXS07hPpXuREKIO7JIlmFELMb4t8wspUfKe84PA3I3PgAYpsg-VUnFJ6BiWEP8j893W8OCuC73AQmUoCvXagUPWFN4vwfwE0OIdKNEYlRCyyZC1-H3dCkvIAA */
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
      initialiseCart: any;
      checkAsyncQueue: any;
      asyncUpdateCart: any;
      asyncRemoveFromCart: any;
      checkOptimisticQueue: any;
      optimisticAddToCart: any;
      optimisticUpdateCart: any;
      optimisticRemoveFromCart: any;
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
      error: string[] | null;
    };
  },
  states: {
    Cart: {
      initial: 'Initialise',
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
                          target: "Action done",
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
                    }
                  },
                  on: {
                    SEND_TO_CART_QUEUE: {
                      actions: 'addActionToAsyncQueue',
                    }
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
                }
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
                          target: "Open Cart",
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

                    "Open Cart": {
                      always: "#Store Machine.Cart.Ready.Cart Optimistic.Execute Optimistic Action.Action done",

                      invoke: {
                        src: "openCart"
                      }
                    }
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

            "Cart Draw": {
              states: {
                closed: {
                  on: {
                    OPEN_CART_DRAW: "open"
                  }
                },
                open: {
                  on: {
                    CLOSE_CART_DRAW: "closed"
                  }
                }
              },

              initial: "closed"
            }
          },
          type: 'parallel',
        },
      },
    },
  },
  type: 'parallel',
  predictableActionArguments: true,
  preserveActionOrder: true,
});

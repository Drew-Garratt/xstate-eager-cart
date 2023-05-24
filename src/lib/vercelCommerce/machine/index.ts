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
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAuB7ATmABAWQEMBjACwEsA7MAOgGEDNVqBJCs1MggGzNjAGII6KtUoA3dAGsaaLLkKlKNeoxZsO3XmATj0RAh2EBtAAwBdU2cSgADuljsyw6yAAeiAEwBGEwE5qXgCsHiYAbIG+Jl6h0QAsADQgAJ6IALSh-gDsABw52V5esb6xmb4eoQC+FYmy2PjE5CIqTABKYAQQSXQMqDgAgrBJFETUAKKuYEQArqi4BIPDOMSGFILCNLCoBjIYdQqNyj3UbR1dzf0LI+OTM3OXS0Qrli52Disu7gg++dTZ5VGZWIxDy+MqJFIIYqxaixADM0VCpUyoVh3kyVRqu3kDSU3VUJ06eN6AyGVwm01mS3uyycqyEIk222otWxiiaRwJZx6F1JY3JtyppIeTy8ViQIFejmc4s+mUyJmosMywURuT+yPBiB80V+oNiBXhgRMgWy2QxIBZ9TZh3x7UJ5xJwz5N0p8yFNOE-GQowAcgARAD6ABUAPIB2h9FpBgMARQAqqME89xZL3jKtX5MtQPMqPEDAV4PIFYZqviZstCQuXYb5sn5USbzZb9rjmsc7VzGDyndcKXd3Y9aXQSJNJDgY1MwJP+H1kABNH20AN9P2B0PhyNB5O2exSigfLWArNFUKI8o+VXZUuZIvUZGwkwmIHFf6BJtYq0HInt05E7tkl1+0WD0KGHUdx0nadZwXJcWlGPAQwANVGAMADEWhDPANyjbcJV3NNQE+bwyjvQoTByWt5V8TJr1ve8nw8CsTFhNV3zkT9Ww5Ds-0dAC+0FYDB2EMCiDHCcpwEaDFwDOMAAU-T6IMUIjHDzBefDaQPL5fBNX4SlCOEDMLTIS2SRAb0CO8UQYpiWLNaoLQ-Ft2VtX8HUuZ1+LdQSVhEsTIMk+dpPjRMUOYZAA3g2SgznXDU009MviKbI7xNWJH1hI1axNUsfF8UJqCMwJYliE1UWYti9hxFzWm49zeV7AVvKIYUhzaABbdAxFwAAzTB0HanBmjWERdGkZknOqm1arc7leM8prqSE0COq63r+sG5odAoCR9Cecw4o06VCMPQIvF+TLESNUJjURBIzK+aJ-GYrwoRrGJ5XRBzmym79OR4jzGtdJbfNW7qcD6gahp6fgwEwfrMGoGwuAMHqsHaib2Oc6af3tObAf5YGB1BsBOvByHNp6bbdoMWlLEOt4EpOhBvCNAIstVM7gnKXLjXOo94XCbJwj8WJKtZL823++qe0JoCWpA6g+ggCAcAwaHGBGmgxp2LHfqlur8YauWBIV5alZVtX0A11Bqb0WnjAOtSUyO-dEq8OUPGoEwc3LXIiy8Q1S2olLMsCYsK1rfVYXFjiatxztiQJwDTda4TldV9XhrhhGkZR1A0cwDGfutP7Da7eagfltPQIzq2bbtva6adsUd0Z463E8D2FVhWIPBraigh9rxg9PAISmKj3smos9Y+xsvZor5OvJBoc4xsCBthtrXRB2qRdaq0uDcXpPjZT5qa+odfN8pLbdCbx2LGdtu9y0j3MnOk0dNNCzA6CXmTKFQMtREyIQPA5jfN9SaR8uIn3-AtImPk14by3tneGWA86o3RpjQ+ktYF4yXmfFexNkE31wHfPeD8KD02fnhdubtmbeERHeWIwsggolCIxaIvNyy-DrL3fK5RMrZEgZiPWMDXIENPrLc+q9hK0BHKJCGWBt4M1fu7CIll8o3lKk9MInDSwT29pEBEOlAhymFl9MRuDOKSMTvAquqdFYKPAoXVRop1L0LfsiT+eYqJKlejkUIpYB6-HDkWcIhQ4TKjFlA8ReC7EAyIYtEh8jsCoJhvSbWe9xolwSTNKRDiTYX2cek2+VN74O2oS3Tx6jmavTHhkYsfgbrBFNIEQxJU7y+B8E+ZE4DCz2WsRLWxBT7GV2KXI0CtAynkJhjnDByMsFFxwSM+O0sjYyOIUgtJ7RymMEblUmhrc6F1M7izGsKUgSsPAcLaOpUeEpVNMxE8QiTSVDiTY9Z5dpEjD6AAdwII4CgUAcDYFQJgJI-A4JBhaLFWh8UO6fAKBEb2BkHzmJNH8Xu15mKFRufKEEZ10qxOGXHHGGzCFOgBUCjgIKwVgAhVC70-pgxhhUtGEKSYEWuzfpmbMuZjSGV7iZUsdYFTyjOv8ciIiWJz31vg8ZHlmAQC4AIFla52WbljAmblJzEUMPOXlLMEC8x3ULMWUsEQnksQ9liuUT55USLGUkp0LilG8QghJL0vpNXYU5bq0YaiCLnJyCa+UhYPaniCDWEJfdqA6SnpmZioIhmOXiaMhOrqRjurHJ68S05g1MyNU+WEio6y+BrHKYqFY42WRCB7MohRIilqdfkrNMsc2KLzfcAtAgjAeJdl492BRoRPnLCZCIxozo0QeulL2U7SphBJfqStbbM2Ut6CGGwHB2q8A4CMFVaqfWsvXBynVoUi1Is8EWBUpUkSIiiFEHMpYQglACDpZi4c1SRCsemr5FKfk4G3bu-dZA+IChA2QPdmxwP9GWjvRksxVnkoXoUqDMGD0INwBhsDLU+jLSvYa5F+ovY3klbCXuxpfC5UiNCNp7y8y92Kuu75cDcOwYg5SDjB74MrBPX689XKg08uHYw29MJzEzwjc+2dEJwHygCBkUjr0wjyhjp8tZgH2M7ug3h7DwHdOYbgwR3yua+O0n4CGaKzA8DhSDMwJcckFJKX9URrSdZLJFFKtkeEJkSWvpCGWsOUQQHFX1Kx7T6GjP6ccTxkz5tzOmcs9ZhzdnkAOdgvBJCKF0KYTc6Js5yLCxeyLEqUEAcSg8weuAvFIXAkxIi5p1Dx9ougc4wZ+L+HEvdos56ZAABpZgslly0AcyGH07n3Y9LLT0yiFFSiRCvDV8BBVKNBCNEUcibTItofsV1zrMXON9emb15LnpUu2fs455cq42UFf1byjRPxTzgIUxlTFgWfDZjCIEdFvd+4iN261-bR2sPma616wthWQ2ymVNmdKmVG3pRuiPB6XhsU-eYq9+Ut0NNkvniDv8B2Idg7g32-gA7HtiaNa9MtRp+4+zKD01buVMdVhXdEDHcrzQUHQBAOALg8lKFqbDxA4doQ5BNOpzMvn7oQlSBJkqfgguwlCBWcxwOeii+LZ8G6ZGRG5GYrLnFD1UjRC9sUFXFvGIlSBFr1QrBHCaD4Dr69ZZe4wmNJR-KBobmllSPD5XZR1d93V0iB3Yy3fEcQCLO8huZch1NxCXSIrcgFDen3XwkeO2bKINHrSGQUpS6Nw+JP8utSlT0iXi8Jicw583UU2RqTDUGrfku1KTEv1+EN6+yjioSga9C2rv4pL-1ab29mgzJSevgT7QX6b76dLwkYjeYWpoaMPXMQqIsNaa2JqiA3oDEzm87JWqTNaEMNo2wX+Jn22YzzMRMvWCvCARFZmKpwlimUjyvSP3Ak-bZM2XyOuLObXIdIrQ8ciJTG6R8EEXIXuZbCEd-agT-HMEWTKPUf-QpQAlJM-K+FBfZVAW-I1RNAIXIM6aiKgyjMVcxVAoEdAo0TA4obApVZJRBYAocc7CgHALJEg5FD+fwVhdKaee9cOZPLUEEBUYIHwYsYoDHCOVgqfRxGfEA5aHABZbACAfgrueHYqcOJ8aIR8XzDpdHB8enbwH2V7EqHpP9YXNjHA5ePAzg+RXrNxZoHQr4CISsHpEoS5G6TKONaENPHSG8AoR8URcfFrRVZQyZFvOgWZG-CAsXbSVFY0IJFiJhNfEJEIavYWKjIsStIsJQztJWQFYFUFcFSFTwpbUiHpH2UoPKQoMVfuQqfIDIVEeUP4HpEovPFgVVMATwgoRTcIfUIoM6cibzK1B8RUBTEyGeIEJUXoqlLtcCfNAKTwwEAqEvRPHICQhAEoLMERHpIILhOQlEZYrdMnfPZI3XcyPwGEYoMqD2KjV-IIaeBNKjdXCY40DwS4wzdrLDI9QY2493QoW8CtZidpKdUwiEDHXIz9GsVEJUKTP45rQnGI84A7OLa4k7TYug7zZ4-zJ8WjVFD2LnGsFHOsNNewqLUHQE8DQ7Bk7rMzM7ZaIYyjL2B8QsXuaOfuYoV9J8AqRECkq3dXcsf47Ek2SHbgpWdQvg0EmPL4TAmENEMobmYscxPvYoQqJ4wJFFHSSU64vyAEvTY7efRUrSZEJ5csfUFNfuQoOTLUREY8L4kRXpYIKoKoIAA */
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
      | ({ type: 'OPTIMISTIC_REMOVE_FROM_CART' } & RemoveItemCartInput),
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
      optimisticQueue: [],
      optimisticCart: null,
      error: null,
    },
  } as {
    cartContext: {
      cart: Cart | null;
      optimisticCart: Cart | null;
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
                          target: 'Action done',
                          actions: 'addToCartContext',
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

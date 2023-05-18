import { Cart, CartItemBody } from 'types.d/cart';
import {
  ActionObject,
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
export type StoreService = InterpreterFrom<typeof storeMachine>;
export type StoreMachineContext = ContextFrom<typeof storeMachine>;
export type StoreState = StateFrom<typeof storeMachine>;
export type StoreEvents = EventFrom<typeof storeMachine>;

export type StoreActor =
  | AnyStateMachine
  | InvokeCreator<StoreMachineContext, StoreEvents>;
export type StoreGuard = ConditionPredicate<StoreMachineContext, StoreEvents>;
export type StoreAction =
  | ActionObject<StoreMachineContext, StoreEvents>
  | (() => void);

export const storeMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAuB7ATmABAWQEMBjACwEsA7MAOgGEDNVqBJCs1MggGzNjAGII6KtUoA3dAGsaaLLkKlKNeoxZsO3XmATj0RAh2EBtAAwBdU2cSgADuljsyw6yAAeiAEwBGEwE5qXgCsHiYAbIG+Jl6h0QAsADQgAJ6IALSh-gDsABw52V5esb6xmb4eoQC+FYmy2PjE5CIqTABKYAQQSXQMqDgAgrBJFETUAKKuYEQArqi4BIPDOMSGFILCNLCoBjIYdQqNyj3UbR1dzf0LI+OTM3OXS0Qrli52Disu7gg++dTZ5VGZWIxDy+MqJFIIYqxaixADM0VCpUyoVh3kyVRqu3kDSU3VUJ06eN6AyGVwm01mS3uyycqyEIk222otWxiiaRwJZx6F1JY3JtyppIeTy8ViQIFejmc4s+mUyJmosMywURuT+yPBiB80V+oNiBXhgRMgWy2QxIBZ9TZh3x7UJ5xJwz5N0p8yFNOE-GQowAcgARAD6ABUAPIB2h9FpBgMARQAqqME89xZL3jKtX5MtQPMqPEDAV4PIFYZqviZstCQuXYb5sn5USbzZb9rjmsc7VzGDyndcKXd3Y9aXQSJNJDgY1MwJP+H1kABNH20AN9P2B0PhyNB5O2exSigfLWhUIKuuBIr5LzI3IeUuZWGhbO17KIrzZWGwk3o6oWrFWg5E9tTiJbsyRdftFg9Chh1HcdJ2nWcFyXFpRjwEMADVRgDAAxFoQzwDco23CVdzTUBPm8MJqBMDwQRMWIin1Y1b3vR9skiYsQVibIIibX8W3ZW0gIdS5nT7QUIMHYRoKIMcJynAQEMXAM4wABT9Pog0wiNCPMF4SNpA8vmvAJAlCIFfEKP58hLZJEDvB8QTY41UWKZ8PF4uQ-1bDkO2Ax1QLEt0JJWdsAFt0DEXAADNMHQUKcGaNYRF0aRmT4nEBNaXzhN5XsBSCohhSHNpwsinAYrihKeh0CgJH0J5zCI1MDPTL5Qj+ahfGRQIIhrd9XwSWyy1CDxszfQo-E4pEPL2DKbSyoTuX80T8upSSoJKiLoti+LErATBYswagbC4AwoqwUK0s8-j5sA+0lpEvLXTWkLNrKirduq3R6tpSwmv06UyM8MJYRhCJSnfE1iy8UsfBGsb4VKExlWPQEZtZf8205PzHv5Z6BxCvoIAgHAMCqxgkpoFKdmuuaAOxnKezx8DCsg6giZJsnmhquqDF+xrdJTAH91ay8TFB6JSkKXwzNM19Sy6h92thWIPEhrwyjKdGvMyu7O2JXGwPE1n1vZ4nSfQcnUH4fbDuO07UHOzBLubOmseyh7cuZ42iqkjmLatnm9D54wBbFHc3haoGEBCN9qHCQsixokIQVCBXkXjt9YjonNTXCWFtZu+mPa7ZanpZ32oLjGwIG2K3KdEWqpBp2brWLxbS8NwKXqHava8pbnvpDig-sFiO90MsWFUCQEQkyS862RTJYaifx9RGwsCjPUzKm-V22-djuDa9o2Csr6g+7rvaDqwe2zouq7W8xnyj5Alb8eC3ua6vr6m5+0OLBj2IpHQGbhgY-GNICfUhQXIrw1jCaI3hvBBFiDvQubsX73U7ryPoAB3AgjgKBQBwNgVAmAkj8GQkGFoc5-ogJFtHLe-gwhwkgSaP4Ktbzi3jlxHM1FfCBAmrEdBB9MH6zfngghHAiEkLAGQih3p-TBjDNpaM8ZEyjDoRPUWmZsy5hzEefIbFAilg4ZnaIPVCwlABCI5+gksHHydMwCAXABCKLXCozcsYExJiAc1UBnwfBdT0cEfM+oiw2QhBEbIvxYT5GVKaOUdFbHeXseI5atARwyRArBeSXpfQeIImonxmi-HC0MjkLMfDN7IhiMWXwpYVajQEQvTM4tQRmj3ulURaSca8kyTBfyuTpxaNImAsscJFR1l8DWOUZ4KyNNQdmAEZRpYmDogXLptMekLQcW-AZ2ShlyRGaKPS9DJ5eHfDCZ80RnxcSiGnIa6944eFNEUMocJ3wqxSbrBm3IQw2A4KFXgHARjONcfkpR65VHeI0aMqO4zXyXM6kqO8fU6KFlhs+LM0CuJ-GKLWWsPzbp-K7ACoFIKyABQFOSsgwLNhUv6OtBujJZiPwxqk3Z4jaX0tBe-XAPLKWFT6OteFAStQ1n8BkGi6p54awaUNS8PgAjlFVr1bifhOmYm2XYrlwFBUMupZSA1oKmUrEhYUmF6jfHh2Adoxh1kUU5B8MnI84RSwhFrAEbOXVIjRFmYEYl7c9kmqpfynAobhWmwOWOEV5qQwqSDMwPAzBkBJqXKpdSmkilioYeM0oo1UG1kLMebOlyPXrJiQI15ERrFFHakGw+IbAV0qFeGyNZqhwxs7Z6BNSaU1puYEhFC6FMI4Twjmsp5zRZBOzBraiz4-jlkvBW8snVgjcWKPKetWqfw6s5XrfVLbeVhvLhG49Qqe1QW7XG2kXoADSzAVLLloEmkMPpc2TyNFUnMRZfVdQMauqtG7a3bq6oGrZT8D2kt6JG6SY4O3HIEJ+1qyJRohB6vkGiQIMgw0VSNGJpQl0RATonRtYij0UsNfB89VHTVIf4EYU5Qtp2MNfAqfMHEPxdXhI8iEiDCO1jzNAwsszyO9MZkaiubNu1O3rihxhRp-AGORmEZEyMgSli4oEF5x5OL0VyA2yDHLfkl0cVJn2Mmsljjk4lJjtr-F5sCYiaEb4PwqzVLWZeTzlU1gKPO8WxY0HGZ1iSszb8z1nxk9gH+FN6RUybqlfeurD2SfDVF6NMWB6-15g1QBDnymi1NAqdZ+oPwFBojLbIWmeqKnKNioslygnCJC0XJt6Su6rQJl2rLuBr52xOvfZ27LQvBo6yfbu3WpK0F64HIeeWFPjLVgUagcp7xcSVAUOEcC16IM3ig0yX5tVQdM6-Mu3sMshW7QxxSS5rWYVTQGFCibaFTvtYiuEMT2r0UuR+UoxQ8P8YBJ1aIGt7n5GPBB78FB0AQDgC4ZLSgznvc+D1Qt0SS10SiJEtIRYOM+pGkUbwsJAvidQMjsZnxjwcYx-8MtOOECpEQZ1AnGQ9NxK4mTtQjhNB8ApwiwJ4toTZ2LDWGIlzeGllSMqGEPr6uq3atNVrGC0n8-FQgMyMSi1YdLdj0s7VfhvnlFDRE898hc5gyBNXTnEAZEI9xXI4tMxZ1hqZKZSo1btWlps47Jmwtnc6x-E2YzHOTxrAqb7ZW-t6kB54SZppNurPfBWCsFvwvndPj3ab1nhlgGt5PG52YYgCNVh+DImQbxDRNAqKWKskTPnLO5ZXOzUueyZpnqbG0wClW2pVZo+fWrIJ0zPPTZQlTFDVqYg3jefDliBDPNPAeJtdc-n7c2XMegD8YSNDjgI-jV5nnCSvEJF1UT+JctiZRy8Qd96N9rfT2+TdX1Xb+2XGBb8RXcmEMsVbFjogDhnU-GfOJUEcocDRfPZDPJ-YPIcW9YQHAeLD-ZzCveOQEDiVBYEGIWGS5HTXIARKIF1JBH3PdE7f3SAwPaTU2OAigHAW2OQCAJA4GAReOAofA18d8bAuJKif1c-M8DnG-Egv3MbB-EYSRQhYhUhchRgyENdeeCyaiKWPwQoUxNWcxDIVEeUfFLwCA8bJxFxPPFjFHLUS8B8YsI3GiZWP4UsI0BUIJTeWsVEeJFrW-NrCjNLG9e4JDaQwEB8HIT8J3LqF3J5OUX4CILeV5IIMXYgxHU7ZtOjKlaQtnMGYtOnPXRVGsYfeEARQReUXDJvFwlXPVc4ODcFAw8eSnLUcJVbWedqV5BOfUWGEaUw3hFyVEFEAQmIsg7lC9ajM9Dtag7w+iZInXLHctRVHIYXGWE0f4JTOUHQyjVtXo72fo6NHPAYwwior4JragI0fIMIHqLiZQxVbidDDIOEepbwIEeY4onovlPo24xlag9mdaBA9YaQ-zUGDeMXAReEAzD1QoHTS5GIPwbOI8QRa4-5B4kYbtRDOCMou1TY5UHTNbFEITEENWarRVDbKiLIxvY0HwHICE7BR-FfGA7PGCWzTfDYgXLUb9eOdZEEAlEnOEQaCED8VzI3aY7UWsXeAolvS3KA0k8+GbdoN-cnak9XV8FA+8QxGZOo-IRpeEd3CvE0CyXDJUKoKoIAA */
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
      cart: null,
      workingCart: null,
      status: 'idle',
      asyncQueue: [],
      optimisticQueue: [],
    },
  } as {
    cartContext: {
      cart: Cart | null;
      workingCart: Cart | null;
      status: 'idle' | 'working' | 'error';
      asyncQueue: Array<CartEvents>;
      optimisticQueue: Array<CartEvents>;
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
                        onDone: [
                          {
                            target: 'Action done',
                          },
                        ],
                        onError: [
                          {
                            target: 'Action errored',
                          },
                        ],
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
                        },
                      },
                    },

                    'Update Cart': {
                      invoke: {
                        src: 'asyncUpdateCart',
                        onDone: [
                          {
                            target: 'Action done',
                          },
                        ],
                        onError: [
                          {
                            target: 'Action errored',
                          },
                        ],
                      },
                    },

                    'Action done': {
                      entry: ['removeOldestItemFromQueue', 'addSuccessMessage'],
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
                    SEND_TO_CART_QUEUE: {},
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
                    },
                  },
                },
                Idle: {
                  on: {
                    SEND_TO_CART_QUEUE: {
                      target: 'Execute async action',
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
                    },
                  ],
                  on: {
                    SEND_TO_CART_QUEUE: {
                      target: 'Check Async Queue',
                      internal: false,
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
                        OPTIMISTIC_UPDATE_CART: 'Action done',

                        OPTIMISTIC_REMOVE_FROM_CART: 'Action done',

                        SKIP_ACTION: 'Action done',
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

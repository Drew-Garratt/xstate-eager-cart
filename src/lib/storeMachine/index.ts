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
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAuB7ATmABAWQEMBjACwEsA7MAOgGEDNVqBJCs1MggGzNjAGII6KtUoA3dAGsaaLLkKlKNeoxZsO3XmATj0RAh2EBtAAwBdU2cSgADuljsyw6yAAeiAEwBGEwE5qXgCsHiYAbIG+Jl6h0QAsADQgAJ6IALSh-gDsABw52V5esb6xmb4eoQC+FYmy2PjE5CIqTABKYAQQSXQMqDgAgrBJFETUAKKuYEQArqi4BIPDOMSGFILCNLCoBjIYdQqNyj3UbR1dzf0LI+OTM3OXS0Qrli52Disu7gg++dTZ5VGZWIxDy+MqJFIIYqxaixADM0VCpUyoVh3kyVRqu3kDSU3VUJ06eN6AyGVwm01mS3uyycqyEIk222otWxiiaRwJZx6F1JY3JtyppIeTy8ViQIFejmc4s+mUyJmosMywURuT+yPBiB80V+oNiBXhgRMgWy2QxIBZ9TZh3x7UJ5xJwz5N0p8yFNOE-GQowAcgARAD6ABUAPIB2h9FpBgMARQAqqME89xZL3jKtX5MtQPMqPEDAV4PIFYZqviZstCQuXYb5sn5USbzZb9rjmsc7VzGDyndcKXd3Y9aXQSJNJDgY1MwJP+H1kABNH20AN9P2B0PhyNB5O2exSigfLWhUIKuuBIr5LzI3IeUuZWGhbO17KIrzZWGwk3o6oWrFWg5E9tTiJbsyRdftFg9Chh1HcdJ2nWcFyXFpRjwEMADVRgDAAxFoQzwDco23CVdzTUBPm8MJqBMDwQRMWIin1Y1b3vR9skiYsQVibIIibX8W3ZW0gIdS5nT7QUIMHYRoKIMcJynAQEMXAM4wABT9Pog0wiNCPMF4SNpA8vmvAJAlCIFfEKP58hLZJEDvB8QTY41UWKZ8PF4uQ-1bDkO2Ax1QLEt0JJWaTZLghT5yU+NE0w5hkADFCVKDOciNTAz0y+OFsmoUIK31d9AlKYovFLbUswsmJXPLaJjQ8vYcQE1pfOE3lewFIKiGFIc2gAW3QMRcAAM0wdAepwZo1hEXRpGZPiGptJqhO5fzRPa6lJKg3r+qGkaxuaHQKAkfQnnMVL9OlMjDz+ahfGRQIIhrd9XwSWyy1CDxszfQo-E4pE6tZf8205PyRLa111pCraBpwYbRvGnp+DATARswagbC4AxBqwHrZs8-iFsA+1ltB-lwYHSGwD66HYb2noDqOgxaUsM63nSy6EBCFEYQiUoCu4+FSrCD6PC+0oTGVY9AX+rzGsJztiRJsDxM6yDqD6CAIBwDB4cYSaaGmnY8fmgDgZantSfAlWNrVjWtfQHXUHpvRGeMU7dJTc79wyy8TFhAJEQsoozNM19S1uh9cthWIPAKrwyjKaX8ZN5ridai3la6qT1c17WJqRlG0Yx1AscwHHm2NoGU67FawctzOoOzu2Had46mbdsUd1Zi63E8ascsCQsixokIQVCMPkRyt9YjonNTXCWFE4rnylurxXAohoc4xsCBtgdvXREOqRDfq61k5XhW06Vjr6+oLed8pfbdFb12LHdzu90Mn2FUK6PxcvOtkSZEFnHGE0RvDeCCLEUylRvzl1PpXc+IFVpk2Cpvbeu887IywIXTG2NcYn0BsvImq9L7r3Jmg++uBH6H2fhQZmb9iJdy9uzEIPxjSAn1IUFywD-D6neoWAoZ5oGL3gUQ+WSDa4Z1VrQEcMkYZYD3izD+3sjT+BzJLMIyJxZAlLFxQIOV-icXorkXKIjCGCWIRfc2V8N5SRkTBEuijRR6SYZ-RE0I3wfijmqWsQDXqMUVBZAokRfbFmEbAuaoiLHiJruna+0jsAYIRvSfWh8ZpwPMYtSxEi4m2KgrQRJD86ZPxdnQ9uLjlHs1fHWKidEvAfgKDRXwuVdH3UVOUZ8mQiz1J8MUMx3lokg1IWtchdjClUIRvnbB6NcGl3wQDAZWSYlrxGagsZ7QimMBbqU+hHdGGVJ7hzeEXhqBynvFxJUBQ4Q8NAfwiBQjET9NlqbVOTo+gAHcCCOAoFAHA2BUCYCSPwZCQYWgpQYWlbunxBH+DCHCdhJo-hR1vL7HKXEczUV8APaesQnkExeSQt5nzvm-P+YCr0vo1xhm0tGaKSYIWe0-pmbMuZ1G5VfFi0sSLJ7RHuoWEoAI8Vn2yStZgEAuACG9P6YM1LNyxgTPSvZkLmGHN6VmHMwR8z6iLDZCEERspvnyMqU0co6JCoQSKkS9i5H+VgvJCl0r1w0vlTFJRpFDk5HVfKARyIYjFl8KWKOH0sX-0zL7UEZoIlGyiUsoZTprVjltXJacbq2aqron7WEdZfA1jlGeCsgaoHZgBGUQoIS4TmrEXGkYCaQJ2pTc4j2rjvb1L9lxGIuUzJ1miLonU71TRFDKHCd8UdK2DPOCGGwHAeq8A4CMMVEqHVUoIrShVoxU1Qq1NZG6So7yPTqTeV6r5ESgMsn8YotZaxjtjROqdZAZ2bDIAFAUk7p2zqff0Da+9GSzHmTLfFVdeivvve+59lJgMPrnZ+k6SrGXexrP4DINF1SZGCQGo9qGFSFjMkWHN3E-CRsxNGzJctgIQdA8g3A5HH2dT6F+qVy7nV0vXQy5tVTt05pyD4YeR5wilhCLWAI09bqRGiLmwI17SO3rfTRyjOBqNQboyFWtSnaT8BDElZgeA4pBmYEuVS6lNIro3Sq2UZRua1mw3RKIure7lhusEbixR5RB0Iz+YjiypPcgU0+uTPnaPWxU1+jTuntPIF00hFC6FMI4TwsZ1jBzoW9OzHHaiz4-jVT8RCKs2UsUiwiAK1zkmCVAbvZB3zkj-PQaHEFlYXoADSzAVLLloLpkMPoTOfyNOqnMuGipdI1K9HLDn8vObordCTUaCGeZK-JsrFHa1VeTQITrGVkTC2NCaQeQIMglSPf205tYQgRHCI09yU2FnPMA3NmTc7Qo3ZAzR+tK3G3v3dUlmp+YOIfluvCMe+2RaHb+PRAohZc1VG-BQdAEA4AuAyUoCp73ED3Q+lAyz-xp71NLKkIsCp6I-VzdPQEvhr2I7TZ8Y8eP9VWcx7ZhAqQwE3WEx0qIeYgiTaI9N2WrBHCaD4GTzdZYo4wmcjWGI9T0XY+VDCZnuVo65T+hd-9wqIRvfJ4gLtFn8gY5s6WXKvw3zyj8PRfNUsldJwtcs0kAvTMa8EzkT8vtMxT1KqZRUhufrHnKCCDn7mucAcQbEmxoyVXKs-jWBUcv8ofiKvqfjcIDdKhFqh00JozXm6XuO15YG67SNkWFeSNvP7PhOeUOOZ4Y6mVuoevVNTSgS6RM+cs53OeXYD5a4ZKCrYUypjtOGzQi8ZXudQQqXuyhKmKDHLl+vm8+HLECQqxXrtB7IWshuttc49EH1U96ePAR-DTz-VE0-sqz6zaCcoE2l+B5WV3m+d8kmMG36q580Ig5R2LON-KJ+qJ-HqWxMoDIZUa-DvaxVfbvIcVTYQHAFJZ-aFRED6dxDiKBYEGIUqepfRXILFKIbjcBBeDPGNLzQlHPKRa2KAigHAKZbACAOA3uLFHKYJI0V8d8dArNKiMTP-M8LNKBEAq3MA1ZCAuxfPeRTAB2Wgr4brHKEwTFC9WEDNF6CED8DxQ3E0CiOOZ8Xg6tOTeJQLcZMQptRLLdLpRUXjNiVEdLPbRQ+Ed3JPE0CqCyJUTQs2EYD5L5DgH5P5MAAFVXfZJHSEezVDCyaievPwQoLlGOHlDIVEeUc9LwJw7PFgcVMAcQgoCeYsQ3GiSOP4UsI0LDUI7wWscwy8XFAgkjWbFaFTe4ZbcQwEB8B3XIJ3W6F3fxOUX4CIQREWIIMXfA1vZXS3MjebGjcQjIB8NHbXY8WnUqGsfRYsV8bwU0ModReIrsfzRIiVFI7VU5QEDpEWU7OPAHB8fNGOEEVEFEX3eHK7RBVYyrQYxTDaGo+iLXGnXXDDMyU5DILKAo+EcoZY0rW7CrdOKrcg+7cglInpEfaqMIe6LiMIo9biYWD4rxUtIEX4h7crEgoEsgjaGA9YME+pAxepZpLFeEYxfjQofRepGIY3MIU7VE1YxbW4j9aogwvw5UfRM5FEI7EEGObIUqC5KieESIDLAecWSNKoIAA */
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

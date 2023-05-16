import { Cart, CartItemBody } from 'types.d/cart';
import { createMachine } from 'xstate';

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

export const cartMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAuB7ATmABAWQEMBjACwEsA7MAOgGEDNVqBJCs1MggGzNjAGII6KtUoA3dAGsaaLLkKlKNeoxZsO3XmATj0RAh2EBtAAwBdU2cSgADuljsyw6yAAeiAEwBOL9Q8Bmfx8PEwAOExCTABYAGhAAT0QARgBWFOoggHYUpIA2KI8PTO8UgF9SuNlsfGJyERUmACUwAgh4ugZUHABBWHiKImoAUVcwIgBXVFwCPoGcYkMKQWEaWFQDGQxqhTrlTupm1vaGntnBkbHJ6bP5okXLFzsHRZd3BH8TXyTUr2+kj9y-0ycUSCCSISS1Ci+VCSRMgVyRQK5UqW3ktSUHVUhzaWK6vX651GEym8xuCycSyEIjWG2oVXRinq+xxx06p0Jw2JVzJhNu9ySViQICejmcwre4Ki1FyXhS8MCJiSmTh-iSIOS8PSOTSHlC+pMJkyoSiKJADJqTL22JauJOBIGXMupJmfIpwn4yCGADkACIAfQAKgB5f20bqNQP+gCKAFUhvGHsLRS9haDMrLqCrQiljSkCv44m8PLl9dQfErDR4UqFctkzRadpiGgdbWzGBzHRcSdc3XdKXQSGNJDho+MwOP+N1kABNb20f3dX0BkNhiOBpO2exiiivZL+TK+fxRLwFE9RNIFjVgsK+aG1i8BPIffwNtGW3Z41tHPGdonO3s5ndChB2HUdx0nac5wXRohjwYMADUhn9AAxRpgzwNdI03EVt1TUBJQPI9zw8c9LwCa9vlPctS1yGs5ThCI3zkD9mxZNtfwdf8e15ID+2EUCiBHMcJwEKD539WMAAVfW6QNkPDbDzEePDKT3MEiIyEiyPzCiEkQLxQn8GjaxrfMIm8XJmO2DFmRtH97TOJ0eNdPjFlbABbdAxFwAAzTB0A8nAGmWERdGkel3ybOymg4xzOW7HlXKIfkB2aLyfJwfzAuCzodAoCR9HucwcJTNSJWSLxMhMagTTyXToRMHJC30hA5Q8PwklrEs9RNExAWsxlPxbVlOKcxKXXJfiQPS7y-ICoKQrATAAswagbC4AxfKwDzIpY6LrVihz2S45ykqm9zZsy7LFry3QispSxStU8UCMq6raqieqz1yJr-kojw4SzLq6LlWFL0yQbWJi787RO8buUmvt3O6CAIBwDBcsYUKaHCzZ9tsw7YfbfEEYA3iUuA6hUfRzGGnywqDEekrlOTF7dwqsEqpquq6J+v6WtBLxomB2sIi+lJ-BSPUoYOr9RvirtEcAynpuptGMfQLHUH4ZbVvWzbUG2zBdsbQn5bi+GEuVinUoEmnNe1hm9CZ4wWaFLdnnKt6uY+3mGt+5rKLhdJAYfGtES618KnNKLzZGy2O1OiaVbtkDYxsCANm1nHRAKqR8Zsq0LeOpOyZci6BwzrPSXp+7XYoJ7Wc9nd1KSbnPu+0jA-+1qc0yTr+5zAtZfj9jS9J63yeStPqGr7OlpWrADa2na9qL4bx7hsup4r5Gq8zhe7vzh63YsZvcK9163Henmvr57uBevHxfGzOilUBC99VH4uE4nv9qYAHcCCOAoFAHA2BUCYHiPwWCgZGgzmelfDmPtQjZAyBHfMUt4RGg8M-Y8GRTJRC+v4OsUQpY-03vZbek9HTdGAaA8BkDoGeh9CuUMikoxxgTEMJBrdOawmMikWUwivAfC+u3FIwdhHUBrF1YRuRSGZHIaaGOZtf5bxJgA5gEAuACC9H6IMHD1wxnjImC+ZVr6SiSAUPwvxjTfDqqeWIrV8jGThP8X40QAiULYtQrRp1aBDiEn+cColWGGNXJw0xPC+H4RvggQEkJ8hRCrIUL6sJ1StRyMkrx1YfCkKiJkSGai44aP8WNTkQSwJcTCZOOJ3sElqiPICEIijcxykltebI6Q4ShDlL9MIBRlS+JhgrK2jpqkhNqSJepgoVLIPUrpcs8psGFEyIEIy140i+FlHCfJYj8jFNGUTcZHZgw2A4B5XgHBBg6L0RE9hWEuFmN4RY9mbcUi-FqkEYWuRAR0VCJRcIvhqxdVSE1T+pCTklxoTgC5VyblkG4jyBFZBrlrGRT0aaudaRTHXkNPxR04Vooxbcs6pJSVIpSt0aaDSrHJFlLkPwqTwikPsesyihkvilmIQotURoYV-xJZc9F1KKW4CpZimlOKDFPOidw8xHtL78J9nkI01AP4bK+QMo0LjQQhEMlmL+TUwjgysqUgm5TiVaKleSlO8LRVkqxbS9yUyRyuspJ6AA0swKSi5aCBmYMGb09KUEJJSX4YpXUVQFH1Cea8bTpT+G7gU6I2QbFCs0b+O1yKJWOsRdK7FbrgkepxcGKSQa8DMGQEGhc0lZLyWeWG9S+RdnQiqv0oI7dDxcozDRSWpFJYbOhGUS1G8iXExzU68VDrc0ypLTU8tlbmDVtrcwGCcFELITQhhZt7zFmc0RKEGUHbjTkLDr3UEXVYSyMPP08hnTvgeCzRUk487BIjnnXUgQLbObfEzBEMROzvhpA2ZRHUmrwQZsUb8JEr6bXTsLeS91BaxVFtmb++ZbND1qtlDVfJARDL5iwXg1qeQTTlgNIomxNjZReHKDHCg6AIBwBcOo3YCzVUJIALR1gyNELw-zZShD1EJrw14eMBHLC-CsHwzI5FUaiK1VDUBcfiW8Hj7cBMnmE4ZMTspryKNkYaQ07cAhmtCAhtQjhNB8HU40t4xQIOQlM1WNBdYaMvvHYSsZbYHMMoQHqGUcoFQfGVKqLJoIEQhf2ayxEPgkjWbObQogAXw1OeZSIsLSoVTwii4gM81B277NWT4EdyXE6pfzTPYC6W279RPf8RrUsDxoK+t0zM2ZczZH1IiYRlX-7JxtrVtWqHMP1f-QB4rAIjLDvawVsEELZGHPol9OTg24XDenpXASV15o5QaJNvD-zNWAxTaRAoVVBbJAiyZf5ARsyBE2wE8u51972w1nTTox2El5G+dLOiAQHx5ikeR-qzL7wwiB9CbzymJ1+aG29pGbkD411wEdnD3HJSlgHjWfwonsiHkM61ITNUhO1n1Ny+ERQXuVKVjtj7IFPXCBwNSMAv3iwBA6rKC70sI7ZGvKZe73PSJFC8HD2OKnJ0pYAQ60bKNpo4D1nICAnPPDc5C3z6stZBfg8PFCWix4PjwiMgxnz0NTlVYAfQkBHAwEQLAFA0ELcNOIDoukYp-zDSXiomD698JpRKl1NVHIpE8h08Vnc3RHOsdu7aiePwSpiG-Gls4-ViB8zJqMhmiHUQu2R4mYMVDMyIKx9d455IH1PgqiKOk8FXVtlFJk4iGvcblGF-OTO6V6ulsDxr9B+vmSgXkYKHj6D8pSwkejvD3zVv-4fvueXlV8flRVRmyWI0HwYP+8qv8WRrLilpCheb2flvYW2u7-am236WfhssRlqvA8jLEOKP1-pRoR-XuNDVQ8x5UmKIqiGQz5S4I7z4irIZ5pzpX4upjalrFqNIP7qSFDpAv5FI9T0Sf7Aqlh2L-79QHjtxGSd5dAfrQGQELoDh35s4rC97giAxQjgjCLGgpp5BcqIjlhdTEK-S-B0R1jEFobOrF7wHfoTZx6V5gh0SapVSD7h7D4QbKIso0ZoIWRfIlLlBAA */
  id: 'Store Machine',
  tsTypes: {} as import('./cartMachine.typegen.d.ts').Typegen0,
  schema: {
    events: {} as
      | {
          type: 'SEND_TO_CART_QUEUE';
          data: AddItemCartEvent | UpdateItemCartEvent | RemoveItemCartEvent;
        }
      | ({ type: 'ASYNC_ADD_TO_CART' } & AddItemCartInput)
      | ({ type: 'ASYNC_UPDATE_CART' } & UpdateItemCartInput)
      | ({ type: 'ASYNC_REMOVE_FROM_CART' } & RemoveItemCartInput)
      | { type: 'RETRY' }
      | { type: 'SKIP_ACTION' }
      | ({ type: 'OPTIMISTIC_UPDATE_CART' } & UpdateItemCartInput)
      | ({ type: 'OPTIMISTIC_REMOVE_FROM_CART' } & RemoveItemCartInput),
    services: {} as {
      initialiseCart: { data: any };
      checkAsyncQueue: { data: any };
      asyncUpdateCart: { data: any };
      asyncRemoveFromCart: { data: any };
      checkOptimisticQueue: { data: any };
      optimisticAddToCart: { data: any };
      optimisticUpdateCart: { data: any };
      optimisticRemoveFromCart: { data: any };
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
                  initial: 'Check Queue',
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

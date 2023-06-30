/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */

import { createMachine, type MachineOptionsFrom, sendParent } from 'xstate';
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

export const optimisticCartMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHkAOAXAlgW07LAxgAQDCAhgE7oB0AygPZVECycsZMsRAZhfdkQAKlMADsaDJq1jtOAYgCqggCIBBACoBRAPoBJLcwDaABgC6iUKnqxMWeqIsgAHogBMr49QCMXgGwAWAHZAr1d-LwBmLwAOVwAaEABPRAiATk9XX2jUgFZjQNjo2JyAXxKEtCxcfExicio6RnQWNg44Hj4BYQoxCSaWmTbYOQAlTWZkADUdfXGTcyQQKxs7B0WXBAjor2pjCP8c1y9g-1jIhOTN9OpM7LyC1yLXUvKQSpw8QlJKPqlWzg6-CEInEjT+g3kqmUyj0BnmjmWtkw9kcG0CEWowQigT2riiWS8-niSRS11uuXyhWKZQqGA+NTqPzBzWksnavCB3V6zIGbOGtE0ADkYepkNoSKoRuptABFBSaeXwxaI1aoxDRfbUXypKKBQ4BCK+UIXUkZLKpba5NLGIn+GlvOnVL71GiqWCJUQEaiaJxgAgAV3QYCIZHdnpDBFWcgg9jA1HwZCD1HeTtq3wabo9Xp9fsDwdDWYjqyVlmsSJR60Qx1cgWo2NSvhygVSFr8jZNCA1OV2R3S-mMx2MQ5etKqnzTLuomc93t9AaDIbDxDIkeRomjsfj6ETcZT48ZGaXs9zC4L4ZXxa8C1LKzXaoQx38vhu+WbXjyASbHbyngiOWiQReHshKBL4ez2nuDLpq6R45vO+ZLkWa5yAKwraKK4qStKcoKpoJZLGWqqVpsOR-t4jwNgExgWnq-gdka0TeDkMShOiviuKkoEQY6+7QVOsFznmi6Fhea7UCQAAWfoANZEDK-pgApciqLQACagokNoUIimKEpSvhKp3sRzx6tQqR+NENrZESBodpE-j+FqRxPuZuTscE3FjlBk7Ttmgmnohon2OJUkELJ8mKWAylqRp2hjBM0zaAAYiMyDMJh+lmAihFGaAGz7A5ZmBP2Nb7Bx76+HZBVOYS2peG5NaBJ59LOkyvnHvBwnnquwWSTJckKUpKnqZpShqFoGXqAZOUVnlKQDqkTHFdkzbRHqlUkg+1XsfZGoOcEAHNamB4wVmHVCWey49aIIX9RFQ0xZpOHynotDaOMgjqKp023rNzhuDEjE1uEeoeLExjPFVhU7S59U5O5TWvJBrWHmdcEXYF13UCMYDYPQABuwYcgILobqIcaYKI+P0NJu48d5bUCSeCEiVjON44TgIkz8CCU9TBCJmu8w-eWaxzZsT47McOJBM2NYNnZOTXDkT4BKcDZ-tER28T5TOdZdSHBezBNE500FyGAFB8BQ1CoAANom3CMNgyb0yjp0zujAWs6s2O4ybXPQbzVP0ALxZmCLRHi9i9VapZEQ1tsmTvnZQSMXsgR4kr-bBCr2sM6jnv+Sz3W+6oEAQEQ6D0ObMbk9QfM03TXnu-xaPF11V1lxXVc1y6wf84L9jC1lyozWL-0IM8AE3Bx2KFMVaSK8rT6HP2Bx5Kk+et+1Xsl13Ynl5X1fm5b1u2w76BOxQLvIxOjPt8zneGzdR+90Hjdh0LEejzeov3o8YwQMihDg1r4I0dFNogXTtiLOqQc56m3vfQufkn4GyCjdBQqAIA7lrpuRutNXYt2QR7VB+tMa+ywTghc-dP5D1ECPa8BFfoT3yhDbsA4OI5GYqvQky9PAq3AQ5bIvg-weSRm7Ehbci5oIoWJKhuDSZn0YBfR2zsiEtSkbvDu6CsYKJoTzOh4dTCR1ypPBOpwtSnHAcVCy5woFp12DHd8QCWzJyQSdaRZCMY+zEn1MKPBGDm1MX9DYNZtRWObCVTiRQNqXCAvAsyqRyrJMyBDO0EjiGeO0bI3xvVQqyWvsEq82UWEAJODcfwaQOIeFgXqDsFpXDUGKNw9EERjDcOyB4viOTyF5JuiQHoiifhkwpiHQhd9sl6x8aXPxQyDFUAHqHehjDSn-2Iu0msuwOksTSKI9sUCrLUBBmkJs2InwOW6brR+fTZm9XmcGJRVsVH2zUTfDRx0enTO9ncgZDyP4hy-sPH+TDDKhJSNPG4AQdrGF8CEMCOQGnhGoHkaI4C1oWJrK4K5D8ZyqAAO5kCRKIKARAejoAoIkUYmh1AjG+r-Zh6zxb1VAs0vEeJmz-nRPAuyQCdhhE-NsKpwiIg4pQVOQlxLSXkspShIUOlJqynlIqBlYLWFVmKk0qkbFwFUUCHZI4OxYX-hou0ooaQxWkOoLoCAdsoqoQVXpbCyq8KqvHveKI2xdjmrRacWJkDLgMSYixUq7FOK+EtV426ATfIDUinKtCGEnVKtwiE9VU9nieD2A5UInF-DJI7BEMipE-zqyOABEIiNRyaKmWdfxslY33SimmgBQ5nwARZYa8IzFEWbTyFLIBBxGzJPMlsEcDoslfLrQUogjbBrNpKWPMpxl+0oo4nsNIhoOmiI7BcrU3Ci1FDYtiItkb2q0DEJXF0RB9HBnUDXLk4g5AtuMsEI18DNnRCbOiY4u73CYiHBWit1EBxnqPBe0QV6fhEAAOqMGkpTUlJ9H3oGfW65d4sPBBGOcVAo1ki1wvov2SphwQg2jhQesDZ0INQaYLQf0BACBsHfihtDoL3WvqyLsZiHEGy5C-fqvtXrKIHHqlU8jWtMk1qnTOGj0EiCaGeRQFjIJUMvuZXqDEwQIbmsyAKgNiBchNJ4fkbURpmxZEjZM61tr7XyvQrpLCKaVXsYw5PICXrgM1OSYcDUDTHiYlEdsWIDkjgWqk58yc1m95EEmbO66oytw7g+TrJk0WO5xdUNddT7nxPeDhS2Ac88NSpCqmRYG8CQj1UiNwqzkjvELkywlh1DnFXPVda5plk88jdmSYad8KsgL5thf5xioEtgxDCESSIW8IupYaOlp+TXfb1vi1GZAn1dDMF0LQdQuhRoqA0DoJ1OWNjhGfNwwc7EhwxCqXEqsURPCrXCNYm05G6tZPOo1+ra2-Ezqy+tzb23dv7biuMKYOgUppUmqdxAOJ223YgfDG0-4qpAUxBaF7aK3tPg+zWr7wZlt-f6gD5CtAADSuhBBaRIHt5AgpYcPhR1Cs5jwgj9iyGVrTxVOKZ2OH+fYePjoE9iz90n+SScJY23t4He3NLaVayd9DXWNihB2JjkGAE0UxAOfEx7GOO2vfXhGubBcaDWdW3FptbG1lR0ntkTEpFuFuSfDaCIHZCh1i-QBMCjx7LYtN63C3M6rfzufYuv+duNh1UxENhsoDR0e4C2O316IOk1iF-uOgl75O3qIPe4EPQn2M8iOiZp2ciQ6nzXkd3m03FmSiE2Vxk2E5lFeKIegEA4CODiy6W3ZiNgAFp-3uDDXCrInqmz3YfNh8k-HAbOQD9WyLTJJAsn+OyM2KH+-gqnt2LEOIE74iFWEDseJHKgTuMkyIQF3BL4ndJyca-eRDEDihnkrIhg7-TfDRyfhOH-j5qay9qXCGjPiX4Nh+DhBrShBUaejf73h+DNh1gWZNgtjbDgIgFuCWIbqtLNicrbBVoP4r7ioxa6J25qoAKEgZC2KgxAIeCQybSxCLSAaZwtj9o+Djq964oNb7wvzRrhTzoIEbKAZQocRwoDglpYEPgsQvgcp9iEgcQZLL7zZWpkFyJGz+yczEzQTCHRz7RahGhcrUTJKEYOKkROIhAajtLwK3ZwG8HPwYJTg9wnx95Loq5uBN6x5gFATUQmSpwWEZwxBFrUTQHKHEGqFRrqH9LUB55uGR4D7zQ+DHKcSawhDmTbABEYhBHWGhF2GB5aLfJ8FOHi6iBEB1xgB6GTxcK1h4iDiAyEh8JQJnDeCgTmRwoHDnL2Ei7kGHzXREDKI9AQBVFnaSFag-odKwLMQQwBE7AFCZzuCcS-7NjdHRG-ICGBLKbxGMpR6eFHAorwzVLJJBBFrEjxIbqYg5pNhrSkTWSrE6IaF-JgDDJUAjFJEYjqyAF8bATSHtEopAJsS5DVbwLdEEpEpYAkpkpgAUqXAJG77HCWROKtiWTwItgKyHJopajYiNg+C2GGjhHcHio2p2pvGbCwpzG4HlRiZEZSyPCGhKyapZBcE-bXIzirZzqRSknBHdj5qEjtJ7BDgTaFqGhQoDiEjcKPAhAEksk8HZ6Qa57YK4IF7b7uG7FTy0TeAmFBACkjrT5bCMQATqz9jpCVaSYqFm5RpybXpwYUAIaQnIaqakm1KeBFD5rPAWLojuD0Q2hiE2g4geAebSmTqslehWnQb0aMbMYOlF7oBOl6g7B-huIJzrr5rfiWI6iWSDiWjiLmk7zgY57XqKbWwqYxlcncpmRfo34YqnBVINKxzaZDihaX5BCZ4MhOm9aGkInWI66nDfhRBmT-iZDMSWj6mtmEA2YkmqmJEyHsSVLvj9j-jURFpJ7Pg1ZfpVLYgQx+Bjm1Ai5E5-SUHERl4a5dna5orSFASNhWL9rpAWIHBBmP5pb1Z7li5YzsnXSknhAukthbrDlDgdJ2TvgYjikQxgRlQlo7kOH7mvz9EVGkmbq7ChCiJEhfrZycSpysoUb9j7DbB8mQUbGh6clTm76mRrT5D7D-gARhB4j0SxwHCxB84ajFRwr4VhlMB57KmOnEXpo1Y7D9g3Y+ZUXFS8o4hmQeCwqcRhA3YB5lBAA */
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

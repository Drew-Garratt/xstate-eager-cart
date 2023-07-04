/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */

import { createMachine, type MachineOptionsFrom, raise } from 'xstate';
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
  /** @xstate-layout N4IgpgJg5mDOIC5QHkAOAXAlgW07LAxgAQDCAhgE7oB0AygPZVECycsZMsRAZhfdkQAKlMADt0AYgCCAERkB9AJIAVAKLMA2gAYAuolCp6sTFnqj9IAB6IALAA4ArNS0B2G-fd2AjADZvNhwAaEABPRAAmAGYbZxtwmy1ErR9Iu3CtcIBfTOC0LFx8TGJyKjpGdBY2DjgePgFhCjFJAFVBGSk1JTVNXQtDY1NzJCtEH3Cfah8XAE5ph0io328g0Ijo2Ki7La1plxdw8ezcjBw8QlJKGgYmVlh2Tlr+IRFxCQAldWQANVUu9W09MN+iZMGYLNYEDNwtR7K5ovYll4VmEEFEYlo4qltrt9lkciA8qdCsVLtQpLAQqICNRVJYwAQAK7oMBEMgUqmsgiDCQQMxgaj4MjM6iEgrnEo0cmU6m0+lMlls6WcwYAvpGEFg4YQrwuVwwtLTOw+LRefwuLzBFFpLQwxL2Q0ZNIuOxHAknMVFC6lKVUml0xnM1ns4hkLmg0Q8vkC9BC-mis6eiVk4N+uWBxUc0MqryAgzqwbgxA68bUSJeLxaSLTcIOHx+aY2S2jOKlrzhLyGtyRaKV13x4leyUp2UBhXB5XhiS0VQAOQUymQ8hIUjeynkAEVmqot6qgfnw4WEJEHEjqFEDg24oaHA47E2EMbItR5pXrwc2w4++6EyTvcP-fKQZKlm4bUCQAAW9IANZEOuDJgPB0i0AAmjOJDyLI86Lsuq67nmAwHlqEQ3hMGQmgs0xeHE7g+PeXjdjaSRaA4NiGlRN5fvkP6Dsm0qpqOQGZmGZhgZBBAwXBCFgEhqHoR8zDfL8ABibzIMwS4rsoeEgMCBZEUecROK4LjHvMYx2NMtGrAg9GRIxSQsWxASfvi-biqSPoygB6bjiBIkQdBsHwYhUgoWh8itO0nQ4VpvR7gRmqgBC4SzNMZ7Gt4zqmiZPjIkWFHUKl0zRPRyTMS4nFEu5f58SOgEZiGwmiKJgWSSFYXoZu26-IotDyOogjKMh2m6YRSUREspZ7A4lYHN4diRHRDHOA5rH+BxrnfgOSaefx9W+U11BvGA2D0AAbiyvBPBKkaiPymCiGd9BQXGW3VUOtXeWOwGHcdp0XY8AgSggD1PQQQrhgCI37olIwGTYXhnnYlYuLebZ7HWdEOKjhU1lEyRpKaLGVR6v4fb6dU+T9gxHSd52XXUg4SGAFB8BQ1CoAANkK3CMNgIpvYmHn-mm31CTTf304Dg4g499DgyqujQwlQzjUePizNQzqRLlt4LA4cyLdZVEpDCSKE-sdYZD4JPcTtIsCQ1E4iVIEAQEQ6D0EzvJ3dQoPPa9XHbcLn2i4JjU0677uezL-sK5DStxfhGqq3DNY+DE3bhLqKSuAjDZYzj1YnjsC22WMtvBzVFNfeHzvNVHHtezdLNsxz3PoLzFD825QvV15YdO35Ddu03sdy-HZhQ0nOkw6nyXOnYpaUd2Li5blDZGyiJtPgjt7tpbxoHJX728TXg8HTTzSoBAsbe1G-svQLQen7tlNixHoHX7fgbA3HENT0TrmWeKtDx2WYtQcs5kyx1lYo2Y22MnDF3xn4dsjgT593JgPR2l8v43zvi3VmjB248z5s-KqmCz7YP2tTPBP8WR-wngA0Q09gGjVhhCBY4Ql6ow7HMGwOsZjHjojYU2e9dRaDsKjVG0QMFkyoXtKm4tQIBXEjwRgTNlYp0PNnViWsTzjDLs6OsVlt6SJtJEc0M0ZrlkcG2ORPE361yHodVRMEu6aJzGqUB+ls4sVLDYfY2MDiWMkfeSyS90gIwEVA1IKQHH21Djg2h-lGgEMuLde6csn693kU4i+KTmokDSb-S4sswbMNYd47R+lwEuEgZImaDZfDRBYnRSsT4ZgG2WOeSiNtNov0ofk5JyjUlgHSVQZmRD2Zc1Id3chpNHEOxoaMopJSGFlP-orHQWi9JqwWKkUsUwGzTEkeaBG4SSxbCCQEU0NYAgJJDr6KQAB3MgIJRBQCII0dAFAQjvFUMoN4w0Z7sPnkWOYExqzrwNs6fY7S6yTBrBiKsKU-EugGRQvJKZXnvKwJ875YBfn-OnHOeQC4NKrg3FuHcoK56HmLNCYqBwTR+DrO2LeRYOwTHcJ4W5UxyyREef3agigICc2kqSrClK1xdVpWw+lvjYHPmxpvBYs1Ub3h8DqagC1aypANpZbsLljiDOxXxNxRBPJBSklOWc0qYrUu6rssacNGWFQWFRXwbg16ausgsHlt5lgBEkRWZiwqsEtTUdatq0kXUcIiCEmElkdh6wxOje87h6mVlrClbwgrir9NNVipZFqxIwRjcFONXj4o1LVuMGYz5comUCVEDGmaMTOBMhkU5dzGkRoUbQMQ7sJREAAOqMCgg9L5McGhNAkPG8FqJxgxDbBZNFFYth5QfGkM8dlTl+G5SlE1bozWlt9EO0QI7LhEFoAyAgBA2Bjzna8RdYCzldt2JRARBpwiZpMrqssZEdY6wrHMAdu1L3XqYKoaZz6XiSDffpHU3ZdU5RaaIg4LhwmWN1dCsYPqxhxAHbk0V4rJX2vJdhTSTr5XVL2W60NurAk9rRQ4bhnKEDVh4Skea8Q4j0WmCRwW1DAy5KtU1TJ0ZYwLLtqSUj78iDiakE1JDasqJ2Ugcc3tlithViWseM8bgGzmg7PRDaxbFlJgU7XZTkmpVUZlbR1Qam4bWNxqBm8CMMQHsuTx1Idz3AcqE5iqz8mROKJZHZmmlqVPcmQINRQzBerKEUOhSKHRfgxVcxCBGEwbw6mSOkE0dgBGmPyhWLWhpolGgxBiItp6S3WYi4p6LKjy0Sfi4l5LtBUtyU+D8eQKk1Iypy4gHOurTSiPYsaAId5jZAaq6VqitWEiiOE2ayLSmROdfa4FOLk5aAAGlFCCAwiQVLyAZxjZshiJw4xsYLFK24AmBnOnGb2AfY8sjQtydKDZsObX-IdYO2YCQCXUs9b6xhOQjnst0p8ep9shVSsI2dPYbVRpt30UqzMZbGO6vrd+1XGgpHLXidjQuhHda4YWX0aZSFoiUX3jSEvA1pWj7eGiHiSzf3ScRfJztynGga3JwYxCDWiNzQ+eNDsFeLPuGlkcEaQJdl2MVWJ6fUjUHBxEG-nfZQXsX2Iep+L-KAHHCXhStEOYlZwnVg9UiXUFk7kLGyPiUQ9AIBwAsOJiU9HXUQgALQHDPOMFKUw-BlkcGvER+XMRGgziYxIGLeck7KDcKoDwrr1AQwHhNqInB7FCQcxE1F7xoi1vWA2HKKwHB541sL-d89Lt8AbfUebjSmiouaCvhy5hbAOEzkypWG9+6eaJj+9cW86LbBY6as1uGmk4-4JXQSUgpGPPYzXQzllKM-sD1qVaZ++MNGz9ltvvtImx74fLyNLL2GzunBr4+RWKZcRLOmAMc+DhP-suI9Sa8rESI5Y1YraIihy4iGsqa8Q2MEGe+U+w8ZIo8Mc-utaZuheM0k2GsFkrGli8C28P6Zs2M0BcwsBGuaer8CBdcSB+upSVAf+acswiMsubKJkfSvgEBS8UBpyZBAQFBjefOCi7+uCLsTURAPsYAjByUxU9SxqPaOmDY5WNkyM+WN4M0NYZY6QSI8BSSKyB+Dc4hrcjAkA0hiAVYcwWsQB3YqKrEyQEB9SbeyMUi2qgSJ6r+kaIhhSUa7iGiaBYugeEQcQNoGcCQcwl45oOs7SOwaGuiOs2q7Yfguh58IyBhYE6yv+6BgRqIswT4NelEeavaf61kvauqUiXCJkewoiqegh6eu0uKHyXyPyfyZhNka8NoGmJs5Ya0duxsrg0IrKUQGsMwRqAhHhCiYqEqrRZY7eJ43OVEshGQWqCQk2aCSelEzhyR1IsW44sarROolkpYqQpmAiD+Ooma2qKOOcZY7giCUiWxdAw6uuE6FAU6BKs6eeWRBeQ+9S8wpyLEK6I+82KIGc9SyM3Chq7Y1YrgDxOuo6d6D6T6HxjQ4g0xrgFiemyMdyFY7gmahy2crhSIr4gSsJTxo6sGbM8GKJ6A+x+wjEWwAQhoxUoi26-xkC9gBsGQ5mbYXgG2WKrRNYKO7gOopWRopoGcwJiA8wiMA+2clEhaqMfJpMZGUxXxrevg0I8QSICQt4Ow3YCuEw5mjgAioSiRSpP4W2QOqcYKh4AG1WaOopmOuUCKTgGcM0DEwpmU5pxIlpO2oORSIOTUrR3meGhazEpoDkdESIT47E1slYhk3Y3phAvpZ6-pZI4hkh0xxUzgbYKQcQjgBsrE2GxsgSEwUwLE8Z+aAiSZRQPh22Z6exaptpTgUicIc2o+mIWqHYMI+8+wy+bgUwNZ1IcJN6dBLIhuzw1J+xW+toiQHYNYo+bg7SuouMiQwx8Qc5eI2QQAA */
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
      description: `Messages incoming from the parent machine are recieved here.`,
      on: {
        ADD_ITEM: {
          target: 'Sort Messages from Parent',
          actions: 'sendCartItemEventToParent',
        },

        UPDATE_ITEM: {
          target: 'Sort Messages from Parent',
          internal: true,
          actions: 'sendCartItemEventToParent',
        },

        REMOVE_ITEM: {
          target: 'Sort Messages from Parent',
          internal: true,
          actions: 'sendCartItemEventToParent',
        },
      },
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
              target: 'Send Cart Working to Parent',
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
              target: 'Send Cart Success to Parent',
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

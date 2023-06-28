/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */

import { createMachine } from 'xstate';
import { Cart } from '../../../types';
import {
  AddItemCartEvent,
  AddItemCartInput,
  RemoveItemCartEvent,
  RemoveItemCartInput,
  UpdateItemCartEvent,
  UpdateItemCartInput,
} from '../storeMachine';

export const cartMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHkAOAXAlgW07LAxgAQDCAhgE7oDEAqgAoAiAggCoCiA+icwEqsBtAAwBdRKFQB7WJiySAduJAAPRACYhagJwA6IVrUBmLQA4A7ADYtARjMBWACwAaEAE9EAWmtCHOtRYcTO2sHWzs1awMAXyiXNCxcfExicipqXnYAWWQANS4AMV5kTO4+QVElKRk5RSQVRGsrXTMghzNDNTtDaxMgl3cELx8-AKCQsIjo2JB4nDxCUkoaZkZGTlZkUv5hMTqq2UwFJVUEcd8LE0CtM0iLNQcHO37Pb19-QODQ+0m1GLiMOZJFJLHTMWCueQEHTsZRgAgAV3QYCIZHBkJRBBq1AgCjAOnwZCROlmiQWqXQoLRUJhcMRyNREOIZExh3kO0q0gORzqJ06ah0JkMdi0DiE1mMoTsmmeCE6WiEOkCly6lm8kT+MwBpOSiyolMZ0NhCKRKKpGKxOPkeIJRJJ8x15P1kMNtJNDPRzJqAmsuwknJqxwa0rc6kMQjMOjMaiCNmj+gs4Q1dqBuopYINNON9LNntZ1AAyuwAHJrDZbVicACKtHYNfZe39rMDpxu1h0PSF3haYdMWhlGgc-NFg7DAUMw5MSa19uBevTzszdNNjPNrJ0JAAFnCANZESvwsAH6jMfMATSLJE4K1Lmx42wqDeqTZ5DTsvT0dwuUsehm6zhDsqWAqDwhEKb5mA4FgQVOCQzqmTrUkaS7ukyLIKOuW4ELu+6HmAx5nhenAZNkeScIUxTlvWfpPtyoAnNYb4mB+-hBD4XR-v2bRMV0XRNN44QODBgJkiC86Ia62Yrrm6Gbjue4HkeJ7npeDAsBwlEPtRXK1HRr7vkIn6sT+HEAf4kSKr0g7hLYoTjkJ2qzmmVIulmy4emh8gYXJOGKQRl7VrWXAAJL5pwWT0Kwp5USA+wBi+pyMcxX5sb+IT9jYFg6DYJhCHYLQ3JcWj2XBjpiS5yE5h5Oi8GA2CSAAbsiABmFCSNgqbYriOiYPI9WSNueLJiJc7OYubqVTU1W1Q1zWte15IID1fUEISrI7NFsXPrpsohNxbQ9EIJjysEFicTcOhhr04bypBmjFSmpWjUh41SVVNV1Y1RAtW1HVgBQrUUDoqAADaEk1kgUNgxLTg9olPRJbmoZN70zV9c2potvWSCtXqiBtja0fUO2BDojgFYdx2NJxRgCodvQmJ0kFqGY93DU5GbPZJ7mTcwEAQEQ6CSB1lp4kt-WDTDbMIeVL3c2uvP84LGNizja145pMUEzpRMRCTZMHUduVU6Z9iGH4DFCIdxgDloFisw6cMcwjKGruhCsC0L5LUH9ANA6D6Dg5D0OwbDI1O65LvSZ57tKwtKurQo60a5thO8rtpP7Tlhsnf2Zi5ZGFu9BBGj2PbjnS2NXNI2utCoBAhLIl7IvdVjA3B8JDthwunOI67nm1-XJpx1jquJ+rvqazR2tp3rmcU0bp2mRY1j8mZZjtL+LRqL80xDZ37Pd87E013XDe-f9EN+2DENQ3v5dlZXvdRzoA9n8Py0J2y48clPza63t5Ns7GwGJ0AIkZl5BEMBcFobQy7wQfj3SOVVZJYS+hDDq+Nf7xTzroWw1xDBmC0L+BwRD0qHR0BYMUBD9CaHHHYOwcDHrhwqq9SaKDdyBwwT6H+2lmw4PbIQ9ohDiGkJNuEds9w85QJMNYFeRVd6S33hXRBx8ZIUDAG-JYnUrQtz6m3O+8D4YR1UZ5Eg6jNFUExh-XGIhMG8PiivAy7ZDCXEtsvBitg1C5wYllCw3QtA2Egr0O2CiQ5SwQUfVha4zEaKHlon2l8QbXyDgYphh9jFRLUbExuSwrHY0-knCeKdp4NC7AKeUX5QF+IYv2MMvh6HmCIcvGwUDGGO2dMwAA7mQA48goBEHUegCgrh0jsFYLwKKyctZ-3EYKYUopxQigtl40yxhdCjGFL0KBkRYGhI7vfZyXSelYD6QMsAQyRmFhLOsW8ZQqw1jrFMrB20+QCiFCKKhSypQrJAW0fkwodkkIMBBQwbSu5QiChAYGeErk3nLPcwKdi4rbQOoqAJATjC-gMD4Ew-YEy6AcN0Sw45jCyLBQfKE7CiBiXkrhAsxY4V3grAFR5RTpkOKCGiyhfiRRGAiBBGUjQHjtgCdddo1ShTkullSmlPk8JIq2kTQcuhOiWzYn4hm-hBWtAoblahQpLaChCf8MJSiyoyrNHK6g3o2XPKVdoPwUpLaPA1dvReAxbBCgoaK7eNgAntClXfHQkLoX0uuWWJlCLWU8ORUTRZTFcqQXlP4MMPEZS9FwfKKMDwAimFaXshy8Eg2PwMcwDy2jrToAbu3Qtjpi091LR5BVqcGgELbKKX1MioFaGCD80p5kpGCKdS4-NJr9lFsUeJVyjasSwpufCll7Bm0lIQHnJiRgfBtFFB0IlMpgh2FJjlcIUFHD6G6IGydMtkQzuiZhXcZasTIAikFTIIVWBBRUkwNgXAmXLubJKCh0ZBQdCggEIwgqhDdEVKKU2mht5dAvaaqdS4b0yTvdS8tT732vvzO+y8xFcgFCKCUX9Tz7HbQA3cLZIHLAjkFSvCMR0XE3EsPccUDCC0lRBPWhGqHTHoYfXmfMABpIK9ArwkHfcgIsf74qUaA7+fwtHwMARXvcC6SbjqaDyoJTjocKQ8enZOjDbCBOYefThvDV5VjztI7a8jSqfFUeA0psDhh03visOGe4kESFGsQ-sq9RA+PQzAPIDBZHY0nAMAezQ4rN3jisGYGULT2xQQ6Asy2tGAsOS8qggxVrZPbW6Ae2RxcZG+e0MlgCwRmi9GCD0LeUCWZ6alkGqlBWFLyu4Y+Bz9FmaKm6L+TQMj9Cinda2khH5bDeHuOYG4MRpjyEkBAOAShUlLBjYqk4Xg+yqbAWTNoY3tCyMaFKsSW2W2yj2x6+hmUmgGWjK8KU8ix21vach2W1dCbFObE6rKBgegRGjDdG76h+V6HApYKwHQA2tbNUYlhcs0PeS65dld4oIiRnHI8My3gfATdlCYC4IwcqHUCFAgI53Edfb7lND6s0frknR82RrZsSE+fXjcbewD1CPAPTxP5kEow+FBfDg5zDafPxjp7TbvWosNCOkxCC69TCgO8AmXOBDoONCjD2yC+7qeS6rnT1+cSqAs45T2vwR1mbXDK4KXFplhSZSVNbW2Qojq6be1x8FQWkE8w8kQEWluXmErbHlXKGhKHvGqyAqMAvQgfGFAOawRv0lI++9HIPCT1EQFDzrcPpM87hAMpoAIcf1DhGaLIiwEDhHBHT59k3z8qWcOZ-L7biBHBMQCREBmK9DYkLIcBccBUGKOGjBxn3+nlGROR6Y8x5v0AF5OOYfkYo7D4tTcKUwud-ACgghcUIu087e81EhwxBojm9P6YM4Zq-EAGE4qYUmyUj1EPXsai-460kQqhWAI-ggNcHigzFlFbP4FKDpoSk3nlvepamjp3lduvIKhBAegmJMJcLRtBOLhOkhkAQ6rIjulGPcAEOxn2rKOIj4EfpEG+EqOGDljOMGgAUAY0BoN6uKMTkXGwU8KpivG2BoC4tGIOCxi0IwUCEFnxkAevO2JjgQtvL5uxummKGllGCOrVh0OIYQJIcZoJijqgnodrL9g4p0LIcQQoWQUKCliEBdJ4hisXHlFockDoZfoYaCEHiHkgRjpBgqEQf4r+BgT2hBsYIqOlpEB4irtPj-u9nqIZihroVVGgGFqmNIV6iQXcN0Jjj4GDggPTBQlBJ0OEFziKC1jPm1peh1sZnKkAfKGYUYCQYoVYQBFihnBBI8D0J4r5otlEEAA */
  id: 'Cart Machine',

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

  states: {
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
          description: 'Check if there are any items in the optimistic queue',
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

  on: {
    ADD_TO_CART: {
      target: '#Cart Machine',
      actions: 'sendAddToCartToQueue',
      internal: true,
    },

    REMOVE_FROM_CART: {
      target: '#Cart Machine',
      actions: 'sendcRemoveFromCartToQueue',
      internal: true,
    },

    UPDATE_CART: {
      target: '#Cart Machine',
      actions: 'sendUpdateCartToQueue',
      internal: true,
    },
  },
});

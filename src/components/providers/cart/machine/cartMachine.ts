import { Cart, CartItemBody } from 'types.d/cart';
import { createMachine } from 'xstate';

export type AddItemEvent = { type: 'ADD_ITEM'; input: { item: CartItemBody } };
export type UpdateItemEvent = {
  type: 'UPDATE_ITEM';
  input: { itemId: string; item: CartItemBody };
};
export type RemoveItemEvent = {
  type: 'REMOVE_ITEM';
  input: { itemId: string };
};

export const cartMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAnALgOlczAlgPYB2sAxAIIAi1A+gJIAqAogLIDaADALqKgAHIrAKFS-EAA9EARi4BWAMzYAHFy5qAnACYALOt3z5AGhABPRLp3YAbPJvaA7DPk6u2+4oC+X02iy4+MRk5ACqAArUlKyMrJy8EkIiYiQS0ghyiprYmiq6+tqKXDYymo6mFghZNthcjioy2lyKpS26Mj5+GDh4KRQASuwA8gBqLLHs3HxIIEmiwWmy7srLus6OJYoqeRWI2prZVgc2mly6NjbuNp0g-jgAjgCuYM-YYJJgyI+EJFAMmGAALbkCCkMDYWCYVAA7B3bBPF7g96fb4EX7-IFTRLCebiGbpRRKVSnByaGxWdraFS7DLk5SORRrfQyRSEjzyG5whGvZFfH5-AHAmj0ZiTBIzOYpRa0i62RRUpwqGwqTRbXQ0lntbAMwzaGxZBQuTndeHPHkfPlogVAsKRaLjUXxaaCHFS-GyOzaHKKRzyFmKOzyJrU8yyLJewqGTylVx2Y0BblIi2o9GC8iDNijB1xLES10Ld20v21FUqVwyXQtZoa-JenXyJV6JX1bTxh5mpMo-kY4G5l3JAugdJyGSOWxcTT6ew2DanTQ0zSlbWM3R6PQT9oqNumxFvZPdtMcGTO2b5vFDpaj8eThQXWcTjWFQ55JQtFnyZqt3y3E2Jvddq0e3IDhtBPSVBykS8x0uG9p3vedQwyf0chfJwlEcdp5W3P9eRTa1AVwCAICYIgAGFuhBMFsDRAA3IgAGtwS5Dt-0tVMgUI4iyO6BBaKINAUimPtTwHc9INpKlsBZKkMNXIxCXVRDVWUSMsiOY4nGwljcIPDjUCIkjyKwcgwHQdAiHQbABAAG2hAAzCyCOY3cdMAwVOMMni+IE4IhPFftcVSQtLl0Wp1HUD9V0yGwNVjbBIxObYK1VZUtJc-c3I4x4BAgaEwCMzBKJIcE+MY2Ff20jL2II7LcoBAreJIOifNIPywLPIKLwklQpPlFRZPZBSNXcHrIzWDYfQrNLzQA6rsFqvKCpMsyLKs2zMAc9AnIq9LZvw+acsWrymv46FfN4YTwLE9IHFC8KIrObRotirgZHixkShKRxvtcLdv2cma2P29AgSIGiwAAMXMwEltBYrqJOsqAc7IGe2wEHATByHoYa7yztai7-JEwLpRkBweuk-ra3k+RFMqXIuGXfIAxaMs-W8f6dsBvC0YxrGoaIGGKNM8zLJs+zHPKhNKr23nQfBgWhawRrmvxkg2uxUTOvEko7vuyKnuaGLEJcXQep1OwMLJRk-q6aXd2QAALT56MAuymGdkHKBBtgLLAHsKGFCYnU1knCwreRtRkKnF0KIMfWN+no6Z-JvrWEp9mmpjneQV30Xdz2wG9sBfZBgPbSiGJHUujrSflWpVPOJo5H1GklVGldRwaMsWg5Tn7deJ2Xbdj3TKLn2-fLjMs2DmutbrxnR3kepmjKZUy0TxAGjHHUtnqFVDCz2Ec7zv4C7H4vS-9wUKDnsOusJZQVWKfZyUnRoQ0qNQIxXNd9EnL8dt2wOxPiPQul9J432AseUOboH5EmfqSN+lJP6IDKMoM2+QTiansKuI+QIBCYDMFQWgs8iZXW1ukZwjMNi4KDA2KwdQFxNBThWRw+xTj9XwYCQhxCIiV2zGKdq89CzUO1HYck9C8inHKEpZw718hYIbAcdw3DeHpmGGMMhwj77iTEbQyRHhpFMJNu4N6OomQNjUM4a4-dgGvFQAAd1QPMX4-QwCYHQMQwYTB+gAE075wJ1mcMK4UDbPVMewhRkU-TOFfEfJxLj+TuM8cQoO1dyG12ChWUJD0opGw1I0OsjIlCKIcB9BJzjXFQBSV4iu9ptGwIgjdPQuSFCPQiZUGQo4VIlLpL6FotigE7gcVU5JHi6nTy0RknRQSWl6zCR0gpJttCFCZq4SsZwsjfW3JCaEjxYDUQgNZMA5AWD9H6EMfodAmAAAlLkAHUABygTmmyDyNgc4-UjBGNWQcbQNJgw5AOKqRcS8npTRuCQIgEA4ASDuE066iAAC0egaSooWXUGc3SNCam3L0YI8A8wiK6t05QRQywqEJMvOoGETCIQ2Qo1cVJyQMmcFnRFlC9gIUqCcGoDQ9QXFpqyBsHQ7EjJRjzQUnLpRkmyDBKcd4TgPkQvUUKLRBVUrUlSMVwycJVX2vpLiBUZXh32D1H5LJNANkcAoZwbdJyfLyO0Uom59S2x-APSVukaqHXqt0U1pL9ihQVcGvIGgAyPhyZGIMuLqb4INXLTGCscYBuJbo4c+xlDkmKDOV6JJ2GFI0OslwhQtVBgTbLdysBHjIGQHAIlAU5myFBbYaMCpWTqE3hkV6oVMH5AOB+AMxQj5D1zmAi+E8y430DXo2R9MMJMu+jOC4k5dBqKIbO9IfpsgjnsD8kkSgFxmyZfYKltMlSVKSVaWplQm1vKqAgkkr8KQf0fMWhKxQzYaFVH3YZezMAHK3XsOmiB9SfJBVTTYM5M7ioAwco5JzgM9sZmSKm8p1DbO+oCicEGDjsPfKs2muyoSAcOTWutDbkOFpNsWe6Gg9AuHoSR-ZhyRYWWQz6bN1rBkDuKCYyoTRDggoI2yDwh9xX6qrRxYqjiAAEAGwByZkLOzARABBb3kQKvN74rAhhOXZTAsgKxeipSUXTKhFSyIAEZEEwGpwEaClzadtbp3Iph0AECgI7IzGQ9SmYDGSi9VnTCOIIBATAjtZBNFMM7LzPnLAhmHCZ1QgWLMhcQv1N6LnXoKVyD4HwQA */
  id: 'cart',
  tsTypes: {} as import('./cartMachine.typegen').Typegen0,
  schema: {
    events: {} as
      | { type: 'ADD_ITEM'; input: { item: CartItemBody } }
      | { type: 'UPDATE_ITEM'; input: { itemId: string; item: CartItemBody } }
      | { type: 'REMOVE_ITEM'; input: { itemId: string } }
      | { type: 'RETRY' }
      | { type: 'ERROR_THROWN' },
    services: {} as {
      executeAddToCartFromQueue: { data: any };
      executeRemoveFromCartQueue: { data: any };
      executeUpdateCartFromQueue: { data: any };
    },
  },
  context: {
    cart: null,
    workingCart: null,
    status: 'idle',
    queue: [],
  } as {
    cart: Cart | null;
    workingCart: Cart | null;
    status: 'idle' | 'working' | 'error';
    queue: Array<AddItemEvent | UpdateItemEvent | RemoveItemEvent>;
  },
  states: {
    actions: {
      on: {
        ADD_ITEM: {
          actions: ['pusAddItemToQueue', 'addItemAndUpdateTotals'],
        },
        UPDATE_ITEM: {
          actions: ['pushUpdateItemToQueue', 'updateItemAndUpdateTotals'],
        },
        REMOVE_ITEM: {
          actions: ['pushRemoveItemToQueue', 'removeItemAndUpdateTotals'],
        },
      },
    },
    queue: {
      initial: 'checkingIfThereAreMoreItems',
      states: {
        executingItem: {
          states: {
            addToCart: {
              invoke: {
                src: 'executeAddToCartFromQueue',
                onDone: [
                  {
                    target: 'success',
                  },
                ],
                onError: [
                  {
                    target: '#cart.queue.awaitingRetry',
                  },
                ],
              },
            },

            updateCart: {
              invoke: {
                src: 'executeUpdateCartFromQueue',
                onDone: [
                  {
                    target: 'success',
                  },
                ],
                onError: [
                  {
                    target: '#cart.queue.awaitingRetry',
                  },
                ],
              },
            },

            removeFromCart: {
              invoke: {
                src: 'executeRemoveFromCartQueue',
                onDone: [
                  {
                    target: 'success',
                  },
                ],
                onError: [
                  {
                    target: '#cart.queue.awaitingRetry',
                  },
                ],
              },
            },

            success: {
              type: 'final',
            },
          },
          always: [
            {
              target: '.addToCart',
              cond: 'itemIsAddToCart',
            },
            {
              target: '.updateCart',
              cond: 'itemIsUpdateCart',
            },
            {
              target: '.removeFromCart',
              cond: 'itemIsRemoveFromCart',
            },
          ],
          on: {
            ADD_ITEM: {},
            UPDATE_ITEM: {},
            REMOVE_ITEM: {},
          },
          onDone: {
            target: 'checkingIfThereAreMoreItems',
            actions: 'removeOldestItemFromQueue',
          },
        },
        checkingIfThereAreMoreItems: {
          always: [
            {
              target: 'executingItem',
              cond: 'thereAreMoreItemsInTheQueue',
            },
            {
              target: 'empty',
            },
          ],
          on: {
            ADD_ITEM: {},
            UPDATE_ITEM: {},
            REMOVE_ITEM: {},
          },
        },
        empty: {
          entry: 'assignCart',
          on: {
            ADD_ITEM: {
              target: 'executingItem',
            },
            UPDATE_ITEM: {
              target: 'executingItem',
            },
            REMOVE_ITEM: {
              target: 'executingItem',
            },
          },
        },
        awaitingRetry: {
          entry: 'throwErrorMessage',
          on: {
            RETRY: {
              target: 'executingItem',
            },
            ADD_ITEM: {
              target: 'executingItem',
            },
            UPDATE_ITEM: {
              target: 'executingItem',
            },
            REMOVE_ITEM: {
              target: 'executingItem',
            },
          },
        },
      },
    },
    status: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            ERROR_THROWN: {
              target: 'error',
            },
          },
        },
        success: {},
        error: {},
      },
    },
  },
  type: 'parallel',
  predictableActionArguments: true,
  preserveActionOrder: true,
});

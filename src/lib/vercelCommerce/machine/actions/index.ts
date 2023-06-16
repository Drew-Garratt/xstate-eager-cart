import { type Simplify } from 'type-fest';
import { assign } from 'xstate';
import { findLineItem } from '@/lib/commercejs/utils/findLineItem';
import type { StoreMachineOptions } from '..';
import { optimisticAddToCart } from './optamisticAddToCart';

type Actions = Simplify<StoreMachineOptions['actions']>;

const addSuccessMessage: StoreMachineOptions['actions']['addSuccessMessage'] =
  () => {
    return null;
  };

// Assign the error to the context
const assignError: StoreMachineOptions['actions']['assignError'] = assign(
  (context, event) => {
    const errorArray = context.cartContext.error
      ? [event ?? 'There was an error', ...context.cartContext.error]
      : [event ?? 'There was an error'];

    return {
      ...context,
      cartContext: {
        ...context.cartContext,
        error: errorArray,
      },
    };
  }
);

const addActionToOptimisticQueue: StoreMachineOptions['actions']['addActionToOptimisticQueue'] =
  assign((context, event) => {
    return {
      ...context,
      cartContext: {
        ...context.cartContext,
        optimisticQueue: [...context.cartContext.optimisticQueue, event.data],
      },
    };
  });

const addActionToAsyncQueue: StoreMachineOptions['actions']['addActionToAsyncQueue'] =
  assign((context, event) => {
    return {
      ...context,
      cartContext: {
        ...context.cartContext,
        asyncQueue: [...context.cartContext.asyncQueue, event.data],
      },
    };
  });

const removeOldestFromOptQueue: StoreMachineOptions['actions']['removeOldestFromOptQueue'] =
  assign((context) => {
    return {
      ...context,
      cartContext: {
        ...context.cartContext,
        optimisticQueue: context.cartContext.optimisticQueue.slice(1),
      },
    };
  });

const removeOldestItemFromAsyncQueue: StoreMachineOptions['actions']['removeOldestItemFromAsyncQueue'] =
  assign((context) => {
    return {
      ...context,
      cartContext: {
        ...context.cartContext,
        asyncQueue: context.cartContext.asyncQueue.slice(1),
      },
    };
  });

const assignCart: StoreMachineOptions['actions']['assignCart'] = assign(
  (context, event) => {
    return {
      ...context,
      cartContext: {
        ...context.cartContext,
        cart: event.data.cart,
      },
    };
  }
);

const addToCartContext: StoreMachineOptions['actions']['addToCartContext'] =
  assign((context, event) => {
    const cartContext = context.cartContext;
    const cart = event.data.cart;

    /**
     * If there is no cart in the context return early
     */
    if (!cartContext.cart) return context;

    return {
      ...context,
      cartContext: {
        ...cartContext,
        cart,
      },
    };
  });

const updateCartContext: StoreMachineOptions['actions']['updateCartContext'] =
  assign((context, event) => {
    const cartContext = context.cartContext;
    const cart = event.data.cart;

    /**
     * If there is no cart in the context return early
     */
    if (!cartContext.cart) return context;

    return {
      ...context,
      cartContext: {
        ...cartContext,
        cart,
      },
    };
  });

const removeFromCartContext: StoreMachineOptions['actions']['removeFromCartContext'] =
  assign((context, event) => {
    const cartContext = context.cartContext;
    const cart = event.data.cart;

    /**
     * If there is no cart in the context return early
     */
    if (!cartContext.cart) return context;

    return {
      ...context,
      cartContext: {
        ...cartContext,
        cart,
      },
    };
  });

const optimisticRemoveFromCart: StoreMachineOptions['actions']['optimisticRemoveFromCart'] =
  assign((context, event) => {
    /**
     * Cart Context
     */
    const cartContext = context.cartContext;

    /**
     * If there is no cart in the context return early
     */
    if (!cartContext.optimisticCart) return context;

    /**
     * Shallow copy of the optimistic cart
     */
    const optimisticCart = { ...cartContext.optimisticCart };

    optimisticCart.lineItems.delete(event.data.itemId);

    /**
     * Product ID
     *
     * This is the product ID of the product that was added to the cart
     */
    const productId = event.data.itemId;

    /**
     * Find the line item in the cart
     * If there is no line item return early
     * Otherwise destructure the line item and the line item ID
     */
    const cartLineItem = findLineItem({
      productId,
      lineItems: optimisticCart.lineItems,
    });
    if (!cartLineItem) return context;
    const { lineItemId, lineItem } = cartLineItem;

    if (!lineItem) return context;
    if (!lineItem.variant?.price) return context;

    optimisticCart.lineItems.delete(lineItemId);

    const lineItemPrice = lineItem.variant.price.value * lineItem.quantity * -1;

    optimisticCart.lineItemsSubtotalPrice =
      optimisticCart.lineItemsSubtotalPrice - lineItemPrice;
    optimisticCart.subtotalPrice = optimisticCart.subtotalPrice - lineItemPrice;
    optimisticCart.totalPrice = optimisticCart.totalPrice - lineItemPrice;

    return {
      ...context,
      cartContext: {
        ...cartContext,
        optimisticCart,
      },
    };
  });

const optimisticUpdateCart: StoreMachineOptions['actions']['optimisticUpdateCart'] =
  assign((context, event) => {
    /**
     * If there is no quantity on the item return early
     */
    if (!event.data.item.quantity) return context;

    /**
     * Cart Context
     */
    const cartContext = context.cartContext;

    /**
     * If there is no cart in the context return early
     */
    if (!cartContext.optimisticCart) return context;

    /**
     * Shallow copy of the optimistic cart
     */
    const optimisticCart = { ...cartContext.optimisticCart };

    /**
     * Product ID
     *
     * This is the product ID of the product that was added to the cart
     */
    const productId = event.data.itemId;

    /**
     * Find the line item in the cart
     * If there is no line item return early
     * Otherwise destructure the line item and the line item ID
     */
    const cartLineItem = findLineItem({
      productId,
      lineItems: optimisticCart.lineItems,
    });

    if (!cartLineItem) return context;

    const { lineItemId, lineItem } = cartLineItem;

    if (!lineItem) return context;

    if (!lineItem.variant?.price) return context;

    optimisticCart.lineItems.set(lineItemId, {
      ...lineItem,
      quantity: event.data.item.quantity,
    });

    const lineItemPriceAdjustment =
      lineItem.variant.price.value * lineItem.quantity * -1 +
      lineItem.variant.price.value * event.data.item.quantity;

    optimisticCart.lineItemsSubtotalPrice =
      optimisticCart.lineItemsSubtotalPrice + lineItemPriceAdjustment;
    optimisticCart.subtotalPrice =
      optimisticCart.subtotalPrice + lineItemPriceAdjustment;
    optimisticCart.totalPrice =
      optimisticCart.totalPrice + lineItemPriceAdjustment;

    return {
      ...context,
      cartContext: {
        ...cartContext,
        optimisticCart,
      },
    };
  });

const assignOptimisticCart: StoreMachineOptions['actions']['assignOptimisticCart'] =
  assign((context) => {
    const cartContext = context.cartContext;

    /**
     * If there is no cart in the context return early
     */
    if (!cartContext.cart) return context;

    return {
      ...context,
      cartContext: {
        ...cartContext,
        optimisticCart: cartContext.cart,
      },
    };
  });

const clearOptimisticQueue: StoreMachineOptions['actions']['clearOptimisticQueue'] =
  assign((context) => {
    const cartContext = context.cartContext;

    return {
      ...context,
      cartContext: {
        ...cartContext,
        optimisticQueue: [],
      },
    };
  });

const actions: StoreMachineOptions['actions'] = {
  removeFromCartContext,
  addToCartContext,
  updateCartContext,
  removeOldestItemFromAsyncQueue,
  addSuccessMessage,
  assignError,
  assignCart,
  addActionToAsyncQueue,
  addActionToOptimisticQueue,
  removeOldestFromOptQueue,
  optimisticAddToCart,
  assignOptimisticCart,
  clearOptimisticQueue,
  optimisticRemoveFromCart,
  optimisticUpdateCart,
};

export default actions;

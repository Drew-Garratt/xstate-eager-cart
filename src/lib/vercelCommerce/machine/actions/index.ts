import { Cart } from '../../types/cart';
import type { StoreAction } from '..';
import { assign } from 'xstate';
import { findLineItem } from '@/lib/commercejs/utils/findLineItem';
import { defaultCart } from '../../utils';
import { optimisticAddToCart } from './optamisticAddToCart';

const addSuccessMessage: StoreAction = () => {
};

// Assign the error to the context
const assignError: StoreAction = assign((context, event) => {
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
});

const addActionToOptimisticQueue: StoreAction = assign((context, event) => {
  if (event.type !== 'SEND_TO_CART_QUEUE') return context;

  return {
    ...context,
    cartContext: {
      ...context.cartContext,
      optimisticQueue: [...context.cartContext.optimisticQueue, event.data],
    },
  };
});

const addActionToAsyncQueue: StoreAction = assign((context, event) => {
  if (event.type !== 'SEND_TO_CART_QUEUE') return context;

  return {
    ...context,
    cartContext: {
      ...context.cartContext,
      asyncQueue: [...context.cartContext.asyncQueue, event.data],
    },
  };
});

const removeOldestFromOptQueue: StoreAction = assign((context, event) => {
  return {
    ...context,
    cartContext: {
      ...context.cartContext,
      optimisticQueue: context.cartContext.optimisticQueue.slice(1),
    },
  };
});

const removeOldestItemFromAsyncQueue: StoreAction = assign((context, event) => {
  return {
    ...context,
    cartContext: {
      ...context.cartContext,
      asyncQueue: context.cartContext.asyncQueue.slice(1),
    },
  };
});

const assignCart: StoreAction<{
  event: string;
  data: {
    type: 'CREATE_CART_DONE';
    cart: Cart;
  };
}> = assign((context, event) => {
  if (event.data.type !== 'CREATE_CART_DONE') return context;

  return {
    ...context,
    cartContext: {
      ...context.cartContext,
      cart: event.data.cart,
    },
  };
});

const addToCartContext: StoreAction<{
  event: string;
  data: {
    type: 'ADD_TO_CART_DONE';
    cart: Cart;
  };
}> = assign((context, event) => {
  if (event.data.type !== 'ADD_TO_CART_DONE') return context;

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

const updateCartContext: StoreAction<{
  event: string;
  data: {
    type: 'UPDATE_CART_DONE';
    cart: Cart;
  };
}> = assign((context, event) => {
  if (event.data.type !== 'UPDATE_CART_DONE') return context;

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

const removeFromCartContext: StoreAction<{
  event: string;
  data: {
    type: 'REMOVE_FROM_CART_DONE';
    cart: Cart;
  };
}> = assign((context, event) => {
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

const optimisticRemoveFromCart: StoreAction = assign((context, event) => {
  if (event.type !== 'OPTIMISTIC_REMOVE_FROM_CART') return context;

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

const optimisticUpdateCart: StoreAction = assign((context, event) => {
  if (event.type !== 'OPTIMISTIC_UPDATE_CART') return context;

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
    lineItem.variant.price.value * lineItem.quantity * -1 
    + lineItem.variant.price.value * event.data.item.quantity;

  optimisticCart.lineItemsSubtotalPrice =
    optimisticCart.lineItemsSubtotalPrice + lineItemPriceAdjustment;
  optimisticCart.subtotalPrice =
    optimisticCart.subtotalPrice + lineItemPriceAdjustment;
  optimisticCart.totalPrice =
    optimisticCart.totalPrice + lineItemPriceAdjustment;

  console.log('optimisticCart', {
    ...context,
    cartContext: {
      ...cartContext,
      optimisticCart,
    },
  });

  return {
    ...context,
    cartContext: {
      ...cartContext,
      optimisticCart,
    },
  };
});

const assignOptimisticCart: StoreAction = assign((context) => {
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

const clearOptimisticQueue: StoreAction = assign((context) => {
  const cartContext = context.cartContext;

  return {
    ...context,
    cartContext: {
      ...cartContext,
      optimisticQueue: [],
    },
  };
});

const actions = {
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

import { assign, raise } from 'xstate';
import { sendParent } from 'xstate/lib/actions';
import { findLineItem } from '@/lib/commercejs/utils/findLineItem';
import { type Cart } from '@/lib/vercelCommerce/types/cart';
import type { OptimisticCartMachineOptions } from '..';
import { optimisticAddToCart } from './optimisticAddToCart';

const addSuccessMessage: OptimisticCartMachineOptions['actions']['addSuccessMessage'] =
  () => {
    return null;
  };

// Assign the error to the context
const assignError: OptimisticCartMachineOptions['actions']['assignError'] =
  assign({
    error: (context, event) => {
      return context.error
        ? [event ?? 'There was an error', ...context.error]
        : [event ?? 'There was an error'];
    },
  });

const addActionToOptimisticQueue: OptimisticCartMachineOptions['actions']['addActionToOptimisticQueue'] =
  assign({
    optimisticQueue: (context, event) => [
      ...context.optimisticQueue,
      event.data,
    ],
  });

const addActionToAsyncQueue: OptimisticCartMachineOptions['actions']['addActionToAsyncQueue'] =
  assign({
    asyncQueue: (context, event) => [...context.asyncQueue, event.data],
  });

const removeOldestFromOptQueue: OptimisticCartMachineOptions['actions']['removeOldestFromOptQueue'] =
  assign({
    optimisticQueue: (context) => context.optimisticQueue.slice(1),
  });

const removeOldestItemFromAsyncQueue: OptimisticCartMachineOptions['actions']['removeOldestItemFromAsyncQueue'] =
  assign({
    asyncQueue: (context) => context.asyncQueue.slice(1),
  });

const assignCart: OptimisticCartMachineOptions['actions']['assignCart'] =
  assign({
    cart: (_, event) => event.data.cart,
  });

const addToCartContext: OptimisticCartMachineOptions['actions']['addToCartContext'] =
  assign({
    cart: (_, event) => event.data.cart,
  });

const updateCartContext: OptimisticCartMachineOptions['actions']['updateCartContext'] =
  assign({
    cart: (_, event) => event.data.cart,
  });

const removeFromCartContext: OptimisticCartMachineOptions['actions']['removeFromCartContext'] =
  assign({
    cart: (_, event) => event.data.cart,
  });

const optimisticRemoveFromCart: OptimisticCartMachineOptions['actions']['optimisticRemoveFromCart'] =
  assign({
    optimisticCart: (context, event) => {
      /**
       * If there is no cart in the context return early
       */
      if (!context.optimisticCart) return null;

      /**
       * Shallow copy of the optimistic cart
       */
      const optimisticCart: Cart = { ...context.optimisticCart };

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
      if (!cartLineItem) return context.optimisticCart;
      const { lineItemId, lineItem } = cartLineItem;

      if (!lineItem) return context.optimisticCart;
      if (!lineItem.variant?.price) return context.optimisticCart;

      optimisticCart.lineItems.delete(lineItemId);

      const lineItemPrice =
        lineItem.variant.price.value * lineItem.quantity * -1;

      optimisticCart.lineItemsSubtotalPrice =
        optimisticCart.lineItemsSubtotalPrice - lineItemPrice;
      optimisticCart.subtotalPrice =
        optimisticCart.subtotalPrice - lineItemPrice;
      optimisticCart.totalPrice = optimisticCart.totalPrice - lineItemPrice;

      return optimisticCart;
    },
  });

const optimisticUpdateCart: OptimisticCartMachineOptions['actions']['optimisticUpdateCart'] =
  assign({
    optimisticCart: (context, event) => {
      /**
       * If there is no quantity on the item return early
       */
      if (!event.data.item.quantity) return context.optimisticCart;

      /**
       * If there is no cart in the context return early
       */
      if (!context.optimisticCart) return context.optimisticCart;

      /**
       * Shallow copy of the optimistic cart
       */
      const optimisticCart = { ...context.optimisticCart };

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

      if (!cartLineItem) return context.optimisticCart;

      const { lineItemId, lineItem } = cartLineItem;

      if (!lineItem) return context.optimisticCart;

      if (!lineItem.variant?.price) return context.optimisticCart;

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

      return optimisticCart;
    },
  });

const assignOptimisticCart: OptimisticCartMachineOptions['actions']['assignOptimisticCart'] =
  assign({
    optimisticCart: (context) => {
      /**
       * If there is no cart in the context return early
       */
      if (!context.optimisticCart) return context.optimisticCart;

      return context.optimisticCart;
    },
  });

const clearOptimisticQueue: OptimisticCartMachineOptions['actions']['clearOptimisticQueue'] =
  assign({
    optimisticQueue: [],
  });

const sendCartUpdateToParent: OptimisticCartMachineOptions['actions']['sendCartUpdateToParent'] =
  sendParent((context) => ({
    type: 'UPDATE_CART',
    data: { cart: context.optimisticCart },
  }));

const sendCartSuccessToParent: OptimisticCartMachineOptions['actions']['sendCartSuccessToParent'] =
  sendParent((context) => {
    return { type: 'CART_SUCCESS', data: { cart: context.cart } };
  });

const sendCartWorkingToParent: OptimisticCartMachineOptions['actions']['sendCartWorkingToParent'] =
  sendParent({ type: 'CART_WORKING' });

const sendCartErrorToParent: OptimisticCartMachineOptions['actions']['sendCartErrorToParent'] =
  sendParent({ type: 'CART_ERROR' });

// @ts-expect-error XState raise types are incorrect bug is known
const sendCartItemEventToParent: OptimisticCartMachineOptions['actions']['sendCartItemEventToParent'] =
  raise((_, event) => {
    return {
      type: 'SEND_TO_CART_QUEUE',
      data: event,
    };
  });

const actions: OptimisticCartMachineOptions['actions'] = {
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
  sendCartSuccessToParent,
  sendCartWorkingToParent,
  sendCartUpdateToParent,
  sendCartErrorToParent,
  sendCartItemEventToParent,
};

export default actions;

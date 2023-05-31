import { assign } from "xstate";
import { StoreAction } from "..";
import { defaultCart } from "../../utils";
import { findLineItem } from "@/lib/commercejs/utils/findLineItem";

export const optimisticAddToCart: StoreAction = assign((context, event) => {
  if (event.type !== 'OPTIMISTIC_ADD_TO_CART') return context;

  /**
   * Cart Context
   */
  const cartContext = context.cartContext;

  /**
   * If a optimistic cart already exists use this otherwise use the default cart
   */
  const optimisticCart = cartContext.optimisticCart ? { ...cartContext.optimisticCart } : defaultCart;

  /**
   * If there are no line items in the cart create a new line item
   **/
  if (optimisticCart.lineItems.size === 0) {
    const merchandise = event.data.item.merchandise;

    if (!merchandise) return context;

    const variant = merchandise.product.variants.find((variant) => variant.id === event.data.item.variantId);

    if (!variant) return context;

    optimisticCart.lineItems.set(merchandise.id, {
      id: merchandise.id,
      productId: merchandise.id,
      variantId: event.data.item.variantId,
      quantity: event.data.item.quantity ?? 1,
      name: merchandise.title,
      merchandise,
      variant: {
        id: variant.id,
        name: variant.title,
        price: {value: variant.price.amount},
        options: [],
      },
      discounts: [],
      path: '',
    });
  
    optimisticCart.lineItemsSubtotalPrice = variant.price.amount;
    optimisticCart.subtotalPrice = variant.price.amount;
    optimisticCart.totalPrice = variant.price.amount;

    return {
      ...context,
      cartContext: {
        ...cartContext,
        optimisticCart,
      },
    };
  }

  /**
   * Product ID
   *
   * This is the product ID of the product that was added to the cart
   */
  const productId = event.data.item.productId ?? event.data.item.variantId;

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

  /**
   * If there is no price on the variant return early
   */
  if (!lineItem.variant.price?.value) return context;

  /**
   * Event Quantity
   *
   * This is the quantity of the product that was added to the cart
   */
  const eventQuantity = event.data.item.quantity ?? 1;

  optimisticCart.lineItems.set(lineItemId, {
    ...lineItem,
    quantity: lineItem.quantity + eventQuantity,
  });

  const lineItemPrice = lineItem.variant.price.value * eventQuantity;

  console.log('lineItemPrice', lineItemPrice);

  optimisticCart.lineItemsSubtotalPrice =
    optimisticCart.lineItemsSubtotalPrice + lineItemPrice;
  optimisticCart.subtotalPrice = optimisticCart.subtotalPrice + lineItemPrice;
  optimisticCart.totalPrice = optimisticCart.totalPrice + lineItemPrice;

  return {
    ...context,
    cartContext: {
      ...cartContext,
      optimisticCart,
    },
  };
});
import { CommercejsCart } from '../zod/cart';
import { Cart, LineItem } from '@/lib/vercelCommerce/types/cart';
import { ProductVariant } from '@/lib/vercelCommerce/types/product';

export const commercejsCleanCart = (cart: CommercejsCart): Cart => {
  const lineItems = new Map<string, LineItem>();

  cart.line_items.forEach((lineItem) => {
    let variant: ProductVariant | null = null;

    /**
     * Variant check
     *
     * In commerce.js carts variants are optional
     * to support products without variants
     * we check if the line item has a variant
     * and if it does we set the variant based on
     * the data of the product
     */
    if (lineItem.variant) {
      variant = {
        id: [lineItem.product_id, lineItem.selected_options[0].group_id, lineItem.selected_options[0].option_id].join(":") ,
        options: [],
        price: {
          value: lineItem.price.raw,
        },
      };
    } else {
      variant = {
        id: lineItem.product_id,
        options: [],
        price: {
          value: lineItem.price.raw,
        },
      };
    }

    lineItems.set(lineItem.id, {
      id: lineItem.id,
      variantId: variant.id,
      productId: lineItem.product_id,
      name: lineItem.name,
      quantity: lineItem.quantity,
      discounts: [],
      path: lineItem.permalink,
      variant,
    });
  });

  return {
    id: cart.id,
    createdAt: new Date(cart.created).toString(),
    currency: { code: cart.currency.code },
    taxesIncluded: false,
    lineItems,
    lineItemsSubtotalPrice: cart.subtotal.raw,
    subtotalPrice: cart.subtotal.raw,
    totalPrice: cart.subtotal.raw,
  };
};

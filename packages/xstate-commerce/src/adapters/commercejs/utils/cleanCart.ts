import {
  type Cart,
  type LineItem,
  type Merchandise,
} from '../../../types/cart';
import { type ProductVariant } from '../../../types/product';
import {
  type CommercejsAddUpdateResponse,
  type CommercejsCart,
  type CommercejsCartRemoveResponse,
} from '../operations/zod/cart';

export const commercejsCleanCartResponse = (
  responce: CommercejsAddUpdateResponse | CommercejsCartRemoveResponse
): Cart => {
  if (responce.event === 'Cart.Item.Removed') {
    return commercejsCleanCart(responce.cart);
  }

  const lineItem = responce.cart.line_items.find(
    (item) => item.id === responce.line_item_id
  );

  if (!lineItem) return commercejsCleanCart(responce.cart);

  const merchandise: Merchandise = {
    id: responce.product_id,
    title: responce.product_name,
    selectedOptions: lineItem.selected_options.map((option) => ({
      name: option.group_name,
      value: option.option_name,
    })),
    product: {
      id: [
        lineItem.product_id,
        lineItem.selected_options[0].group_id,
        lineItem.selected_options[0].option_id,
      ].join(':'),
      handle: `/product/${lineItem.permalink}`,
      availableForSale: true,
      title: lineItem.name,
      description: '',
      descriptionHtml: '',
      options: [],
      priceRange: {
        maxVariantPrice: {
          amount: lineItem.price.raw,
          currencyCode: 'USD',
        },
        minVariantPrice: {
          amount: lineItem.price.raw,
          currencyCode: 'USD',
        },
      },
      featuredImage: {
        altText: responce.image?.description ?? responce.product_name,
        height: responce.image?.image_dimensions.height ?? 0,
        width: responce.image?.image_dimensions.height ?? 0,
        url: responce.image?.url ?? '',
      },
      seo: {
        description: '',
        title: responce.product_name,
      },
      tags: [],
      updatedAt: new Date(responce.cart.updated).toString(),
      variants: lineItem.selected_options.map((option) => {
        return {
          id: [lineItem.product_id, option.group_id, option.option_id].join(
            ':'
          ),
          availableForSale: true,
          title: option.option_name,
          selectedOptions: [],
          price: {
            amount: lineItem.price.raw,
            currencyCode: 'USD',
          },
        };
      }),
      images: [
        {
          altText: responce.image?.description ?? responce.product_name,
          height: responce.image?.image_dimensions.height ?? 0,
          width: responce.image?.image_dimensions.height ?? 0,
          url: responce.image?.url ?? '',
        },
      ],
    },
  };

  return commercejsCleanCart(responce.cart, merchandise);
};

export const commercejsCleanCart = (
  cart: CommercejsCart,
  merchandise?: Merchandise
): Cart => {
  const lineItems = new Map<string, LineItem>();

  cart.line_items.forEach((lineItem) => {
    let variant: ProductVariant | null = null;

    const lineMerchandise =
      merchandise && merchandise.id === lineItem.product_id
        ? merchandise
        : undefined;

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
        id: [
          lineItem.product_id,
          lineItem.selected_options[0].group_id,
          lineItem.selected_options[0].option_id,
        ].join(':'),
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

    lineItems.set(lineItem.product_id, {
      id: lineItem.id,
      variantId: variant.id,
      productId: lineItem.product_id,
      name: lineItem.name,
      quantity: lineItem.quantity,
      discounts: [],
      path: `/product/${lineItem.permalink}`,
      variant,
      merchandise: lineMerchandise,
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

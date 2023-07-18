import { type Cart, type Merchandise } from '../types/cart';

export const defaultMerchandise: Merchandise = {
  id: '',
  title: '',
  selectedOptions: [],
  product: {
    id: '',
    handle: '',
    availableForSale: true,
    title: '',
    description: '',
    descriptionHtml: '',
    options: [],
    priceRange: {
      maxVariantPrice: {
        amount: 0,
        currencyCode: 'USD',
      },
      minVariantPrice: {
        amount: 0,
        currencyCode: 'USD',
      },
    },
    featuredImage: {
      altText: '',
      height: 0,
      width: 0,
      url: '',
    },
    seo: {
      description: '',
      title: '',
    },
    tags: [],
    updatedAt: new Date().toString(),
    variants: [],
    images: [],
  },
};

export const defaultCart: Cart = {
  id: '',
  createdAt: '',
  lineItems: new Map(),
  lineItemsSubtotalPrice: 0,
  currency: { code: 'USD' },
  taxesIncluded: false,
  subtotalPrice: 0,
  totalPrice: 0,
};

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

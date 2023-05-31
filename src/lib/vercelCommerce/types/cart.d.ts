import type { Discount, Image, Measurement } from './common';
import type { Product } from '../types';
import type { ProductVariant } from './product';

export interface SelectedOption {
  /**
   * The unique identifier for the option.
   */
  id?: string;
  /**
   *  The product option’s name, such as "Color" or "Size".
   */
  name: string;
  /**
   * The product option’s value, such as "Red" or "XL".
   */
  value: string;
}

export interface Merchandise {
  id: string;
  title: string;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  product: Product;
}

export interface LineItem {
  /**
   * The unique identifier for the line item.
   */
  id: string;
  /**
   * The unique identifier for the product variant.
   */
  variantId: string;
  /**
   * The unique identifier for the product, if the variant is not provided.
   */
  productId: string;
  /**
   * This is usually the product's name.
   */
  name: string;
  /**
   * The quantity of the product variant in the line item.
   */
  quantity: number;
  /**
   * List of discounts applied to the line item.
   */
  discounts: Discount[];
  /**
   * A human-friendly unique string automatically generated from the product’s name.
   */
  path: string;
  /**
   * The product variant.
   */
  variant: ProductVariant;
  /**
   * List of selected options, to be used when displaying the line item, such as Color: Red, Size: XL.
   */
  options?: SelectedOption[];
  /**
   * The associated product of the line item
   */
  merchandise?: Merchandise;
}

/**
 * Shopping cart, a.k.a Checkout
 */
export interface Cart {
  /**
   * The unique identifier for the cart.
   */
  id: string;
  /**
   * ID of the customer to which the cart belongs.
   */
  customerId?: string;
  /**
   * The URL of the cart.
   */
  url?: string;
  /**
   * The email assigned to this cart.
   */
  email?: string;
  /**
   *  The date and time when the cart was created.
   */
  createdAt: string;
  /**
   * The currency used for this cart */
  currency: { code: string };
  /**
   * Indicates if taxes are included in the line items.
   */
  taxesIncluded: boolean;
  /**
   * List of cart line items.
   */
  lineItems: Map<string, LineItem>;
  /**
   * The sum of all the pricexs of all the items in the cart.
   * Duties, taxes, shipping and discounts excluded.
   */
  lineItemsSubtotalPrice: number;
  /**
   * Price of the cart before duties, shipping and taxes.*/
  subtotalPrice: number;
  /**
   * The sum of all the prices of all the items in the cart.
   * Duties, taxes and discounts included.
   */
  totalPrice: number;
  /**
   * Discounts that have been applied on the cart.
   */
  discounts?: Discount[];
}

/**
 * Base cart item body used for cart mutations
 */
export interface CartItemBody {
  /**
   *  The unique identifier for the product variant.
   */
  variantId: string;
  /**
   *  The unique identifier for the product, if the variant is not provided.
   */
  productId?: string;
  /**
   * The quantity of the product variant.
   */
  quantity?: number;

  /**
   * The product variant's selected options.
   */
  optionsSelected?: SelectedOption[];

  /**
   * The product being added to the cart (optional)
   */
  merchandise?: Merchandise;
}

/**
 * Cart Hooks for add, update and remove items from the cart
 */
export type CartHooks = {
  getCart: GetCartHook;
  addItem: AddItemHook;
  updateItem: UpdateItemHook;
  removeItem: RemoveItemHook;
};

export type GetCartHook = {
  data: Cart | null | undefined;
  input: {};
  fetcherInput: { cartId?: string };
  swrState: { isEmpty: boolean };
};

export type AddItemHook = {
  data: Cart | null | undefined;
  input?: CartItemBody;
  fetcherInput: CartItemBody;
  body: { item: CartItemBody };
  actionInput: CartItemBody;
};

export type UpdateItemHook = {
  data: Cart | null | undefined;
  input: { item?: LineItem; wait?: number };
  fetcherInput: { itemId: string; item: CartItemBody };
  body: { itemId: string; item: CartItemBody };
  actionInput: CartItemBody & { id: string };
};

export type RemoveItemHook = {
  data: Cart | null | undefined;
  input: { item?: LineItem };
  fetcherInput: { itemId: string };
  body: { itemId: string };
  actionInput: { id: string };
};

/**
 * Cart API endpoitns & handlers for add, update and remove items from the cart
 */
export type CartSchema = {
  endpoint: {
    options: {};
    handlers: CartHandlers;
  };
};

export type CartHandlers = {
  getCart: GetCartHandler;
  addItem: AddItemHandler;
  updateItem: UpdateItemHandler;
  removeItem: RemoveItemHandler;
};

export type GetCartHandler = GetCartHook & {
  body: { cartId?: string };
};

export type AddItemHandler = AddItemHook & {
  data: Cart | null | undefined;
  body: { cartId?: string };
};

export type UpdateItemHandler = UpdateItemHook & {
  data: Cart;
  body: { cartId: string };
};

export type RemoveItemHandler = RemoveItemHook & {
  body: { cartId: string };
};

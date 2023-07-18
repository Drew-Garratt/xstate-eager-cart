import {
  type Cart,
  type Collection,
  type Product,
  type Menu,
  type Page,
} from './index';

export interface CommerceAdapter {
  createCart: () => Promise<Cart>;
  addToCart(
    cartId: string,
    lines: { merchandiseId: string; quantity: number }[]
  ): Promise<Cart>;
  removeFromCart(cartId: string, lineIds: string[]): Promise<Cart>;
  updateCart(
    cartId: string,
    lines: { id: string; merchandiseId: string; quantity: number }[]
  ): Promise<Cart>;
  getCart(cartId: string): Promise<Cart | null>;
  getCollection(handle: string): Promise<Collection | undefined>;
  getCollectionProducts({
    collection,
    reverse,
    sortKey,
  }: {
    collection: string;
    reverse?: boolean;
    sortKey?: string;
  }): Promise<Product[]>;
  getCollections(): Promise<Collection[]>;
  getMenu(handle: string): Promise<Menu[]>;
  getPage(handle: string): Promise<Page>;
  getPages(): Promise<Page[]>;
  getProduct(handle: string): Promise<Product | undefined>;
  getProductRecommendations(productId: string): Promise<Product[]>;
  getProducts({
    query,
    reverse,
    sortKey,
  }: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  }): Promise<Product[]>;
}

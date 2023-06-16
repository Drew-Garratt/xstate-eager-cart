export interface NextCommerdeAdapterFunctions {
  getProduct(handle: string): Promise<Product | undefined>;
  getProducts({
    query,
    reverse,
    sortKey,
  }: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  }): Promise<Product[]>;
  getCollectionProducts(handle: string): Promise<Product[]>;
  getMenu(_: string): Promise<Menu[]>;
  getPage(_: string): Promise<Page | false>;
}

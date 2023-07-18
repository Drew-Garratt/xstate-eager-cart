import { commercejsFetcher } from './fetcher';
import {
  type CommercejsProductsResponse,
  productsResponseSchema,
} from './zod/productsResponse';

export async function commercejsGetProducts(params: {
  ['category_slug']?: string;
  query?: string;
  limit?: number;
  sortDirection?: 'asc' | 'desc';
  sortBy?: 'id' | 'sort_order' | 'name' | 'created_at' | 'updated_at' | 'price';
}): Promise<CommercejsProductsResponse | false> {
  return commercejsFetcher<CommercejsProductsResponse>({
    path: `products`,
    params,
    schema: productsResponseSchema,
  });
}

export default commercejsGetProducts;

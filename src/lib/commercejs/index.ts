import {
  type Product,
  type Menu,
  type Page,
} from '../vercelCommerce/types/index';
import { commercejsGetMenu } from './operations/getMenu';
import { commercejsGetProduct } from './operations/getProduct';
import { commercejsGetProducts } from './operations/getProducts';

import { reshapeProduct, reshapeProducts } from './utils/reshapeProducts';

export async function getProduct(handle: string): Promise<Product | undefined> {
  const product = await commercejsGetProduct({ permalink: handle });

  if (!product) return undefined;

  return reshapeProduct(product);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const commerceCategoryProducts = commercejsGetProducts({
    query,
    sortDirection: reverse ? 'desc' : 'asc',
    sortBy: 'sort_order',
  });

  const execute = await Promise.allSettled([commerceCategoryProducts]);

  if (execute[0].status === 'rejected') {
    return [];
  }

  if (!execute[0].value || !execute[0].value.data) {
    return [];
  }

  const products = reshapeProducts(execute[0].value.data);

  return products.filter(notEmpty);
}

export async function getCollectionProducts(
  handle: string
): Promise<Product[]> {
  const commerceCategoryProducts = commercejsGetProducts({
    ['category_slug']: handle,
    limit: 3,
  });

  const execute = await Promise.allSettled([commerceCategoryProducts]);

  if (execute[0].status === 'rejected') {
    return [];
  }

  if (!execute[0].value || !execute[0].value.data) {
    return [];
  }

  const products = reshapeProducts(execute[0].value.data);

  return products.filter(notEmpty);
}

export async function getMenu(_: string): Promise<Menu[]> {
  /** In commerce JS our menu config string is ignored as it does not handle menus */
  const res = await commercejsGetMenu();

  if (!res) return [];

  return res.items.map((item: { title: string; url: string }) => ({
    title: item.title,
    path: item.url,
  }));
}

export async function getPage(_: string): Promise<Page | false> {
  return false;
}

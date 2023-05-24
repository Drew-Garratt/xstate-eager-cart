export { commercejsGetCart } from './getCart';
export { commercejsGetVariants } from './getVariants';

export { commercejsAddToCart } from './postAddToCart';

import {
  Cart,
  Collection,
  Connection,
  Menu,
  Page,
  Product,
} from '../vercelCommerce/types/index';
import { commercejsGetProduct } from './getProduct';
import { CommercejsProduct } from './zod/product';

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await commercejsGetProduct({ permalink: handle });

  return reshapeProduct(res.body.data.product, false);
}

const reshapeProduct = (product: CommercejsProduct): Product | undefined => {
  if (!product) {
    return undefined;
  }

  const featuredImage = 
  
  return {
    id: product.id,
    handle: `/products/${product.permalink}`,
    availableForSale: product.inventory.available > 0,
    title: product.name,
    description: product.description,
    descriptionHtml: product.description,
    options: [],
    priceRange: {
      maxVariantPrice: { amount: product.price.raw, currencyCode: 'USD' },
      minVariantPrice: { amount: product.price.raw, currencyCode: 'USD' },
    },
    variants: [],
    featuredImage: {
      url: product.assets[0]?.url ?? '',
    }
    seo: {
      title: product.seo.title ?? product.name,
      description: product.seo.description ?? product.description,
    },
    tags: [],
    updatedAt: new Date(product.updated).toISOString(),
  }
};

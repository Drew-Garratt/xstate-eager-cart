export { commercejsGetCart } from './operations/getCart';
export { commercejsGetVariants } from './operations/getVariants';

export { commercejsAddToCart } from './operations/postAddToCart';

import {
  type Image,
  type Product,
  type ProductVariant,
  type ProductOption,
  type Menu,
} from '../vercelCommerce/types/index';
import { commercejsGetMenu } from './operations/getMenu';
import { commercejsGetProduct } from './operations/getProduct';
import { commercejsGetProducts } from './operations/getProducts';
import { type CommercejsProduct } from './operations/zod/product';

export async function getProduct(handle: string): Promise<Product | undefined> {
  const product = await commercejsGetProduct({ permalink: handle });

  if (!product) return undefined;

  return reshapeProduct(product);
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const reshapeProduct = (product: CommercejsProduct): Product | undefined => {
  if (!product) {
    return undefined;
  }

  const featuredImage = {
    url: '',
    altText: '',
    width: 100,
    height: 100,
  };

  if (product.conditionals.has_images) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const image = product.image!;
    if (image) {
      featuredImage.url = image.url;
      featuredImage.altText = image.description ?? '';
      featuredImage.width = image.image_dimensions.width;
      featuredImage.height = image.image_dimensions.height;
    }
  }

  const images: Image[] = [];

  product.assets
    .filter((asset) => asset.is_image)
    .forEach((asset) => {
      /**
       * Ensure no duplicate images are added.
       */
      if (!images.some((image) => image.url === asset.url))
        images.push({
          url: asset.url,
          altText: asset.description ?? '',
          width: asset.image_dimensions.width,
          height: asset.image_dimensions.height,
        });
    });

  const options: ProductOption[] = [];
  const variants: ProductVariant[] = [];

  if (product.variant_groups.length > 0) {
    product.variant_groups.forEach((group) => {
      const productOption: ProductOption = {
        id: group.id,
        name: group.name,
        values: [],
      };
      group.options.forEach((option) => {
        productOption.values.push(option.name);

        const variantPrice = option.price?.raw ?? product.price.raw;
        const priceValue =
          product.price.raw === variantPrice
            ? variantPrice
            : variantPrice + product.price.raw;

        variants.push({
          /**
           * This is a unique identifier for the variant, composed of the product ID, variant ID, and option ID.
           */
          id: [product.id, group.id, option.id].join(':'),
          title: option.name,
          availableForSale: true,
          price: {
            amount: priceValue,
            currencyCode: 'USD',
          },
          selectedOptions: [
            {
              name: group.name,
              value: option.name,
            },
          ],
        });
      });

      options.push(productOption);
    });
  }

  return {
    id: product.id,
    handle: product.permalink,
    availableForSale: product.is.active,
    title: product.name,
    description: product.description,
    descriptionHtml: product.description,
    options,
    priceRange: {
      maxVariantPrice: { amount: product.price.raw, currencyCode: 'USD' },
      minVariantPrice: { amount: product.price.raw, currencyCode: 'USD' },
    },
    variants,
    featuredImage,
    images,
    seo: {
      title: product.seo.title ?? product.name,
      description: product.seo.description ?? product.description,
    },
    tags: [],
    updatedAt: new Date(product.updated).toISOString(),
  };
};

const reshapeProducts = (
  products: CommercejsProduct[]
): Array<Product | undefined> => {
  return products.map((product) => reshapeProduct(product));
};

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

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export async function getMenu(): Promise<Menu[]> {
  const res = await commercejsGetMenu();

  if (!res) return [];

  return res.items.map((item: { title: string; url: string }) => ({
    title: item.title,
    path: item.url,
  }));
}

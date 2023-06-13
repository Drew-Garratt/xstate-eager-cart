import {
  type Product,
  type Menu,
  type Page,
} from '../vercelCommerce/types/index';
import { saleorFetch } from './fetcher';
import {
  GetCategoryProductsBySlugDocument,
  GetCollectionProductsBySlugDocument,
  GetMenuBySlugDocument,
  GetPageBySlugDocument,
  GetProductBySlugDocument,
  type MenuItemFragment,
} from './generated/graphql';
import { saleorProductToVercelProduct } from './mappers';

export async function getProduct(handle: string): Promise<Product | undefined> {
  const saleorProduct = await saleorFetch({
    query: GetProductBySlugDocument,
    variables: {
      slug: handle,
    },
  });

  if (!saleorProduct.product) {
    throw new Error(`Product not found: ${handle}`);
  }

  return saleorProductToVercelProduct(saleorProduct.product);
}

const _getCollectionProducts = async (handle: string) =>
  (
    await saleorFetch({
      query: GetCollectionProductsBySlugDocument,
      variables: {
        slug: handle,
      },
    })
  ).collection;
const _getCategoryProducts = async (handle: string) =>
  (
    await saleorFetch({
      query: GetCategoryProductsBySlugDocument,
      variables: {
        slug: handle,
      },
    })
  ).category;

export async function getCollectionProducts(
  handle: string
): Promise<Product[]> {
  const saleorCollectionProducts =
    (await _getCollectionProducts(handle)) ||
    (await _getCategoryProducts(handle));

  if (!saleorCollectionProducts) {
    throw new Error(`Collection not found: ${handle}`);
  }

  return (
    saleorCollectionProducts.products?.edges.map((product) =>
      saleorProductToVercelProduct(product.node)
    ) || []
  );
}

type MenuItemWithChildren = MenuItemFragment & {
  children?: null | undefined | MenuItemWithChildren[];
};
function flattenMenuItems(
  menuItems: null | undefined | MenuItemWithChildren[]
): Menu[] {
  return (
    menuItems?.flatMap((item) => {
      // Remove empty categories and collections from menu
      if (item.category && !item.category.products?.totalCount) {
        return [];
      }
      if (item.collection && !item.collection.products?.totalCount) {
        return [];
      }

      const path =
        item.url ||
        (item.collection
          ? `/search/${item.collection.slug}`
          : item.category
          ? `/search/${item.category.slug}`
          : '');

      return [
        ...(path
          ? [
              {
                path: path,
                title: item.name,
              },
            ]
          : []),
        ...flattenMenuItems(item.children),
      ];
    }) || []
  );
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const handleToSlug: Record<string, string> = {
    ['next-js-frontend-footer-menu']: 'footer',
    ['next-js-frontend-header-menu']: 'navbar',
  };

  const saleorMenu = await saleorFetch({
    query: GetMenuBySlugDocument,
    variables: {
      slug: handleToSlug[handle] || handle,
    },
  });

  if (!saleorMenu.menu) {
    throw new Error(`Menu not found: ${handle}`);
  }

  const result = flattenMenuItems(saleorMenu.menu.items).filter(
    // unique by path
    (item1, idx, arr) =>
      arr.findIndex((item2) => item2.path === item1.path) === idx
  );

  if (handle === 'next-js-frontend-header-menu') {
    // limit number of items in header to 3
    return result.slice(0, 3);
  }
  return result;
}

export async function getPage(handle: string): Promise<Page> {
  const saleorPage = await saleorFetch({
    query: GetPageBySlugDocument,
    variables: {
      slug: handle,
    },
  });

  if (!saleorPage.page) {
    throw new Error(`Page not found: ${handle}`);
  }

  return {
    id: saleorPage.page.id,
    title: saleorPage.page.title,
    handle: saleorPage.page.slug,
    body: saleorPage.page.content || '',
    bodySummary: saleorPage.page.seoDescription || '',
    seo: {
      title: saleorPage.page.seoTitle || saleorPage.page.title,
      description: saleorPage.page.seoDescription || '',
    },
    createdAt: saleorPage.page.created,
    updatedAt: saleorPage.page.created,
  };
}

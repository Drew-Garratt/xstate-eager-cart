import Link from 'next/link';
import type { Product } from '@/lib/vercelCommerce/types';
import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/adapter';

function ThreeItemGridItem({
  item,
  size,
  background,
}: {
  item: Product;
  size: 'full' | 'half';
  background: 'white' | 'pink' | 'purple' | 'black';
}) {
  return (
    <div
      className={
        size === 'full'
          ? 'lg:col-span-4 lg:row-span-2'
          : 'lg:col-span-2 lg:row-span-1'
      }
    >
      <Link className="block h-full" href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          width={size === 'full' ? 1080 : 540}
          height={size === 'full' ? 1080 : 540}
          priority={true}
          background={background}
          alt={item.title}
          labels={{
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount
              ? item.priceRange.maxVariantPrice.amount.toString()
              : '-',
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts('facial-products');
  // Small cheat to fetch collection that matches our chosen data source.

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section
      className="lg:grid lg:grid-cols-6 lg:grid-rows-2"
      data-testid="homepage-products"
    >
      <ThreeItemGridItem size="full" item={firstProduct} background="purple" />
      <ThreeItemGridItem size="half" item={secondProduct} background="black" />
      <ThreeItemGridItem size="half" item={thirdProduct} background="pink" />
    </section>
  );
}

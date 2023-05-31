'use client';

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import LoadingDots from 'components/loading-dots';
import { Product, ProductVariant } from '@/lib/vercelCommerce/types';
import { useAddItem } from '@/lib/cart/useAddItem';
import { useCartLineStatus } from '@/lib/cart/useCartLineStatus';

export function AddToCart({
  variants,
  availableForSale,
  product
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  product: Product;
}) {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { isItemInOptimisticQueue } = useCartLineStatus({itemId: selectedVariantId});
  const sendAddToCart = useAddItem();

  useEffect(() => {
    const variant = variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) => option.value === searchParams.get(option.name.toLowerCase())
      )
    );

    if (variant) {
      setSelectedVariantId(variant.id);
    }
  }, [searchParams, variants, setSelectedVariantId]);

  const isMutating = isItemInOptimisticQueue || isPending;

  async function handleAdd() {
    if (!availableForSale) return;

    sendAddToCart({
      variantId: variants[0]?.id,
      quantity: 1,
      merchandise: {
        id: product.id,
        title: product.title,
        product,
        selectedOptions: variants[0]?.selectedOptions ?? []
      }
    });

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <button
      aria-label="Add item to cart"
      disabled={isMutating}
      onClick={handleAdd}
      className={clsx(
        'flex w-full items-center justify-center bg-black p-4 text-sm uppercase tracking-wide text-white opacity-90 hover:opacity-100 dark:bg-white dark:text-black',
        {
          'cursor-not-allowed opacity-60': !availableForSale,
          'cursor-not-allowed': isMutating
        }
      )}
    >
      <span>{availableForSale ? 'Add To Cart' : 'Out Of Stock'}</span>
      {isMutating ? <LoadingDots className="bg-white dark:bg-black" /> : null}
    </button>
  );
}

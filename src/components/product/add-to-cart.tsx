'use client';

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import { useAddItem } from '@/lib/cart/useAddItem';
import { useCartLineStatus } from '@/lib/cart/useCartLineStatus';
import { type Product, type ProductVariant } from '@/lib/vercelCommerce/types';
import LoadingDots from 'components/loading-dots';

export function AddToCart({
  variants,
  availableForSale,
  product,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  product: Product;
}) {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { isItemInOptimisticQueue } = useCartLineStatus({
    itemId: selectedVariantId,
  });
  const sendAddToCart = useAddItem();

  useEffect(() => {
    const variantIndex = variants.findIndex((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) => option.value === searchParams.get(option.name.toLowerCase())
      )
    );

    if (variantIndex > -1) {
      setSelectedVariantIndex(variantIndex);
      setSelectedVariantId(variants[variantIndex].id);
    }
  }, [searchParams, variants, setSelectedVariantId]);

  const isMutating = isItemInOptimisticQueue || isPending;

  async function handleAdd() {
    if (!availableForSale) return;

    sendAddToCart({
      variantId: selectedVariantId,
      quantity: 1,
      merchandise: {
        id: product.id,
        title: product.title,
        product,
        selectedOptions: variants[selectedVariantIndex]?.selectedOptions ?? [],
      },
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
          'cursor-not-allowed': isMutating,
        }
      )}
    >
      <span>{availableForSale ? 'Add To Cart' : 'Out Of Stock'}</span>
      {isMutating ? <LoadingDots className="bg-white dark:bg-black" /> : null}
    </button>
  );
}

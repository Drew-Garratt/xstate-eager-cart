import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';

import { useCartLineStatus } from '@/lib/cart/useCartLineStatus';
import { useUpdateItem } from '@/lib/cart/useUpdateItem';
import { type LineItem } from '@/lib/vercelCommerce/types/cart';
import MinusIcon from 'components/icons/minus';
import PlusIcon from 'components/icons/plus';
import LoadingDots from '../loading-dots';

export default function EditItemQuantityButton({
  item,
  type,
}: {
  item: LineItem;
  type: 'plus' | 'minus';
}) {
  const router = useRouter();
  const updateItem = useUpdateItem();

  const { isItemInOptimisticQueue } = useCartLineStatus({
    itemId: item.productId,
  });

  async function handleEdit() {
    updateItem({
      itemId: item.productId,
      item: {
        variantId: item.variantId,
        quantity: item.quantity + (type === 'plus' ? 1 : -1),
      },
    });

    startTransition(() => {
      router.refresh();
    });
  }
  return (
    <button
      aria-label={
        type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'
      }
      onClick={handleEdit}
      disabled={isItemInOptimisticQueue}
      className={clsx(
        'ease flex min-w-[36px] max-w-[36px] items-center justify-center border px-2 transition-all duration-200 hover:border-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-900',
        {
          'cursor-not-allowed': isItemInOptimisticQueue,
          'ml-auto': type === 'minus',
        }
      )}
    >
      {isItemInOptimisticQueue ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === 'plus' ? (
        <PlusIcon className="h-4 w-4" />
      ) : (
        <MinusIcon className="h-4 w-4" />
      )}
    </button>
  );
}

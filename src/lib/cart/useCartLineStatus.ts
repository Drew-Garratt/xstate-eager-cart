import { StoreContext } from '@/components/providers/commerce/CommerceProvider';
import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import { CartEvents, StoreState } from '@/lib/vercelCommerce/machine';

export function useCartLineStatus({itemId} : {itemId: string}) : {isItemInAsyncQueue: boolean, isItemInOptimisticQueue: boolean} {
  const cartService = useContext(StoreContext);

  if (cartService === undefined) {
    throw new Error('useAddItem must be used within a CartProvider');
  }

  const containsProductId = (event: CartEvents) => {
    switch (event.type) {
      case 'ADD_ITEM':
        return event.data.item.variantId === itemId;
      case 'REMOVE_ITEM':
        return event.data.itemId === itemId;
      case 'UPDATE_ITEM':
        return event.data.itemId === itemId;
      default:
        return false;
  }};

  const itemInAsyncQueue = (state: StoreState) => state.context.cartContext.asyncQueue.some(containsProductId);
  const itemInOptimisticQueue = (state: StoreState) => state.context.cartContext.optimisticQueue.some(containsProductId);
  
  const isItemInAsyncQueue = useSelector(cartService, itemInAsyncQueue);
  const isItemInOptimisticQueue = useSelector(cartService, itemInOptimisticQueue);

  return { isItemInAsyncQueue, isItemInOptimisticQueue };
}

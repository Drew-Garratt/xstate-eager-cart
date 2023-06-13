import { type StoreMachineOptions } from '@/lib/vercelCommerce/machine';
import defaultServices from '@/lib/vercelCommerce/machine/services';
import { asyncAddToCart } from './asyncAddToCart';
import { asyncCreateCart } from './asyncCreateCart';
import { asyncRemoveFromCart } from './asyncRemoveFromCart';
import { asyncUpdateCart } from './asyncUpdateCart';
import { checkAsyncQueue } from './checkAsyncQueue';
import { checkOptimisticQueue } from './checkOptimisticQueue';
import { initialiseCart } from './initialiseCart';

export const services: StoreMachineOptions['services'] = {
  ...defaultServices,
  asyncAddToCart,
  asyncCreateCart,
  asyncRemoveFromCart,
  asyncUpdateCart,
  checkAsyncQueue,
  checkOptimisticQueue,
  initialiseCart,
};

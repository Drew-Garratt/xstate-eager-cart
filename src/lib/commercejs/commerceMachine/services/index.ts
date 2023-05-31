import { asyncAddToCart } from './asyncAddToCart';
import { asyncCreateCart } from './asyncCreateCart';
import { asyncRemoveFromCart } from './asyncRemoveFromCart';
import { asyncUpdateCart } from './asyncUpdateCart';
import { checkAsyncQueue } from './checkAsyncQueue';
import { checkOptimisticQueue } from './checkOptimisticQueue';
import { initialiseCart } from './initialiseCart';

import services from '@/lib/vercelCommerce/machine/services'

export {
  asyncAddToCart,
  asyncCreateCart,
  asyncRemoveFromCart,
  asyncUpdateCart,
  checkAsyncQueue,
  checkOptimisticQueue,
  initialiseCart,
};

export default {
  ...services,
  asyncAddToCart,
  asyncCreateCart,
  asyncRemoveFromCart,
  asyncUpdateCart,
  checkAsyncQueue,
  checkOptimisticQueue,
  initialiseCart,
};

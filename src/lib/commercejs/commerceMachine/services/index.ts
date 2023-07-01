import { type OptimisticCartMachineOptions } from '@/lib/vercelCommerce/xstate/machines/optimisticCart';
import { defaultServices } from '@/lib/vercelCommerce/xstate/machines/optimisticCart/services';
import { asyncAddToCart } from './asyncAddToCart';
import { asyncCreateCart } from './asyncCreateCart';
import { asyncRemoveFromCart } from './asyncRemoveFromCart';
import { asyncUpdateCart } from './asyncUpdateCart';

export const services: OptimisticCartMachineOptions['services'] = {
  ...defaultServices,
  asyncAddToCart,
  asyncCreateCart,
  asyncRemoveFromCart,
  asyncUpdateCart,
};

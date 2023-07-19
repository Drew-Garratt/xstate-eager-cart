import { type OptimisticCartMachineOptions } from '../../../../machines/optimisticCart/optimisticCartMachine';
import { defaultServices } from '../../../../machines/optimisticCart/services';
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

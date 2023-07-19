import actions from './actions';
import guards from './guards';
import { type OptimisticCartMachineOptions } from './optimisticCartMachine';
import { optimisticCartMachine } from './optimisticCartMachine';
import { defaultServices } from './services';

type AsyncServices = Pick<
  OptimisticCartMachineOptions['services'],
  | 'asyncAddToCart'
  | 'asyncCreateCart'
  | 'asyncRemoveFromCart'
  | 'asyncUpdateCart'
>;
/**
 * Import and configure the cart machine
 */
export function cartMachine({ services }: { services: AsyncServices }) {
  return optimisticCartMachine.withConfig({
    services: { ...defaultServices, ...services },
    actions,
    guards,
  });
}

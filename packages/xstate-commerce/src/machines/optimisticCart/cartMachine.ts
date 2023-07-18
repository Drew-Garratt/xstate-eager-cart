import actions from './actions';
import guards from './guards';
import { defaultServices } from './services';
import { type OptimisticCartMachineOptions } from '.';
import { optimisticCartMachine } from '.';

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
export default function cartMachine(services: AsyncServices) {
  return optimisticCartMachine.withConfig({
    services: { ...defaultServices, ...services },
    actions,
    guards,
  });
}

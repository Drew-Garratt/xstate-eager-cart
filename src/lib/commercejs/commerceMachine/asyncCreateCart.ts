import { type StoreMachineOptions } from '@/lib/vercelCommerce/machine';

export const asyncCreateCart: StoreMachineOptions['services']['asyncCreateCart'] =
  async () => {
    return { cart: null };
  };

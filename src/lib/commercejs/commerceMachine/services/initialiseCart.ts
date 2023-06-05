import { type StoreMachineOptions } from '@/lib/vercelCommerce/machine';

export const initialiseCart: StoreMachineOptions['services']['initialiseCart'] =
  async () => {
    return { data: null };
  };

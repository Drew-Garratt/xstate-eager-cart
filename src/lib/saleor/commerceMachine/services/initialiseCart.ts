import { StoreActor } from '@/lib/vercelCommerce/machine';

export const initialiseCart: StoreActor = async () => {
  return { data: null };
};

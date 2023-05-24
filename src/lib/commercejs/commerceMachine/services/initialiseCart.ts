import { StoreActor } from '@/lib/commerceMachine';

export const initialiseCart: StoreActor = async () => {
  return { data: null };
};

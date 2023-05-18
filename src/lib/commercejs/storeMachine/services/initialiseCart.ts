import { StoreActor } from '@/lib/storeMachine';

export const initialiseCart: StoreActor = async () => {
  return { data: null };
};

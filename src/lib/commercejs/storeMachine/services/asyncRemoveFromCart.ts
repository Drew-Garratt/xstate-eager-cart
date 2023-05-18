import { StoreActor } from '@/lib/storeMachine';

export const asyncRemoveFromCart: StoreActor = async () => {
  return { data: null };
};

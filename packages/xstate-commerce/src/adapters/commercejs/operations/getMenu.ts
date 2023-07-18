import { commercejsFetcher } from './fetcher';
import { apiMenuSchema, type CommercejsMenu } from './zod/menu';

export async function commercejsGetMenu(): Promise<CommercejsMenu | false> {
  return commercejsFetcher<CommercejsMenu>({
    path: `menu`,
    schema: apiMenuSchema,
    localApi: true,
  });
}

export default commercejsGetMenu;

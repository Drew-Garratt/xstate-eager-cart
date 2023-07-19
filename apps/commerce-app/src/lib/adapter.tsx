import * as nextCommerceAdapter from '@your-org/xstate-commerce/adapters/commercejs';
import { type NextCommerdeAdapterFunctions } from '@your-org/xstate-commerce/types';

export const {
  getMenu,
  getCollectionProducts,
  getPage,
  getProduct,
  getProducts,
}: NextCommerdeAdapterFunctions = nextCommerceAdapter;

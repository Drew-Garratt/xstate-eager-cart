import * as nextCommerceAdapter from '../saleor';
import { type NextCommerdeAdapterFunctions } from './types';

export const {
  getMenu,
  getCollectionProducts,
  getPage,
  getProduct,
  getProducts,
}: NextCommerdeAdapterFunctions = nextCommerceAdapter;

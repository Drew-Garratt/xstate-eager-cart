import * as nextCommerceAdapter from '../commercejs';
import { type NextCommerdeAdapterFunctions } from './types';

export const {
  getMenu,
  getCollectionProducts,
  getPage,
  getProduct,
  getProducts,
}: NextCommerdeAdapterFunctions = nextCommerceAdapter;

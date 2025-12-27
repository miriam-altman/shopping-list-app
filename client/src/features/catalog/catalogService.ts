import { http } from '../../api/http';
import { CatalogResponse } from '../types';

export const catalogService = {
  fetchCatalog: async () => {
    const res = await http.get<CatalogResponse>('/api/Catalog');
    return res.data;
  },
  
};
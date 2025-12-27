import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { catalogService } from './catalogService';
import { RootState } from '../../app/store';
import { Category, Product, CatalogResponse } from '../types';

export const fetchCatalog = createAsyncThunk<CatalogResponse>(
  'catalog/fetchCatalog',
  async () => {
    return await catalogService.fetchCatalog();
  }
);


type CatalogState = {
  categories: Category[];
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: CatalogState = {
  categories: [],
  products: [],
  status: 'idle',
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.products = action.payload.products;
        state.status = 'succeeded';
      })
      .addCase(fetchCatalog.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default catalogSlice.reducer;

// selectors נוחים
export const selectCategories = (state: RootState) => state.catalog.categories as Category[];
export const selectProducts = (state: RootState) => state.catalog.products as Product[];
export const selectProductsByCategory = (categoryId: number) => (state: RootState) =>
  (state.catalog.products as Product[]).filter(p => p.categoryId === categoryId);

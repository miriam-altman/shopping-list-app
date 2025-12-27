import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, AddToCartPayload } from '../types';

const STORAGE_KEY = 'shopping_cart_data';

const loadFromStorage = (): Cart => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (err) {
    console.error("Failed to load cart", err);
    return {};
  }
};

const saveToStorage = (items: Cart) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const initialState = {
  items: loadFromStorage(), 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { categoryId, productId, qty } = action.payload;

      if (!state.items[categoryId]) state.items[categoryId] = [];

      const existing = state.items[categoryId].find(item => item.productId === productId);
      if (existing) {
        existing.qty += qty;
      } else {
        state.items[categoryId].push({
          id: Date.now().toString() + Math.random(),
          productId,
          qty,
        });
      }

      saveToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = {};
      localStorage.removeItem(STORAGE_KEY);
    }
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
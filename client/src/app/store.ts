import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from '../features/catalog/catalogSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
     cart: cartReducer,
     catalog: catalogReducer,
  },
});

// Persist cart -> localStorage (debounced)
let _saveTimeout: any = null;
store.subscribe(() => {
  if (_saveTimeout) clearTimeout(_saveTimeout);
  _saveTimeout = setTimeout(() => {
    try {
      const state = store.getState();
      localStorage.setItem('cart', JSON.stringify(state.cart.items));
    } catch (err) {
      // ignore write errors
    }
  }, 200);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { OrderForm } from '../types';

export const orderService = {
  sendOrder: async (formData: OrderForm, cartData: any[]) => {
    const ordersApi = process.env.REACT_APP_ORDERS_API;
    
    if (!ordersApi) {
      throw new Error('Missing REACT_APP_ORDERS_API in .env file');
    }

    const response = await fetch(ordersApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, cart: cartData }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error(err?.error || 'Failed to send order');
    }

    return response.json(); // יחזיר { message, id }

  }
};
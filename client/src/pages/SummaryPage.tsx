import React, { useState, useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { orderService } from '../features/orders/orderService';
import { useNavigate } from 'react-router-dom';
import { Category, Product, Cart, OrderForm } from '../features/types';
import { clearCart } from '../features/cart/cartSlice';

function Summary() {
  const cart = useAppSelector(state => state.cart.items) as Cart;
  const categories = useAppSelector(state => state.catalog.categories) as Category[];
  const products = useAppSelector(state => state.catalog.products) as Product[];

  const [form, setForm] = useState<OrderForm>({ fullName: '', address: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const categoryNameById = useMemo(() => {
    const m = new Map<number, string>();
    categories.forEach(c => m.set(c.id, c.name));
    return m;
  }, [categories]);

  const productNameById = useMemo(() => {
    const m = new Map<number, string>();
    products.forEach(p => m.set(p.id, p.name));
    return m;
  }, [products]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!form.fullName || !form.address || !form.email) {
        setError('יש למלא את כל השדות');
        return;
      }

      if (Object.keys(cart).length === 0) {
        setError('העגלה ריקה');
        return;
      }

      setError('');
      
      try {
        const flatCart = Object.entries(cart).flatMap(([categoryId, items]) =>
          items.map(item => ({
            categoryId: Number(categoryId),
            productId: String(item.productId),
            name: getProductName(item.productId),
            quantity: item.qty,
          }))
        );

        await orderService.sendOrder(form, flatCart);

        dispatch(clearCart());
        setSuccess('ההזמנה התקבלה בהצלחה!');
        setTimeout(() => navigate('/success'), 1000);
        
      } catch (err: any) {
        setError(err.message || 'אירעה שגיאה בשליחת ההזמנה');
      }
    },
    [form, cart, navigate, dispatch]
  );

  const getCategoryName = (categoryId: number) => categoryNameById.get(categoryId) ?? categoryId;
  const getProductName = (productId: number) => productNameById.get(productId) ?? productId;

  return (
    <div className="summary-container">
      <h2 className="summary-title">סיכום הזמנה</h2>

      <form className="summary-form" onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="שם פרטי ומשפחה"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="כתובת מלאה"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="מייל"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <h4 style={{ margin: '16px 0 8px 0' }}>מוצרים בהזמנה:</h4>

        {Object.entries(cart).length === 0 ? (
          <div>העגלה ריקה</div>
        ) : (
          <ul className="summary-products-list">
            {Object.entries(cart).flatMap(([categoryId, items]) => {
              const categoryIdNum = Number(categoryId);

              return items.map(item => (
                <li className="summary-product-item" key={item.productId}>
                  {getProductName(item.productId)} ({getCategoryName(categoryIdNum)}) – {item.qty}
                </li>
              ));
            })}
          </ul>
        )}

        {error && <div className="summary-error">{error}</div>}
        {success && <div className="summary-success">{success}</div>}

        <button type="submit" className="summary-submit-button">
          אשר הזמנה
        </button>
      </form>
    </div>
  );
}

export default Summary;
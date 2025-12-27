import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelect from '../features/categories/categorySelect';
import ProductSelect from '../features/cartForm/AddToCartForm'; 
import CartView from '../features/cart/cartView';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import { fetchCatalog } from '../features/catalog/catalogSlice';

function ShoppingPage() {
  const [categoryId, setCategoryId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 🔸 חשוב: טעינת הקטלוג מהשרת ברגע שהדף עולה
  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  const handleCategoryChange = useCallback((value: number) => {
    setCategoryId(value);
  }, []);

  const handleAdd = useCallback(
    (productId: number, qty: number) => {
      if (!categoryId || !productId) return;
      dispatch(addToCart({ categoryId, productId, qty }));
    },
    [categoryId, dispatch]
  );

  const goToSummary = () => {
    navigate('/summary');
  };

  return (
    <div className="centered-container">
      <h1 className="main-title">רשימת קניות</h1>
      
      <div className="filters-row">
        <div className="field">
          <label className="field-label">בחר קטגוריה</label>
          <CategorySelect value={categoryId} onChange={handleCategoryChange} />
        </div>
        <ProductSelect categoryId={categoryId} onAdd={handleAdd} />
      </div>

      <CartView />

      <button className="order-btn" onClick={goToSummary}>
        המשך להזמנה
      </button>
    </div>
  );
}

export default ShoppingPage;
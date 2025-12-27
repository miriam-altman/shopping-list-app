import React from 'react';
import { useAppSelector } from '../../app/hooks';

type CartItem = {
  id: string;
  productId: number;
  qty: number;
};

type Cart = {
  [categoryId: number]: CartItem[];
};

type Category = { id: number; name: string };
type Product = { id: number; name: string; categoryId: number };
const CartView: React.FC = () => {
  const cart = useAppSelector(state => state.cart.items) as Cart;

  // 👇 משיכת catalog כדי לתרגם IDs לשמות
  const categories = useAppSelector(state => state.catalog.categories) as Category[];
  const products = useAppSelector(state => state.catalog.products) as Product[];

  if (Object.keys(cart).length === 0) {
    return <div className="empty-cart">העגלה ריקה</div>;
  }

  const getCategoryName = (categoryId: number) =>
    categories.find(c => c.id === categoryId)?.name ?? categoryId;

  const getProductName = (productId: number) =>
    products.find(p => p.id === productId)?.name ?? productId;

  return (
    <div className="cart-list">
      {Object.entries(cart).map(([categoryId, items]) => {
        const categoryIdNum = Number(categoryId);

        return (
          <div key={categoryId} className="cart-category">
            <h3 className="cart-category-title">
              {getCategoryName(categoryIdNum)}
            </h3>

            <ul className="cart-items-list">
              {items.map(item => (
                <li key={item.productId} className="cart-item">
                  {getProductName(item.productId)} – {item.qty}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CartView;

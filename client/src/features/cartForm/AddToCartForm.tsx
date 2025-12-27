import React, { useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectProductsByCategory } from '../catalog/catalogSlice';
import { Product } from '../types';

type Props = {
  categoryId: number;
  onAdd: (productId: number, qty: number) => void;
};

const AddToCartForm: React.FC<Props> = ({ categoryId, onAdd }) => {
  const products = useAppSelector(selectProductsByCategory(categoryId)) as Product[];

  const [productId, setProductId] = useState<number>(0);
  const [qty, setQty] = useState(1);

  const selectedProduct = useMemo(
    () => products.find(p => p.id === productId),
    [products, productId]
  );

  return (
    <div className="product-row">
       <div className="field">
           <label className="field-label">שם המוצר</label>
              <div className="select-wrap product-select">
                <select
                  className="select-like"
                  value={productId}
                  onChange={e => setProductId(Number(e.target.value))}
                  disabled={!categoryId}
                >
                  <option value="">{categoryId ? 'בחר מוצר' : 'בחר קטגוריה קודם'}</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

      <input
        className="qty-input"
        type="number"
        min="1"
        value={qty}
        onChange={e => setQty(Number(e.target.value))}
      />

      <button
        className="add-btn"
        disabled={!selectedProduct}
        onClick={() => {
          onAdd(productId, qty);
          setQty(1);
          setProductId(0);
        }}
      >
        הוסף מוצר לסל
      </button>
    </div>
  );
};

export default AddToCartForm;

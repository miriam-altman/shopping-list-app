import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCatalog, selectCategories } from '../catalog/catalogSlice';
import { Category } from '../types';

const CategorySelect: React.FC<{ value: number; onChange: (val: number) => void }> = ({ value, onChange }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories) as Category[];

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  return (
    <div className="select-wrap">
      <select
        className="select-like"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      >
        <option value="">בחר קטגוריה</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;

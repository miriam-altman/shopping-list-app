export type Category = { 
    id: number;
    name: string

};
export type Product = { 
    id: number;
    name: string;
    categoryId: number
};

export type CatalogResponse = {
  categories: Category[];
  products: Product[];
};

export type OrderForm = {
  fullName: string;
  address: string;
  email: string;
};

export type CartItem = {
  id: string;
  productId: number;
  qty: number;
};


export type Cart = {
  [categoryId: number]: CartItem[];
};

export type AddToCartPayload = {
  categoryId: number;
  productId: number;
  qty: number;
};
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Products from 'shared/interfaces/Products.inteface';

interface ProductsState {
  products: Products[];
}

interface SetProductsPayload {
  products: Products[];
}

export const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<SetProductsPayload>) => {
      state.products = action.payload.products;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

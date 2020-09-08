import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Products from 'shared/interfaces/Products.inteface';

interface SelectedProductState {
  selectedProduct: Products | null;
}

interface SetSelectedProductPayload {
  selectedProduct: Products | null;
}

export const initialState: SelectedProductState = {
  selectedProduct: null,
};

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<SetSelectedProductPayload>) => {
      const { selectedProduct = null } = action.payload;
      state.selectedProduct = selectedProduct;
    },
  },
});

export const { setSelectedProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;

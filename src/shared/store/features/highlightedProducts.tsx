import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Ingredient from '../../interfaces/Ingredient.interface';

interface HighlightedProductsState {
  highlightedCarbs: Ingredient[];
  highlightedFat: Ingredient[];
  highlightedProteins: Ingredient[];
}

interface SetHighlightedProductsPayload {
  highlightedCarbs: Ingredient[];
  highlightedFat: Ingredient[];
  highlightedProteins: Ingredient[];
}

export const initialState: HighlightedProductsState = {
  highlightedCarbs: [],
  highlightedFat: [],
  highlightedProteins: [],
};

const productsSlice = createSlice({
  name: 'highlightedProducts',
  initialState,
  reducers: {
    setHighlightedProducts: (state, action: PayloadAction<SetHighlightedProductsPayload>) => {
      state.highlightedCarbs = action.payload.highlightedCarbs;
      state.highlightedFat = action.payload.highlightedFat;
      state.highlightedProteins = action.payload.highlightedProteins;
    },
  },
});

export const { setHighlightedProducts } = productsSlice.actions;

export default productsSlice.reducer;

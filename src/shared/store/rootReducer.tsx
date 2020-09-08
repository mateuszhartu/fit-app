import { combineReducers } from '@reduxjs/toolkit';
import products from 'shared/store/features/productsSlice';
import selectedProduct from 'shared/store/features/selectedProduct';
import dailyDiet from 'shared/store/features/dailyDietSlice';
import sidebarState from 'shared/store/features/sidebarStateSlice'

const rootReducer = combineReducers({
  products,
  selectedProduct,
  dailyDiet,
  sidebarState,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { combineReducers } from '@reduxjs/toolkit';
import products from 'shared/store/features/productsSlice';
import selectedProduct from 'shared/store/features/selectedProduct';
import dailyDiet from 'shared/store/features/dailyDietSlice';
import sidebarState from 'shared/store/features/sidebarStateSlice';
import userGoals from 'shared/store/features/userGoalsSlice';

const rootReducer = combineReducers({
  products,
  userGoals,
  selectedProduct,
  dailyDiet,
  sidebarState,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

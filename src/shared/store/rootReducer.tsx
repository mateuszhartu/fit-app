import { combineReducers } from '@reduxjs/toolkit';
import products from 'shared/store/features/productsSlice';

const rootReducer = combineReducers({
  products,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

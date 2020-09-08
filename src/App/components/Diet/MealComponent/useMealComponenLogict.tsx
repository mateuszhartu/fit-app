import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/store/rootReducer';
import { setSelectedProduct } from 'shared/store/features/selectedProduct';
import { setMealIngredients } from 'shared/store/features/dailyDietSlice';

const useMealComponentLogic = () => {
  const dispatch = useDispatch();
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [ingredientAmount, setIngredientAmount] = useState(0);
  const { selectedProduct } = useSelector((state: RootState) => state.selectedProduct);

  const onCloseDrawerManually = () => {
    setIsSidebarOpened(false);
    dispatch(setSelectedProduct({ selectedProduct: null }));
  };

  const onIngredientAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientAmount(event.target.valueAsNumber);
  };

  const onAddIngredient = () => {
    dispatch(setMealIngredients({  }))
  };

  return {
    isSidebarOpened,
    setIsSidebarOpened,
    selectedProduct,
    onCloseDrawerManually,
    onIngredientAmountChange,
  };
};
export default useMealComponentLogic;

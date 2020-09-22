import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/store/rootReducer';
import { setSelectedProduct } from 'shared/store/features/selectedProduct';
import { addMealIngredient, removeIngredient, SetMealIngredientsPayload } from 'shared/store/features/dailyDietSlice';
import updateDiet from 'shared/api/diet';

const useMealComponentLogic = () => {
  const dispatch = useDispatch();
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [ingredientAmount, setIngredientAmount] = useState(0);
  const { selectedProduct } = useSelector((state: RootState) => state.selectedProduct);
  const { dailyDiet } = useSelector((state: RootState) => state);

  const onCloseDrawerManually = () => {
    setIsSidebarOpened(false);
    dispatch(setSelectedProduct({ selectedProduct: null }));
  };

  const onIngredientAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientAmount(event.target.valueAsNumber);
  };

  const onAddIngredient = (mealIngredient: SetMealIngredientsPayload) => {
    dispatch(addMealIngredient({ name: mealIngredient.name, ingredient: mealIngredient.ingredient }));
    updateDiet(dailyDiet).then((r) => console.log(r));
  };

  const onRemoveIngredient = (mealIngredient: SetMealIngredientsPayload) => {
    dispatch(removeIngredient({ name: mealIngredient.name, ingredient: mealIngredient.ingredient }));
    updateDiet(dailyDiet);
  };

  return {
    isSidebarOpened,
    setIsSidebarOpened,
    selectedProduct,
    ingredientAmount,
    onAddIngredient,
    onRemoveIngredient,
    onCloseDrawerManually,
    onIngredientAmountChange,
  };
};
export default useMealComponentLogic;

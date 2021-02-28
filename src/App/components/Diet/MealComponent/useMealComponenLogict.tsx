import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/store/rootReducer';
import { setSelectedProduct } from 'shared/store/features/selectedProduct';
import { addMealIngredient, removeIngredient, SetMealIngredientsPayload } from 'shared/store/features/dailyDietSlice';
import Ingredient from 'shared/interfaces/Ingredient.interface';

const useMealComponentLogic = () => {
  const dispatch = useDispatch();
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [ingredientAmount, setIngredientAmount] = useState(0);
  const { highlightedCarbs, highlightedFat, highlightedProteins } = useSelector(
    (state: RootState) => state.highlightedProducts
  );
  const { selectedProduct } = useSelector((state: RootState) => state.selectedProduct);

  const onCloseDrawerManually = () => {
    setIsSidebarOpened(false);
    dispatch(setSelectedProduct({ selectedProduct: null }));
  };

  const checkToHighlightProduct = (highlightedArray: Ingredient[], ingredient: Ingredient) => {
    return highlightedArray.some(
      (ingr) =>
        ingr.products.carbs === ingredient.products.carbs &&
        ingr.grams === ingredient.grams &&
        ingr.products.name === ingredient.products.name
    );
  };

  const highlightElementHandler = (ingredient: Ingredient) => {
    if (checkToHighlightProduct(highlightedCarbs, ingredient)) {
      return true;
    }
    if (checkToHighlightProduct(highlightedFat, ingredient)) {
      return true;
    }
    return checkToHighlightProduct(highlightedProteins, ingredient);
  };

  const onIngredientAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientAmount(event.target.valueAsNumber);
  };

  const onAddIngredient = (mealIngredient: SetMealIngredientsPayload) => {
    dispatch(addMealIngredient({ name: mealIngredient.name, ingredient: mealIngredient.ingredient }));
    dispatch(setSelectedProduct({ selectedProduct: null }));
    setIsSidebarOpened(false);
  };

  const onRemoveIngredient = (mealIngredient: SetMealIngredientsPayload) => {
    dispatch(removeIngredient({ name: mealIngredient.name, ingredient: mealIngredient.ingredient }));
  };

  const calculateCalories = (ingredient: Ingredient) => {
    return (
      ((ingredient.products.carbs + ingredient.products.fat + ingredient.products.proteins) * 4 * ingredient.grams) /
      100
    );
  };

  return {
    isSidebarOpened,
    setIsSidebarOpened,
    selectedProduct,
    ingredientAmount,
    highlightElementHandler,
    calculateCalories,
    onAddIngredient,
    onRemoveIngredient,
    onCloseDrawerManually,
    onIngredientAmountChange,
  };
};
export default useMealComponentLogic;

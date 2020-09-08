import { useSelector } from 'react-redux';
import { RootState } from 'shared/store/rootReducer';
import Ingredient from 'shared/interfaces/Ingredient.interface';
import { useState } from 'react';

const useDailyLogic = () => {
  const { dailyDiet } = useSelector((state: RootState) => state.dailyDiet);
  const { selectedProduct } = useSelector((state: RootState) => state.selectedProduct);
  const [addIngredientFlag, setAddIngredientFlag] = useState(false);

  return {
    dailyDiet,
    addIngredientFlag,
    selectedProduct,
  };
};
export default useDailyLogic;

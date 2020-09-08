import React, { FunctionComponent } from 'react';
import Meal from 'shared/interfaces/Meal.interface';
import Drawer from 'shared/hoc/Drawer';
import styles from './styles.module.scss';
import useMealComponentLogic from './useMealComponenLogict';
import ProductsList from '../../Products';

interface Props {
  mealName: string;
  mealIngredients: Meal;
}

const MealComponent: FunctionComponent<Props> = (meal) => {
  const { isSidebarOpened, setIsSidebarOpened, onCloseDrawerManually, onIngredientAmountChange, selectedProduct } = useMealComponentLogic();
  return (
    <div className={styles.container}>
      <p>{meal.mealName}</p>
      {isSidebarOpened ? (
        <Drawer close={onCloseDrawerManually}>
          {selectedProduct ? (
            <div>
              <p>{selectedProduct.name}</p>
              <input type="number" className={styles.filter} onChange={onIngredientAmountChange} /> g
              <button type="button" onClick={}>
                Add Ingredient
              </button>
            </div>
          ) : (
            <div>
              <p>Select product: </p>
              <ProductsList isItListForSelection />
            </div>
          )}
        </Drawer>
      ) : (
        <button type="button" onClick={() => setIsSidebarOpened(true)}>
          +
        </button>
      )}
      {meal.mealIngredients.ingredients.map((ingredient) => (
        <div>
          <p>{ingredient.products.name}</p>
          <span>C: {ingredient.products.carbs}</span>
          <span>F: {ingredient.products.fat}</span>
          <span>P: {ingredient.products.proteins}</span>
          <span>kcal: {ingredient.products.kcal}</span>
        </div>
      ))}
    </div>
  );
};

export default MealComponent;

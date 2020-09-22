import React, { FunctionComponent } from 'react';
import Meal from 'shared/interfaces/Meal.interface';
import Drawer from 'shared/hoc/Drawer';
import styles from './styles.module.scss';
import useMealComponentLogic from './useMealComponenLogict';
import ProductsList from '../../Products';

interface Props {
  mealName: 'breakfast' | 'secondBreakfast' | 'lunch' | 'dinner' | 'snack' | 'supper' | 'training';
  mealIngredients: Meal;
}

const MealComponent: FunctionComponent<Props> = (meal) => {
  const {
    isSidebarOpened,
    setIsSidebarOpened,
    ingredientAmount,
    selectedProduct,
    onAddIngredient,
    onRemoveIngredient,
    onCloseDrawerManually,
    onIngredientAmountChange,
  } = useMealComponentLogic();
  return (
    <div className={styles.container}>
      <p>{meal.mealName}</p>
      {isSidebarOpened ? (
        <Drawer close={onCloseDrawerManually}>
          {selectedProduct ? (
            <div>
              <p>{selectedProduct.name}</p>
              <input type="number" className={styles.filter} onChange={onIngredientAmountChange} /> g
              <button
                type="button"
                onClick={() =>
                  onAddIngredient({
                    name: meal.mealName,
                    ingredient: { products: selectedProduct, grams: ingredientAmount },
                  })
                }
              >
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
          <button
            type="button"
            onClick={() =>
              onRemoveIngredient({
                name: meal.mealName,
                ingredient,
              })
            }
          >
            remove Ingredient
          </button>
        </div>
      ))}
    </div>
  );
};

export default MealComponent;

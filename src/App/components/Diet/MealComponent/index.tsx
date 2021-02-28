import React, { FunctionComponent } from 'react';
import Meal from 'shared/interfaces/Meal.interface';
import Drawer from 'shared/hoc/Drawer';
import classes from 'shared/styles/globalStyles.module.scss';
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
    highlightElementHandler,
    selectedProduct,
    calculateCalories,
    onAddIngredient,
    onRemoveIngredient,
    onCloseDrawerManually,
    onIngredientAmountChange,
  } = useMealComponentLogic();
  return (
    <div className={styles.container}>
      <h4 className={styles.header}>{meal.mealName === 'secondBreakfast' ? 'second breakfast' : meal.mealName}</h4>
      {meal.mealIngredients.ingredients.map((ingredient, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`${index} ${ingredient.products.name}`}
          className={`${highlightElementHandler(ingredient) ? styles.highlighted : ''} ${styles.ingredient}`}
        >
          <div className={styles.ingredientHeader}>
            <p>{ingredient.products.name}</p>
          </div>
          <div className={styles.ingredientMacros}>
            <span>C: {ingredient.products.carbs * ingredient.grams * 0.01}</span>
            <span>F: {ingredient.products.fat * ingredient.grams * 0.01}</span>
            <span>P: {ingredient.products.proteins * ingredient.grams * 0.01}</span>
            <span>
              <strong>kcal: {calculateCalories(ingredient)}</strong>
            </span>
          </div>
          <button
            type="button"
            className={`${classes.buttonDefault} ${styles.removeButton}`}
            onClick={() =>
              onRemoveIngredient({
                name: meal.mealName,
                ingredient,
              })
            }
          >
            -
          </button>
        </div>
      ))}
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
        <button
          type="button"
          className={`${classes.buttonDefault} ${styles.addButton}`}
          onClick={() => setIsSidebarOpened(true)}
        >
          +
        </button>
      )}
    </div>
  );
};

export default MealComponent;

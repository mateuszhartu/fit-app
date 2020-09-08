import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import MealComponent from '../MealComponent';
import { RootState } from '../../../../shared/store/rootReducer';

const DailyDiet = () => {
  const { dailyDiet } = useSelector((state: RootState) => state.dailyDiet);

  return (
    <div>
      <div className={styles.productCard}>
        <MealComponent mealName="Breakfast" mealIngredients={dailyDiet.breakfast} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="Second breakfast" mealIngredients={dailyDiet.secondBreakfast} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="Lunch" mealIngredients={dailyDiet.lunch} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="Dinner" mealIngredients={dailyDiet.dinner} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="Snack" mealIngredients={dailyDiet.snack} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="Supper" mealIngredients={dailyDiet.supper} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="Training meal" mealIngredients={dailyDiet.training} />
      </div>
    </div>
  );
};

export default DailyDiet;

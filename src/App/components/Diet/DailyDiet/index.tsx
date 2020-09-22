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
        <MealComponent mealName="breakfast" mealIngredients={dailyDiet.breakfast} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="secondBreakfast" mealIngredients={dailyDiet.secondBreakfast} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="lunch" mealIngredients={dailyDiet.lunch} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="dinner" mealIngredients={dailyDiet.dinner} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="snack" mealIngredients={dailyDiet.snack} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="supper" mealIngredients={dailyDiet.supper} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="training" mealIngredients={dailyDiet.training} />
      </div>
    </div>
  );
};

export default DailyDiet;

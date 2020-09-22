import React from 'react';
import styles from './styles.module.scss';
import MealComponent from '../MealComponent';
import useDailyLogic from './useDailyDietLogic';

const DailyDiet = () => {
  const { dailyDiet, dailyCarbs, dailyFat, dailyProteins, dailyKcal } = useDailyLogic();
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
      <div className={styles.bottomBar}>
        <p>Carbs: {dailyCarbs}</p>
        <p>Fat: {dailyFat}</p>
        <p>Proteins: {dailyProteins}</p>
        <p>Kcal: {dailyKcal}</p>
      </div>
    </div>
  );
};

export default DailyDiet;

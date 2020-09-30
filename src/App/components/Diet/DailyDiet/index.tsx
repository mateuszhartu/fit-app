import React from 'react';
import styles from './styles.module.scss';
import MealComponent from '../MealComponent';
import useDailyLogic from './useDailyDietLogic';

const DailyDiet = () => {
  const {
    carbsGoal,
    fatGoal,
    proteinsGoal,
    kcalGoal,
    dailyMeals,
    dailyCarbs,
    dailyFat,
    dailyProteins,
    dailyKcal,
  } = useDailyLogic();
  return (
    <div>
      <div className={styles.productCard}>
        <MealComponent mealName="breakfast" mealIngredients={dailyMeals.breakfast} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="secondBreakfast" mealIngredients={dailyMeals.secondBreakfast} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="lunch" mealIngredients={dailyMeals.lunch} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="dinner" mealIngredients={dailyMeals.dinner} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="snack" mealIngredients={dailyMeals.snack} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="supper" mealIngredients={dailyMeals.supper} />
      </div>
      <div className={styles.productCard}>
        <MealComponent mealName="training" mealIngredients={dailyMeals.training} />
      </div>
      <div className={styles.bottomBar}>
        <p className={carbsGoal > dailyCarbs ? styles.success : styles.error}>Carbs: {dailyCarbs}</p>
        <p className={fatGoal > dailyFat ? styles.success : styles.error}>Fat: {dailyFat}</p>
        <p className={proteinsGoal > dailyProteins ? styles.success : styles.error}>Proteins: {dailyProteins}</p>
        <p className={kcalGoal > dailyKcal ? styles.success : styles.error}>Kcal: {dailyKcal}</p>
      </div>
    </div>
  );
};

export default DailyDiet;

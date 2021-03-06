import React from 'react';
import { Pie } from 'react-chartjs-2';
import globalStyles from 'shared/styles/globalStyles.module.scss';
import styles from './styles.module.scss';
import MealComponent from '../MealComponent';
import useDailyLogic from './useDailyDietLogic';

const DailyDiet = () => {
  const {
    dateShift,
    setDateShift,
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
    <div className={styles.container}>
      <div className={styles.dailyDiet}>
        <div className={styles.productsList}>
          <MealComponent mealName="breakfast" mealIngredients={dailyMeals.breakfast} />
          <MealComponent mealName="secondBreakfast" mealIngredients={dailyMeals.secondBreakfast} />
          <MealComponent mealName="lunch" mealIngredients={dailyMeals.lunch} />
          <MealComponent mealName="dinner" mealIngredients={dailyMeals.dinner} />
          <MealComponent mealName="snack" mealIngredients={dailyMeals.snack} />
          <MealComponent mealName="supper" mealIngredients={dailyMeals.supper} />
          <MealComponent mealName="training" mealIngredients={dailyMeals.training} />
        </div>
        <div className={styles.bottomBar}>
          <p className={carbsGoal > dailyCarbs ? styles.success : styles.error}>Carbs: {dailyCarbs}</p>
          <p className={fatGoal > dailyFat ? styles.success : styles.error}>Fat: {dailyFat}</p>
          <p className={proteinsGoal > dailyProteins ? styles.success : styles.error}>Proteins: {dailyProteins}</p>
          <p className={kcalGoal > dailyKcal ? styles.success : styles.error}>Kcal: {dailyKcal}</p>
        </div>
        <div className={styles.navButtons}>
          <button type="button" className={globalStyles.buttonDefault} onClick={() => setDateShift(dateShift - 1)}>
            prev
          </button>
          {dateShift !== 0 && (
            <button type="button" className={globalStyles.buttonDefault} onClick={() => setDateShift(dateShift + 1)}>
              next
            </button>
          )}
        </div>
      </div>
      <div className={styles.dietChart}>
        <Pie
          data={{
            datasets: [
              {
                data: [dailyCarbs, dailyProteins, dailyFat],
                backgroundColor: ['#83DBD6', '#E57872', '#2E7D9E'],
              },
            ],
            labels: ['Carbs', 'Proteins', 'Fat'],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
              callbacks: {
                // eslint-disable-next-line consistent-return,no-restricted-syntax
                label(
                  tooltipItem: { index: number; datasetIndex: number },
                  data: { labels: { [x: string]: string }; datasets: { data: number[] }[] }
                ) {
                  try {
                    let label = ` ${data.labels[tooltipItem.index]}` || '';

                    if (label) {
                      label += ': ';
                    }

                    const sum = data.datasets[0].data.reduce((accumulator, curValue) => {
                      return accumulator + curValue;
                    });
                    const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

                    label += `${Number((value / sum) * 100).toFixed(2)}%`;
                    return label;
                  } catch (error) {
                    console.log(error);
                  }
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DailyDiet;

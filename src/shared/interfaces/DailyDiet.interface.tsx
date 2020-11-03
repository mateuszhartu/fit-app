import Meal from './Meal.interface';

export default interface DailyDiet {
  dailyMeals: {
    breakfast: Meal;
    secondBreakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snack: Meal;
    supper: Meal;
    training: Meal;
  };
  dailyKcal: number;
  dailyCarbs: number;
  dailyFat: number;
  dailyProteins: number;
  date: string;
}

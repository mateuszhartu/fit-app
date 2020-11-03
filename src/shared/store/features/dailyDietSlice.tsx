import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Meal from 'shared/interfaces/Meal.interface';
import Ingredient from 'shared/interfaces/Ingredient.interface';
import _ from 'lodash';
import moment from 'moment';

interface DailyDietState {
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

interface SetDailyDietPayload {
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

export const initialState: DailyDietState = {
  dailyMeals: {
    breakfast: {
      ingredients: [],
      kcal: 0,
    },
    secondBreakfast: {
      ingredients: [],
      kcal: 0,
    },
    lunch: {
      ingredients: [],
      kcal: 0,
    },
    dinner: {
      ingredients: [],
      kcal: 0,
    },
    snack: {
      ingredients: [],
      kcal: 0,
    },
    supper: {
      ingredients: [],
      kcal: 0,
    },
    training: {
      ingredients: [],
      kcal: 0,
    },
  },
  dailyCarbs: 0,
  dailyFat: 0,
  dailyProteins: 0,
  dailyKcal: 0,
  date: moment().format('YYYY-MM-DD'),
};

export interface SetMealIngredientsPayload {
  name: keyof typeof initialState.dailyMeals;
  ingredient: Ingredient;
}

const dailyDietSlice = createSlice({
  name: 'dailyDiet',
  initialState,
  reducers: {
    setDailyDiet: (state, action: PayloadAction<SetDailyDietPayload>) => {
      state.dailyMeals = action.payload.dailyMeals;
      state.dailyProteins = action.payload.dailyProteins;
      state.dailyFat = action.payload.dailyFat;
      state.dailyCarbs = action.payload.dailyCarbs;
      state.dailyKcal = action.payload.dailyKcal;
      state.date = action.payload.date;
    },
    addMealIngredient: (state, action: PayloadAction<SetMealIngredientsPayload>) => {
      state.dailyMeals[action.payload.name].ingredients.push(action.payload.ingredient);
      state.dailyProteins += (action.payload.ingredient.products.proteins * action.payload.ingredient.grams) / 100;
      state.dailyFat += (action.payload.ingredient.products.fat * action.payload.ingredient.grams) / 100;
      state.dailyCarbs += (action.payload.ingredient.products.carbs * action.payload.ingredient.grams) / 100;
      state.dailyKcal = (state.dailyCarbs + state.dailyFat + state.dailyProteins) * 4;
    },
    removeIngredient: (state, action: PayloadAction<SetMealIngredientsPayload>) => {
      const removedElementIndex = state.dailyMeals[action.payload.name].ingredients.findIndex((ingredient) => {
        return _.isEqual(ingredient, action.payload.ingredient);
      });
      state.dailyMeals[action.payload.name].ingredients.splice(removedElementIndex, 1);
      state.dailyProteins -= (action.payload.ingredient.products.proteins * action.payload.ingredient.grams) / 100;
      state.dailyFat -= (action.payload.ingredient.products.fat * action.payload.ingredient.grams) / 100;
      state.dailyCarbs -= (action.payload.ingredient.products.carbs * action.payload.ingredient.grams) / 100;
      state.dailyKcal = (state.dailyCarbs + state.dailyFat + state.dailyProteins) * 4;
    },
    setDailyDietDate: (state, action: PayloadAction<SetDailyDietPayload>) => {
      state.date = action.payload.date;
    },
  },
});

export const { setDailyDiet, addMealIngredient, removeIngredient, setDailyDietDate } = dailyDietSlice.actions;

export default dailyDietSlice.reducer;

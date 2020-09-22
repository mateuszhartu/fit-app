import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Meal from 'shared/interfaces/Meal.interface';
import Ingredient from 'shared/interfaces/Ingredient.interface';
import _ from 'lodash';

interface DailyDietState {
  dailyDiet: {
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
  date: Date;
}

export const initialState: DailyDietState = {
  dailyDiet: {
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
  date: new Date(),
};

export interface SetMealIngredientsPayload {
  name: keyof typeof initialState.dailyDiet;
  ingredient: Ingredient;
}

const dailyDietSlice = createSlice({
  name: 'dailyDiet',
  initialState,
  reducers: {
    addMealIngredient: (state, action: PayloadAction<SetMealIngredientsPayload>) => {
      state.dailyDiet[action.payload.name].ingredients.push(action.payload.ingredient);
      state.dailyProteins += (action.payload.ingredient.products.proteins * action.payload.ingredient.grams) / 100;
      state.dailyFat += (action.payload.ingredient.products.fat * action.payload.ingredient.grams) / 100;
      state.dailyCarbs += (action.payload.ingredient.products.carbs * action.payload.ingredient.grams) / 100;
      state.dailyKcal = (state.dailyCarbs + state.dailyFat + state.dailyProteins) * 4;
    },
    removeIngredient: (state, action: PayloadAction<SetMealIngredientsPayload>) => {
      const removedElementIndex = state.dailyDiet[action.payload.name].ingredients.findIndex((ingredient) => {
        return _.isEqual(ingredient, action.payload.ingredient);
      });
      state.dailyDiet[action.payload.name].ingredients.splice(removedElementIndex, 1);
      state.dailyProteins -= (action.payload.ingredient.products.proteins * action.payload.ingredient.grams) / 100;
      state.dailyFat -= (action.payload.ingredient.products.fat * action.payload.ingredient.grams) / 100;
      state.dailyCarbs -= (action.payload.ingredient.products.carbs * action.payload.ingredient.grams) / 100;
      state.dailyKcal = (state.dailyCarbs + state.dailyFat + state.dailyProteins) * 4;
    },
  },
});

export const { addMealIngredient, removeIngredient } = dailyDietSlice.actions;

export default dailyDietSlice.reducer;
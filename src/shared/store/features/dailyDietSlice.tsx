import {createReducer, createSlice, PayloadAction} from '@reduxjs/toolkit';
import Meal from 'shared/interfaces/Meal.interface';

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
  date: Date;
}

interface SetDailyDietPayload {
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
  dailyKcal: 0,
  date: new Date(),
};

const dailyDietSlice = createSlice({
  name: 'dailyDiet',
  initialState,
  reducers: {
    setDailyDiet: (state, action: PayloadAction<SetDailyDietPayload>) => {
      state.dailyDiet = action.payload.dailyDiet;
    },
    setMealIngredients: (state, action) => {
      // @ts-ignore
      state.dailyDiet[action.name].ingredients = [];
    },
  },
});

export const { setDailyDiet, setMealIngredients } = dailyDietSlice.actions;

export default dailyDietSlice.reducer;

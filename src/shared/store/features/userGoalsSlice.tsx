import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UseGoalsState {
  carbsGoal: number;
  fatGoal: number;
  proteinsGoal: number;
  kcalGoal: number;
}

interface SetUserGoalsPayload {
  carbsGoal: number;
  fatGoal: number;
  proteinsGoal: number;
  kcalGoal: number;
}

export const initialState: UseGoalsState = {
  carbsGoal: 400,
  fatGoal: 150,
  proteinsGoal: 200,
  kcalGoal: 3000,
};

const userGoalsSlice = createSlice({
  name: 'userGoals',
  initialState,
  reducers: {
    setUserGoals: (state, action: PayloadAction<SetUserGoalsPayload>) => {
      state.carbsGoal = action.payload.carbsGoal;
      state.fatGoal = action.payload.fatGoal;
      state.proteinsGoal = action.payload.proteinsGoal;
      state.kcalGoal = (state.carbsGoal + state.fatGoal + state.proteinsGoal) * 4;
    },
  },
});

export const { setUserGoals } = userGoalsSlice.actions;

export default userGoalsSlice.reducer;

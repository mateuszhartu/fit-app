import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/store/rootReducer';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { updateDiet, getDiet } from 'shared/api/diet';
import DailyDiet from 'shared/interfaces/DailyDiet.interface';
import { setDailyDiet } from 'shared/store/features/dailyDietSlice';

const useDailyLogic = () => {
  const dispatch = useDispatch();
  const { dailyMeals, dailyCarbs, dailyFat, dailyProteins, dailyKcal } = useSelector(
    (state: RootState) => state.dailyDiet
  );
  const { dailyDiet } = useSelector((state: RootState) => state);
  const { carbsGoal, fatGoal, proteinsGoal, kcalGoal } = useSelector((state: RootState) => state.userGoals);
  const firstUpdate = useRef(true);

  useEffect(() => {
    getDiet().then((fetchedDiet: DailyDiet) => {
      interface FetchedObject<T> {
        [index: string]: T;
      }
      const mealsObject: FetchedObject<object> = fetchedDiet.dailyMeals;
      Object.keys(mealsObject).forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(mealsObject[key], 'ingredients')) {
          mealsObject[key] = {
            ingredients: [],
            kcal: 0,
          };
        }
      });
      dispatch(
        setDailyDiet({
          dailyMeals: fetchedDiet.dailyMeals,
          dailyProteins: fetchedDiet.dailyProteins,
          dailyFat: fetchedDiet.dailyFat,
          dailyCarbs: fetchedDiet.dailyCarbs,
          dailyKcal: fetchedDiet.dailyKcal,
          date: fetchedDiet.date,
        })
      );
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    updateDiet(dailyDiet).then(() => console.log('here will be alert'));
  }, [dailyDiet]);

  return {
    carbsGoal,
    fatGoal,
    proteinsGoal,
    kcalGoal,
    dailyMeals,
    dailyCarbs,
    dailyFat,
    dailyProteins,
    dailyKcal,
  };
};
export default useDailyLogic;

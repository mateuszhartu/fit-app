import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/store/rootReducer';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { updateDiet, getDiet, addDiet } from 'shared/api/diet';
import DailyDiet from 'shared/interfaces/DailyDiet.interface';
import { setDailyDiet } from 'shared/store/features/dailyDietSlice';
import moment from 'moment';

const useDailyLogic = () => {
  const dispatch = useDispatch();
  const { dailyMeals, dailyCarbs, dailyFat, dailyProteins, dailyKcal } = useSelector(
    (state: RootState) => state.dailyDiet
  );
  const { dailyDiet } = useSelector((state: RootState) => state);
  const { carbsGoal, fatGoal, proteinsGoal, kcalGoal } = useSelector((state: RootState) => state.userGoals);
  const [dateShift, setDateShift] = useState(0);
  const [dietId, setDietId] = useState('');
  const firstUpdate = useRef(true);

  useEffect(() => {
    const currentDate = moment().add(dateShift, 'days').format('YYYY-MM-DD');
    getDiet(currentDate, currentDate).then((fetchedDiet: DailyDiet) => {
      interface FetchedObject<T> {
        [index: string]: T;
      }
      if (Object.keys(fetchedDiet).length === 0) {
        return;
      }
      setDietId(Object.keys(fetchedDiet).toString());
      const fetchedDailyDiet = Object.values(fetchedDiet);
      const mealsObject: FetchedObject<object> = fetchedDailyDiet[0].dailyMeals;
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
          dailyMeals: fetchedDailyDiet[0].dailyMeals,
          dailyProteins: fetchedDailyDiet[0].dailyProteins,
          dailyFat: fetchedDailyDiet[0].dailyFat,
          dailyCarbs: fetchedDailyDiet[0].dailyCarbs,
          dailyKcal: fetchedDailyDiet[0].dailyKcal,
          date: fetchedDailyDiet[0].date,
          settings: {
            kcal: kcalGoal,
            proteins: proteinsGoal,
            carbs: carbsGoal,
            fat: fatGoal,
          },
        })
      );
    });
  }, [dateShift]); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (dailyDiet.date === moment().add(dateShift, 'days').format('YYYY-MM-DD') && dietId !== '') {
      updateDiet(dailyDiet, dietId).then(() => console.log('here will be alert'));
      return;
    }
    addDiet(dailyDiet).then((diet: any) => setDietId(diet.data.name));
  }, [dailyDiet]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    setDateShift,
    dateShift,
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

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/store/rootReducer';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { updateDiet, getDiet, addDiet } from 'shared/api/diet';
import DailyDiet from 'shared/interfaces/DailyDiet.interface';
import { setDailyDiet, initialState } from 'shared/store/features/dailyDietSlice';
import { setHighlightedProducts } from 'shared/store/features/highlightedProducts';
import moment from 'moment';
import Ingredient from 'shared/interfaces/Ingredient.interface';
import FetchedFirebaseData from 'shared/interfaces/FetchedDailyDiet.interface';
import Meal from 'shared/interfaces/Meal.interface';

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

  interface FetchedObject<T> {
    [index: string]: T;
  }

  // TODO wydziel funkcję
  const highlightProductHandler = (diet: DailyDiet) => {
    let tempCarbsArray: Ingredient[] = [];
    let tempFatArray: Ingredient[] = [];
    let tempProteinsArray: Ingredient[] = [];
    const mealsObject: FetchedObject<Meal> = diet.dailyMeals;
    for (const key in mealsObject) {
      if (mealsObject[key].ingredients.length !== 0) {
        for (let index = 0; index < mealsObject[key].ingredients.length; index += 1) {
          const p = mealsObject[key].ingredients[index];
          if (dailyDiet.dailyCarbs > carbsGoal) {
            if (tempCarbsArray.length < 3) {
              tempCarbsArray.push(p);
            } else if (
              tempCarbsArray.some(
                (ingredient) => ingredient.products.carbs * ingredient.grams * 0.01 < p.products.carbs * p.grams * 0.01
              ) &&
              tempCarbsArray.length === 3
            ) {
              const min = Math.min(...tempCarbsArray.map((item) => item.products.carbs * item.grams * 0.01));
              tempCarbsArray = tempCarbsArray.filter((item) => item.products.carbs * item.grams * 0.01 !== min);
              tempCarbsArray.push(p);
            }
          }
          if (dailyDiet.dailyFat > fatGoal) {
            if (tempFatArray.length < 3) {
              tempFatArray.push(p);
            } else if (
              tempFatArray.some(
                (ingredient) => ingredient.products.fat * ingredient.grams * 0.01 < p.products.fat * p.grams * 0.01
              )
            ) {
              const min = Math.min(...tempFatArray.map((item) => item.products.fat * item.grams * 0.01));
              tempFatArray = tempFatArray.filter((item) => item.products.fat * item.grams * 0.01 !== min);
            }
          }
          if (dailyDiet.dailyProteins > proteinsGoal) {
            if (tempProteinsArray.length < 3) {
              tempProteinsArray.push(p);
            } else if (
              tempProteinsArray.some(
                (ingredient) =>
                  ingredient.products.proteins * ingredient.grams * 0.01 < p.products.proteins * p.grams * 0.01
              )
            ) {
              const min = Math.min(...tempProteinsArray.map((item) => item.products.proteins * item.grams * 0.01));
              tempProteinsArray = tempProteinsArray.filter(
                (item) => item.products.proteins * item.grams * 0.01 !== min
              );
              tempProteinsArray.push(p);
            }
          }
        }
      }
    }
    dispatch(
      setHighlightedProducts({
        highlightedCarbs: tempCarbsArray,
        highlightedProteins: tempProteinsArray,
        highlightedFat: tempFatArray,
      })
    );
  };

  useEffect(() => {
    const currentDate = moment().add(dateShift, 'days').format('YYYY-MM-DD');
    getDiet(currentDate, currentDate).then((fetchedDiet: FetchedFirebaseData) => {
      if (Object.keys(fetchedDiet).length === 0) {
        setDietId('');
        dispatch(
          setDailyDiet({
            dailyMeals: initialState.dailyMeals,
            dailyProteins: initialState.dailyProteins,
            dailyFat: initialState.dailyFat,
            dailyCarbs: initialState.dailyCarbs,
            dailyKcal: initialState.dailyKcal,
            date: moment().add(dateShift, 'days').format('YYYY-MM-DD'),
            settings: {
              kcal: kcalGoal,
              proteins: proteinsGoal,
              carbs: carbsGoal,
              fat: fatGoal,
            },
          })
        );
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

  useEffect(() => {
    highlightProductHandler(dailyDiet);
  }, [dailyDiet]); // eslint-disable-line react-hooks/exhaustive-deps

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

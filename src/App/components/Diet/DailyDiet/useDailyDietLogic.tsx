import { useSelector } from 'react-redux';
import { RootState } from 'shared/store/rootReducer';

const useDailyLogic = () => {
  const { dailyDiet, dailyCarbs, dailyFat, dailyProteins, dailyKcal } = useSelector(
    (state: RootState) => state.dailyDiet
  );

  return {
    dailyDiet,
    dailyCarbs,
    dailyFat,
    dailyProteins,
    dailyKcal,
  };
};
export default useDailyLogic;

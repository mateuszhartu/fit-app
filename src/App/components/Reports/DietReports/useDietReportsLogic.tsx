import { useEffect, useState } from 'react';
import { getDiet } from 'shared/api/diet';
import DailyDiet from 'shared/interfaces/DailyDiet.interface';
import moment from 'moment';

const useDietReportsLogic = () => {
  const [numberOfDisplayedDays, setNumberOfDisplayedDays] = useState(3);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const startDate = moment()
      .subtract(numberOfDisplayedDays - 1, 'days')
      .format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    getDiet(startDate, endDate).then((fetchedDiet: DailyDiet) => {
      const dietDate = [];
      const dietCalories = [];
      for (const key in fetchedDiet) {
        if (Object.prototype.hasOwnProperty.call(fetchedDiet, key)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          dietDate.push(fetchedDiet[key].date);
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          dietCalories.push(fetchedDiet[key].dailyKcal);
        }
      }
      setChartData({
        labels: dietDate,
        datasets: [
          {
            label: 'Calories',
            data: dietCalories,
          },
        ],
      });
    });
  }, [numberOfDisplayedDays]);

  return {
    numberOfDisplayedDays,
    chartData,
  };
};
export default useDietReportsLogic;

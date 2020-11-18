import { useEffect, useState } from 'react';
import { getDiet } from 'shared/api/diet';
import DailyDiet from 'shared/interfaces/DailyDiet.interface';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/store/rootReducer';

const useDietReportsLogic = () => {
  const [numberOfDisplayedDays, setNumberOfDisplayedDays] = useState(3);
  const { carbsGoal, fatGoal, proteinsGoal, kcalGoal } = useSelector((state: RootState) => state.userGoals);
  const [chartLabel, setChartLabel] = useState('Calories');
  const [chartProperty, setChartProperty] = useState('dailyKcal');
  const [goalChartProperty, setGoalChartProperty] = useState('kcal');
  const [goalPropertyValue, setGoalPropertyValue] = useState(kcalGoal);
  const [chartData, setChartData] = useState({});

  function validateData(dietDates: string[], dietData: number[], dietGoals: number[]) {
    const dataDates: string[] = [];
    let startDate = moment()
      .subtract(numberOfDisplayedDays - 1, 'days')
      .format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    while (startDate <= endDate) {
      dataDates.push(startDate);
      startDate = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
    }

    // eslint-disable-next-line array-callback-return
    dataDates.map((d) => {
      if (!dietDates.includes(d)) {
        dietData.splice(dataDates.indexOf(d), 0, 0);
        dietGoals.splice(dataDates.indexOf(d), 0, goalPropertyValue);
      }
    });

    setChartData({
      labels: dataDates,
      datasets: [
        {
          label: chartLabel,
          data: dietData,
        },
        {
          label: 'Goal',
          data: dietGoals,
          type: 'line',
          borderColor: 'red',
          backgroundColor: 'transparent',
          steppedLine: true,
        },
      ],
    });
  }

  function setChartProperties(label: string, property: string, goalValue: number, goalProperty: string) {
    setChartLabel(label);
    setChartProperty(property);
    setGoalPropertyValue(goalValue);
    setGoalChartProperty(goalProperty);
  }

  useEffect(() => {
    const startDate = moment()
      .subtract(numberOfDisplayedDays - 1, 'days')
      .format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    getDiet(startDate, endDate).then((fetchedDiet: DailyDiet) => {
      const dietDates = [];
      const dietData = [];
      const dietGoals = [];
      for (const key in fetchedDiet) {
        if (Object.prototype.hasOwnProperty.call(fetchedDiet, key)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          dietDates.push(fetchedDiet[key].date);
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          dietData.push(fetchedDiet[key][chartProperty]);
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          dietGoals.push(fetchedDiet[key].settings[goalChartProperty]);
        }
      }
      validateData(dietDates, dietData, dietGoals);
    });
  }, [numberOfDisplayedDays, setChartProperties]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    numberOfDisplayedDays,
    setNumberOfDisplayedDays,
    setChartProperties,
    carbsGoal,
    fatGoal,
    proteinsGoal,
    kcalGoal,
    chartData,
  };
};
export default useDietReportsLogic;

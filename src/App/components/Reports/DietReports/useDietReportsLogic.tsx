import { useEffect, useState } from 'react';
import { getDiet } from 'shared/api/diet';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/store/rootReducer';

const useDietReportsLogic = () => {
  const [numberOfDisplayedDays, setNumberOfDisplayedDays] = useState(3);
  const { carbsGoal, fatGoal, proteinsGoal, kcalGoal } = useSelector((state: RootState) => state.userGoals);
  const [showCalories, setShowCalories] = useState(true);
  const [showFat, setShowFat] = useState(false);
  const [showCarbs, setShowCarbs] = useState(false);
  const [showProteins, setShowProteins] = useState(false);
  const [chartData, setChartData] = useState({});

  function validateData(
    dietDates: string[],
    chart: {
      dietDataFat: number[];
      dietDataCarbs: number[];
      dietDataProteins: number[];
      dietDataKcal: number[];
      kcalGoals: number[];
      proteinsGoals: number[];
      carbsGoals: number[];
      fatGoals: number[];
    }
  ) {
    const dataDates: string[] = [];
    let startDate = moment()
      .subtract(numberOfDisplayedDays - 1, 'days')
      .format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    while (startDate <= endDate) {
      dataDates.push(startDate);
      startDate = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
    }

    dataDates.forEach((d) => {
      if (!dietDates.includes(d)) {
        chart.dietDataKcal.splice(dataDates.indexOf(d), 0, 0);
        chart.dietDataProteins.splice(dataDates.indexOf(d), 0, 0);
        chart.dietDataCarbs.splice(dataDates.indexOf(d), 0, 0);
        chart.dietDataFat.splice(dataDates.indexOf(d), 0, 0);
        chart.kcalGoals.splice(dataDates.indexOf(d), 0, kcalGoal);
        chart.proteinsGoals.splice(dataDates.indexOf(d), 0, proteinsGoal * 4);
        chart.fatGoals.splice(dataDates.indexOf(d), 0, fatGoal * 4);
        chart.carbsGoals.splice(dataDates.indexOf(d), 0, carbsGoal * 4);
      }
    });

    setChartData({
      labels: dataDates,
      datasets: [
        {
          label: 'Calories',
          data: chart.dietDataKcal,
          borderColor: '#FFAE49',
          borderWidth: 4,
          fill: false,
          pointRadius: 0,
          hidden: !showCalories,
        },
        {
          label: 'Fat',
          data: chart.dietDataFat,
          borderColor: '#2E7D9E',
          borderWidth: 4,
          fill: false,
          pointRadius: 0,
          hidden: !showFat,
        },
        {
          label: 'Carbs',
          data: chart.dietDataCarbs,
          borderColor: '#83DBD6',
          borderWidth: 4,
          fill: false,
          pointRadius: 0,
          hidden: !showCarbs,
        },
        {
          label: 'Proteins',
          data: chart.dietDataProteins,
          borderColor: '#E57872',
          borderWidth: 4,
          fill: false,
          pointRadius: 0,
          hidden: !showProteins,
        },
        {
          label: 'Kcal Goal',
          data: chart.kcalGoals,
          type: 'line',
          borderColor: '#FFAE49',
          borderWidth: 2,
          fill: false,
          steppedLine: true,
          pointRadius: 0,
          hidden: !showCalories,
        },
        {
          label: 'Fat Goal',
          data: chart.fatGoals,
          type: 'line',
          borderColor: '#2e7d9e',
          borderWidth: 2,
          fill: false,
          steppedLine: true,
          pointRadius: 0,
          hidden: !showFat,
        },
        {
          label: 'Carbs Goal',
          data: chart.carbsGoals,
          type: 'line',
          borderColor: '#83DBD6',
          borderWidth: 2,
          fill: false,
          steppedLine: true,
          pointRadius: 0,
          hidden: !showCarbs,
        },
        {
          label: 'Proteins Goal',
          data: chart.proteinsGoals,
          type: 'line',
          borderColor: '#E57872',
          borderWidth: 2,
          fill: false,
          steppedLine: true,
          pointRadius: 0,
          hidden: !showProteins,
        },
      ],
    });
  }

  useEffect(() => {
    const startDate = moment()
      .subtract(numberOfDisplayedDays - 1, 'days')
      .format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    getDiet(startDate, endDate).then((fetchedDiet: any) => {
      const dietDates = [];
      const dietDataKcal: number[] = [];
      const dietDataFat: number[] = [];
      const dietDataProteins: number[] = [];
      const dietDataCarbs: number[] = [];
      const kcalGoals: number[] = [];
      const carbsGoals: number[] = [];
      const fatGoals: number[] = [];
      const proteinsGoals: number[] = [];
      for (const key in fetchedDiet) {
        if (Object.prototype.hasOwnProperty.call(fetchedDiet, key)) {
          dietDates.push(fetchedDiet[key].date);
          dietDataKcal.push(fetchedDiet[key].dailyKcal);
          dietDataFat.push(fetchedDiet[key].dailyFat * 4);
          dietDataProteins.push(fetchedDiet[key].dailyProteins * 4);
          dietDataCarbs.push(fetchedDiet[key].dailyCarbs * 4);
          kcalGoals.push(fetchedDiet[key].settings.kcal);
          carbsGoals.push(fetchedDiet[key].settings.carbs * 4);
          fatGoals.push(fetchedDiet[key].settings.fat * 4);
          proteinsGoals.push(fetchedDiet[key].settings.proteins * 4);
        }
      }
      const dietData = {
        dietDataKcal,
        dietDataFat,
        dietDataProteins,
        dietDataCarbs,
        kcalGoals,
        carbsGoals,
        fatGoals,
        proteinsGoals,
      };
      validateData(dietDates, dietData);
    });
  }, [numberOfDisplayedDays, showCalories, showFat, showCarbs, showProteins]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    numberOfDisplayedDays,
    setNumberOfDisplayedDays,
    showCalories,
    showCarbs,
    showProteins,
    showFat,
    setShowCalories,
    setShowCarbs,
    setShowFat,
    setShowProteins,
    chartData,
  };
};
export default useDietReportsLogic;

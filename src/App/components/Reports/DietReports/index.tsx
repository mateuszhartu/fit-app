import React from 'react';
import { Line } from 'react-chartjs-2';
import useDietReportsLogic from './useDietReportsLogic';

const DietReports = () => {
  const {
    setNumberOfDisplayedDays,
    setChartProperties,
    carbsGoal,
    fatGoal,
    proteinsGoal,
    kcalGoal,
    chartData,
  } = useDietReportsLogic();
  return (
    <div>
      <div>
        <button type="button" onClick={() => setNumberOfDisplayedDays(3)}>
          3 days
        </button>
        <button type="button" onClick={() => setNumberOfDisplayedDays(5)}>
          5 days
        </button>
        <button type="button" onClick={() => setNumberOfDisplayedDays(7)}>
          7 days
        </button>
      </div>
      <div style={{ height: '800px', width: '1600px' }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div>
        <button type="button" onClick={() => setChartProperties('Calories', 'dailyKcal', kcalGoal, 'kcal')}>
          kcal
        </button>
        <button type="button" onClick={() => setChartProperties('Carbs', 'dailyCarbs', carbsGoal, 'carbs')}>
          carbs
        </button>
        <button type="button" onClick={() => setChartProperties('Fat', 'dailyFat', fatGoal, 'fat')}>
          fat
        </button>
        <button type="button" onClick={() => setChartProperties('Proteins', 'dailyProteins', proteinsGoal, 'proteins')}>
          proteins
        </button>
      </div>
    </div>
  );
};

export default DietReports;

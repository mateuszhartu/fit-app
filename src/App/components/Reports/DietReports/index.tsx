import React from 'react';
import { Line } from 'react-chartjs-2';
import useDietReportsLogic from './useDietReportsLogic';
import styles from './styles.module.scss';

const DietReports = () => {
  const {
    setNumberOfDisplayedDays,
    chartData,
    showCalories,
    showCarbs,
    showProteins,
    showFat,
    setShowFat,
    setShowProteins,
    setShowCarbs,
    setShowCalories,
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
            tooltips: {
              mode: 'index',
              intersect: false,
            },
            hover: {
              mode: 'nearest',
              intersect: true,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className={styles.checkboxes}>
        <label>
          <input type="checkbox" checked={showCalories} onChange={(event) => setShowCalories(event.target.checked)} />
          Calories
        </label>
        <label>
          <input type="checkbox" checked={showCarbs} onChange={(event) => setShowCarbs(event.target.checked)} />
          Carbs
        </label>
        <label>
          <input type="checkbox" checked={showFat} onChange={(event) => setShowFat(event.target.checked)} />
          Fat
        </label>
        <label>
          <input type="checkbox" checked={showProteins} onChange={(event) => setShowProteins(event.target.checked)} />
          Proteins
        </label>
      </div>
    </div>
  );
};

export default DietReports;

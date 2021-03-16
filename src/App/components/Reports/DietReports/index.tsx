import React from 'react';
import { Line } from 'react-chartjs-2';
import globalStyles from 'shared/styles/globalStyles.module.scss';
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
        <label className={styles.checkbox}>
          <input type="checkbox" checked={showCalories} onChange={(event) => setShowCalories(event.target.checked)} />
          <span className={styles.checkboxText}>Calories</span>
        </label>
        <label className={styles.checkbox}>
          <input type="checkbox" checked={showCarbs} onChange={(event) => setShowCarbs(event.target.checked)} />
          <span>Carbs</span>
        </label>
        <label className={styles.checkbox}>
          <input type="checkbox" checked={showFat} onChange={(event) => setShowFat(event.target.checked)} />
          <span>Fat</span>
        </label>
        <label className={styles.checkbox}>
          <input type="checkbox" checked={showProteins} onChange={(event) => setShowProteins(event.target.checked)} />
          <span>Proteins</span>
        </label>
      </div>
      <div>
        <button type="button" className={globalStyles.buttonDefault} onClick={() => setNumberOfDisplayedDays(3)}>
          3 days
        </button>
        <button type="button" className={globalStyles.buttonDefault} onClick={() => setNumberOfDisplayedDays(5)}>
          5 days
        </button>
        <button type="button" className={globalStyles.buttonDefault} onClick={() => setNumberOfDisplayedDays(7)}>
          7 days
        </button>
      </div>
    </div>
  );
};

export default DietReports;

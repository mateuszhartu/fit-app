import React from 'react';
import Chart from 'shared/components/Chart';
import useDietReportsLogic from './useDietReportsLogic';

const DietReports = () => {
  const { numberOfDisplayedDays, chartData } = useDietReportsLogic();
  return (
    <div>
      {/*
 // @ts-ignore */}
      <Chart chartData={chartData} />
    </div>
  );
};

export default DietReports;

import React from 'react';
import { Line } from 'react-chartjs-2';

interface ChartProps {
  chartData: {
    labels: string[];
    datasets: [
      {
        label: string;
        data: number[];
      }
    ];
  };
}

const Chart: React.FunctionComponent<ChartProps> = ({ chartData }) => {
  return (
    <div className="container">
      <Line data={chartData} />
    </div>
  );
};

export default Chart;

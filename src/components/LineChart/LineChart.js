import React from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import './LineChart.css'

function LineChart({ chartData, options, width }) {

  // console.log('Line chart', chartData);

  return (
      <Line className='LineChart' data={chartData} options={options} />
  )
}

export default LineChart;
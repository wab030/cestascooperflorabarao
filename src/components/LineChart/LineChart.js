import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './LineChart.css'

function LineChart({ chartData, options, width }) {

  // console.log('Line chart', chartData);

  return (
      <Line className='LineChart' data={chartData} options={options} />
  )
}

export default LineChart;
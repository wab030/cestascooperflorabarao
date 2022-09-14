import { useState } from 'react';
import { data } from '../../data/cooperflorabarao';
import LineChart from '../LineChart/LineChart';
import Charts from '../Charts/Charts';
import './MainChart.css';

const MainChart = () => {

  const [chartData, setChartData] = useState({
    labels: data.cooperflorabarao.deliveries.map((data) => data.dateText),
    datasets: [{
      label: "Cestas Comercializadas",
      data: data.cooperflorabarao.deliveries.map((data) => data.cestas),
      backgroundColor: ['red'],
      borderColor: '#FA6210',
      borderWidth: 2
    }]
  });

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: 'black',
          font: {
            size: 16,
          }
        }
      },
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 16
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: 'Número de Cestas Comercializadas',
        font : {
          size: 20
        }
      },
    },
  };

  return (
    <div class='MainChart'>
      <LineChart chartData={chartData} options={options} width={'100%'} />
    </div>
  )
}

export default MainChart;
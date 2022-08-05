import { useState } from 'react';
import { data } from '../../data/cooperflorabarao';
import LineChart from '../LineChart/LineChart';
import './ChartArea.css';

const ChartsArea = () => {
  
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
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: 'Número de Cestas Comercializadas',
      },
    },
  };

  return(
    <div class='ChartArea'>
      <LineChart chartData={chartData} options={options} width={'100%'}/> 
    </div>
  )
}

export default ChartsArea;
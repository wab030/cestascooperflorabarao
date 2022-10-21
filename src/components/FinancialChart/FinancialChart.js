import { useEffect, useState } from 'react';
import { data } from '../../data/cooperflorabarao';
import LineChart from '../LineChart/LineChart';
import Charts from '../Charts/Charts';
import './FinancialChart.css';

const FinancialChart = () => {

  

  useEffect( () => {
    data.cooperflorabarao.deliveries.map((data) => {
      totalAmountBaseProduct = data.cestas * data.cooperflorabarao.group.baseProductsPrice;
      console.log(totalAmountBaseProduct);
      // return;    
    })
  }, [])



  const [chartData, setChartData] = useState({
    labels: data.cooperflorabarao.deliveries.map((data) => data.dateText),
    datasets: [{
      label: "Volume Financeiro Comercializado",
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
    <div class='FinancialChart'>
      <LineChart chartData={chartData} options={options} width={'100%'} />
    </div>
  )
}

export default FinancialChart;
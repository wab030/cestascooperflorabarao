import { useState } from 'react';
import { data } from '../../data/cooperflorabarao';
import LineChart from '../LineChart/LineChart';
import './MainChart.css';

const MainChart = () => {

  //Multiple charts
  const [chartData, setChartData] = useState({
    data: {
      labels: data.cooperflorabarao.deliveries.map((data) => data.dateText),
      datasets: [{
        type: 'line',
        label: 'Vendas Produtos Extras',
        yAxisID: 'A',
        data: data.cooperflorabarao.deliveries.map((data) => data.totalAmountExtraProductsSales),
        fill: false,
        tension: 0.2,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132)',
      }, {
        type: 'line',
        label: 'Vendas de Cestas',
        yAxisID: 'B',
        data: data.cooperflorabarao.deliveries.map((data) => data.totalAmountBaseProductsSale),
        fill: false,
        tension: 0.2,
        backgroundColor: 'rgb(122, 99, 255)',
        borderColor: 'rgba(102, 99, 255)',
      }, {
        type: 'bar',
        label: '# Cestas Comercializadas',
        yAxisID: 'C',
        data: data.cooperflorabarao.deliveries.map((data) => data.cestas),
        fill: true,
        tension: 0.4,
        backgroundColor: 'rgb(45, 101, 53, 0.4)',
        borderColor: 'rgba(102, 99, 255, 0.4)',
      }]
    },
    options: {
      responsive: true,
      // animationEnabled: true,	
      scales: {
        A: {
          type: 'linear',
          position: 'left',
          min: 0,
          max: 3000,
          ticks: {
            // max: 3000, min: 0,
            color: 'black',
            font: {
              size: 16,
            },
            callback: function (value, index, values) {
              if (parseInt(value) >= 0) {
                return 'R$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              } else {
                return '$' + value;
              }
            }
          },
          grid: {
            display: false,
          }
        },
        B: {
          type: 'linear',
          position: 'left',
          display: false,
          min: 0,
          max: 3000,
          ticks: {
            // max: 3000, min: 0,
            color: 'black',
            font: {
              size: 16,
            },
          },
        },
        C: {
          type: 'linear',
          position: 'right',
          display: true,
          ticks: {
            // max: 60, min: 0,
            color: 'black',
            font: {
              size: 16,
            }
          },
        }
      },
      plugins: {
        legend: {
          position: 'top',
          display: true
        },
        title: {
          display: true,
          text: 'Comercialização das Cestas Cooperflora',
          font: {
            size: 20
          }
        },
      },
    }
  });


  // const options = {
  //   responsive: true,
  //   scales: {
  //     yAxes: [{
  //       id: 'A',
  //       type: 'linear',
  //       position: 'left',
  //       ticks: {
  //         max: 2000, min: 0,
  //         color: 'black',
  //         font: {
  //           size: 16,
  //         }
  //       }
  //     },
  //     {
  //       id: 'B',
  //       type: 'linear',
  //       position: 'right',
  //       ticks: {
  //         max: 60, min: 0,
  //         color: 'black',
  //         font: {
  //           size: 16,
  //         }
  //       }
  //     }],
  //     xAxes: {
  //       ticks: {
  //         color: 'black',
  //         font: {
  //           size: 16
  //         }
  //       }
  //     }
  //   },
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //       display: true
  //     },
  //     title: {
  //       display: true,
  //       text: 'Número de Cestas Comercializadas',
  //       font: {
  //         size: 20
  //       }
  //     },
  //   },
  // };

  return (
    <div class='MainChart'>
      <LineChart chartData={chartData.data} options={chartData.options} width={'100%'} />
    </div>
  )
}

export default MainChart;
import { useState, useEffect } from 'react';
import { data } from '../../data/cooperflorabarao';
import LineChart from '../LineChart/LineChart';
import './Charts.css';

const Charts = () => {

    const [extraProducts, setExtraProducts] = useState();

    useEffect(() => {
        const extraProductsAux = [...data.cooperflorabarao.extraProducts];
        setExtraProducts(extraProductsAux);
        console.log('Extra prod aux pós', extraProductsAux);
    }, []);


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

    return (
        <div class='Charts'>
        {
          extraProducts ?
            extraProducts.map((extraProduct, index) => {
              const label = extraProduct;
              const labels = data.cooperflorabarao.deliveries.map((data) => data.dateText);
              const extraProductData = data.cooperflorabarao.deliveries.map((data) => {
                const searchIndex = data.extraProducts.findIndex((product) => product.name === extraProduct);
                if (searchIndex >= 0) {
                  console.log('...', searchIndex);
                  return data.extraProducts[searchIndex].amount;
                } else {
                  return 0;
                }
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
                    text: label,
                  },
                },
              };
              const chartData1 = {
                labels: labels,
                datasets: [{
                  label: label,
                  data: extraProductData,
                  backgroundColor: ['red', 'blue'],
                  borderColor: 'black',
                  borderWidth: 2
                }]
              }
              return (
                <div className='LineChartArea'>
                  <LineChart chartData={chartData1} options={options} width={'100%'} />
                </div>
              )
            }) : null
        }
        </div>
    )
}

export default Charts;
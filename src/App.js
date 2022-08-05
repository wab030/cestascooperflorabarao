import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';
import PageTitle from './components/PageTitle/PageTitle';
import './App.css';
import { data } from './data/cooperflorabarao';
// import { data } from './data/cooperflorabarao-mock';
import LineChart from './components/LineChart/LineChart';

function App() {

  const [extraProducts, setExtraProducts] = useState();

  // console.log('Number of deliveries', data.cooperflorabarao.deliveries.length)

  // console.log('ExtraProducts', extraProducts);

  useEffect(() => {
    const extraProductsAux = [...data.cooperflorabarao.extraProducts];
    setExtraProducts(extraProductsAux);
    console.log('Extra prod aux pós', extraProductsAux);
  }, []);

  // console.log('Data', data.cooperflorabarao.deliveries[0].extraProducts);

  // const [productData, setProductData] = useState({
  //   labels: data.cooperflorabarao.deliveries.map((data) => data.dateText),
  //   datasets: [{
  //     label: data.cooperflorabarao.deliveries[0].extraProducts[0].name,
  //     data: data.cooperflorabarao.deliveries[0].extraProducts.map((data) => data.amount),
  //     backgroundColor: ['red'],
  //     borderColor: 'black',
  //     borderWidth: 2
  //   }]
  // });

  return (
    <div className="App">
      <BrowserRouter>
        <MainPage />
        <div><p>Outros Produtos</p></div>
        {
          extraProducts ? 
          extraProducts.map((extraProduct, index) => {
            console.log('==============');
            console.log('extra product', extraProduct);
            const label = extraProduct;
            console.log('Label', label);
            const labels = data.cooperflorabarao.deliveries.map((data) => data.dateText);
            // console.log('Eixo X', labels);

            const extraProductData = data.cooperflorabarao.deliveries.map((data) => {
              // console.log('..', data.extraProducts);
              // data.extraProducts.map((p) => console.log(p.name));
              // console.log(extraProduct.name);
              const searchIndex = data.extraProducts.findIndex((product) => product.name === extraProduct);
              if(searchIndex >=0 ){
                console.log('...', searchIndex);
                return data.extraProducts[searchIndex].amount;
              } else {
                return 0;
              }
            });
            console.log('Data', extraProductData);

            console.log('Index', index);
            console.log('==============');
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
              <LineChart chartData={chartData1} options={options} width={'45%'}/>
            )
          }) : null
        }

        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;

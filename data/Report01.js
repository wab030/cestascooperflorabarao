/*

Essa script lê o banco de dados Cestas Cooperflora e gera um arquivo csv com dados dos pedidos para análise do grupo de consumo.

Execução: node Report01.js

*/

const { initializeApp, cert } = require('firebase-admin/lib/app');
const { getFirestore } = require('firebase-admin/lib/firestore');
const fs = require('fs');
const fileToWrite = 'report01-pedidos.csv';

// Prod DB
const serviceAccount = require('../../cestascooperflorabarao-firebase-adminsdk-kg42n-083eab8467.json');

// Dev DB
// const serviceAccount = require('../../cestascooperflorabarao-dev-firebase-adminsdk-hopm6-00aa0ec043.json');

// const serviceAccount = require('../../cestascooperflorabarao-dev-firebase-adminsdk-hopm6-8a8fcf03f3.json');
// const databaseURL = 'https://cestascooperflorabarao-dev-default-rtdb.asia-southeast1.firebasedatabase.app';

console.log('Iniciando a leitura dos dados do app Cestas Cooperflora Barão.');
console.log('Leitura do banco de dados de pedidos.');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Initialization of the output file.
const initializeFile = () => {
  let lineToStore =
    'Nome,Data,Cesta,Status do Pedido,Soma dos Produtos, Soma dos Produtos+Transporte ,Status do Pagamento, DeliveryId\n ';
  fs.writeFile(fileToWrite, lineToStore + ' ', async function (err) {
    if (err) return console.log(err);
  });
};

const getData = async () => {
  let ordersAux = await db.collection('orders').orderBy('userName').get();
  // let ordersAux = await db.collection('orders').where('date', '>', '2022-05-21T23:43:06.816Z').get();
  ordersAux.forEach((order) => {
    // console.log(order.data());

    const date = new Date(order.data().date);
    // console.log(date);
    // const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('pt-BR', options);
    const formattedDate = dateFormatter.format(date);
    // console.log(formattedDate);

    const userName = order.data().userName;
    const baseProducts = order.data().baseProducts;
    let status = '';
    switch (order.data().status) {
      case 'opened':
        status = 'Aberto';
        break;
      case 'completed':
        status = 'Completo';
        break;
      case 'canceled':
        status = 'Cancelado';
        break;
      default:
        status = '';
    }
    // status = status === 'opened' ? 'Aberto' : 'Completo';
    const productsPriceSum = order.data().productsPriceSum.toFixed(2);
    // const prod = productsPriceSum.toString().replace(/\./g, ',');
    // console.log(prod);
    const totalAmount = order.data().totalAmount.toFixed(2);
    let paymentStatus = '';
    switch (order.data().paymentStatus) {
      case 'opened':
        paymentStatus = 'Aberto';
        break;
      case 'completed':
        paymentStatus = 'Completo';
        break;
      default:
        paymentStatus = '';
    }
    // paymentStatus = paymentStatus === 'undefined' ? '' :
    const deliveryId = order.data().deliveryId;

    let lineToStore = `${userName},${formattedDate},${baseProducts},${status},${productsPriceSum},${totalAmount},${paymentStatus},${deliveryId}\n`;
    console.log(lineToStore);
    fs.appendFile(fileToWrite, lineToStore, async function (err) {
      if (err) return console.log(err);
    });
    //('Nome,Data,Cesta,Status,Soma dos Produtos, Soma dos Produtos+Transporte ,Status do Pagamento, DeliveryId\n ');
  });
  // console.log(deliveries);
  let lineToStore = ']\n}\n}';
  fs.appendFile(fileToWrite, lineToStore + ' ', async function (err) {
    if (err) return console.log(err);
  });
};

initializeFile();
getData();

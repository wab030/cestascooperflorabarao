/*

Essa script lê o banco de dados Cestas Cooperflora e gera um arquivo json para ser consumido pela Web App e mostrar os dados na tela. 

Execução: nodejs ReadData.js

cestas : [
  date: data,
  cestas: xxx (quantidade),
  extraProducts:[
    {
      name: xxxx,
      amount: xxx
    }
    {
      name: xxxx,
      amount: xxx
    }
  ]  
]
*/

const { initializeApp, cert } = require('firebase-admin/lib/app');
const { getFirestore } = require('firebase-admin/lib/firestore');
const fs = require('fs');
const fileToWrite = 'cooperflorabarao.js';

// Prod DB
const serviceAccount = require('../../cestascooperflorabarao-firebase-adminsdk-kg42n-083eab8467.json');

// Dev DB
// const serviceAccount = require('../../cestascooperflorabarao-dev-firebase-adminsdk-hopm6-3604f3476c.json');

// const serviceAccount = require('../../cestascooperflorabarao-dev-firebase-adminsdk-hopm6-8a8fcf03f3.json');
// const databaseURL = 'https://cestascooperflorabarao-dev-default-rtdb.asia-southeast1.firebasedatabase.app';

console.log('Iniciando a leitura dos dados do app Cestas Cooperflora Barão');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
let deliveries = [];

// Initialization of the output file.
const initializeFile = () => {
  let lineToStore = 'export const data = {\n"cooperflorabarao": {\n ';
  fs.writeFile(fileToWrite, lineToStore + ' ', async function (err) {
    if (err) return console.log(err);
  });
}

let baseProductsPrice;

const getData = async () => {

  let users;
  await db.collection('users').get().then(snap => {
    users = snap.size // will return the collection size
    console.log('Users', users);

  });
  let groupAux = await db.collection('groups').get();
  fs.appendFile(fileToWrite, '"group":{\n', async function (err) {
    if (err) return console.log(err);
  });
  const currentDate = new Date();
  groupAux.forEach((doc) => {
    // console.log(doc.data());
    console.log('Users', users);
   
    baseProductsPrice = doc.data().baseProductsPrice;
    let lineToStore =
      '"address":"' + doc.data().address + '",\n' +
      '"name":"' + doc.data().name + '",\n' +
      '"deliveryWeekDay":"' + doc.data().deliveryWeekDay + '",\n' +
      '"notice":"' + doc.data().notice + '",' +
      '"deliveryFrequencyInDays":' + doc.data().deliveryFrequencyInDays + ',\n' +
      '"deliveryFrequencyText":"' + doc.data().deliveryFrequencyText + '",\n' +
      '"baseProductsPrice":' + doc.data().baseProductsPrice + ',\n' +
      '"deliveryFee":' + doc.data().deliveryFee + ',\n' +
      '"consumers":' + users + ',\n' +
      '"date":"' + currentDate.toString() + '",\n' +
      '},\n';
    fs.appendFile(fileToWrite, lineToStore + ' ', async function (err) {
      if (err) return console.log(err);
      // console.log("Gravando grupo ", lineToStore);
    });
  });

  fs.appendFile(fileToWrite, '"extraProducts":[\n', async function (err) {
    if (err) return console.log(err);
  });
  let productsAux = await db.collection('products').orderBy('name').get();
  productsAux.forEach((doc) => {
    // console.log(doc.data().name);
    let productName = doc.data().name;
    // console.log(typeOf(productName));
    //let lineToStore = '"' + productName.replaceAll('"', '') + '",';
    // let lineToStore = '"' + doc.data().name + '",';
    let lineToStore = '"' + productName.replace(/"/g, '') + '",';
    fs.appendFile(fileToWrite, lineToStore + ' ', async function (err) {
      if (err) return console.log(err);
      // console.log("Gravando produto ", lineToStore);
    });
  });
  // console.log('Extras Products', extraProducts);

  let lineStore = '],\n"deliveries":[\n ';
  fs.appendFile(fileToWrite, lineStore + ' ', async function (err) {
    if (err) return console.log(err);
  });

  let deliveriesAux = await db.collection('groups').doc('vhvp5xf4PNESoy0qR2Yx').collection('deliveries').get();

  let ordersAux = await db.collection('orders').get();
  // let ordersAux = await db.collection('orders').where('date', '>', '2022-05-21T23:43:06.816Z').get();
  ordersAux.forEach((order) => {
    // console.log(order.data());
    // deliveries.map((delivery) => {
    //   console.log('Delivery before', delivery);
    // });
    let deliveryExists = false;
    let i = 0;
    let date;
    date = new Date(order.data().date.toString().substring(0, 10));

    while (i < deliveries.length) {
      if (order.data().deliveryId === deliveries[i].deliveryId) {
        deliveryExists = true;
        break;
      }
      i++;
    }
    if (!deliveryExists) {
      // console.log('Novo pedido');
      // console.log(extraProducts);
      // let extraProductsAux = extraProducts.map((x) => x);
      const ep = [];
      // for (let i = 0; i < extraProducts.length; i++) {
      //   ep[i] = extraProducts[i];
      // }
      // let dateAux = new Date(date);
      order.data().extraProducts.map((extraProductFireStore) => {
        // const index = ep.findIndex(item => item.name === extraProductFireStore.productTitle);
        const a = {
          'name': extraProductFireStore.productTitle,
          'amount': extraProductFireStore.quantity,
          'price': extraProductFireStore.productPrice,
        };
        ep.push(a);
        // ep[index].amount += extraProductFireStore.quantity;
        // console.log(extraProductFireStore);
      });
      // console.log(deliveriesAux.data());
      let deliveryDate = null;
      let deliveryDateText = null;

      deliveriesAux.forEach((delivery) => {
        let deliveryId = delivery.id;
        // console.log('Delivery Id - Deliveries Collection', deliveryId);
        // console.log('Delivery Id - Orders Collection', order.data().deliveryId);
        if (deliveryId === order.data().deliveryId) {
          // console.log(delivery.data().date.toDate());
          // console.log(order.data().date);
          deliveryDate = delivery.data().date.toDate();
          deliveryDateText = delivery.data().date.toDate().toLocaleDateString('pt-BR')
        }
      });

      const cesta = {
        deliveryId: order.data().deliveryId,
        date: new Date(deliveryDate),
        dateText: deliveryDateText,
        cestas: order.data().baseProducts,
        extraProducts: [...ep]
      }
      // console.log(cesta);
      deliveries.push(cesta);

      // deliveries.map((delivery) => {
      //   console.log(delivery);
      // });
      // throw 'erro';
    } else {
      // console.log('Delivery já existe.');
      // console.log('Deliver before', deliveries[i]);
      deliveries[i].cestas += order.data().baseProducts;
      order.data().extraProducts.map((extraProductFireStore) => {
        const index = deliveries[i].extraProducts.findIndex(item => item.name === extraProductFireStore.productTitle);
        // console.log('I', index);
        if (index >= 0) {
          deliveries[i].extraProducts[index].amount += extraProductFireStore.quantity;
        } else {
          deliveries[i].extraProducts.push({
            'name': extraProductFireStore.productTitle,
            'amount': extraProductFireStore.quantity,
            'price': extraProductFireStore.productPrice,
          });
        }
      });
    }
  });

  deliveries.sort((a, b) => {
    return a.date - b.date;
  });
  deliveries.map((delivery) => {
    // console.log(delivery);
    let totalAmountBaseProductSales = delivery.cestas * baseProductsPrice;
    // console.log(totalAmountBaseProductSales);

    let lineToStore = '{\n"deliveryId":"' + delivery.deliveryId + '",\n"date":"' + delivery.date.toString().substring(0, 10) + '",\n "dateText":"' + delivery.dateText + '",\n"cestas":' + delivery.cestas + ',\n"totalAmountBaseProductsSale":' + totalAmountBaseProductSales + ',\n"extraProducts":[\n';

    let totalAmountExtraProductsSales = 0;
    delivery.extraProducts.map((extraProduct) => {
      // console.log(extraProduct);
      totalAmountExtraProductsSales = totalAmountExtraProductsSales + extraProduct.amount * extraProduct.price;
      // lineToStore = lineToStore +
      //   '{"name":"' + extraProduct.name.replaceAll('"', '') +
      //   '","amount":' + extraProduct.amount +
      //   ',"price":' + extraProduct.price +
      //   '},\n';
      lineToStore = lineToStore +
        '{"name":"' + extraProduct.name.replace(/"/g, '') +
        '","amount":' + extraProduct.amount +
        ',"price":' + extraProduct.price +
        '},\n';
    });
    console.log('Total de vendas Produtos Extras:', totalAmountExtraProductsSales);

    // let lineToStoreAux = '\n"totalAmountExtraProductsSales":' + totalAmountBaseProductSales + ',\n';
    // fs.appendFile(fileToWrite, lineToStoreAux + ' ', async function (err) {
    //   if (err) return console.log(err);
    //   // console.log("Gravando cesta ", lineToStore);
    // });

    lineToStore = lineToStore + '],\n"totalAmountExtraProductsSales":' + totalAmountExtraProductsSales + ',\n},\n';
    // lineToStore = `${lineStore}']\n'"totalAmountExtraProductsSales":${totalAmountExtraProductsSales}\n},\n`;
    fs.appendFile(fileToWrite, lineToStore + ' ', async function (err) {
      if (err) return console.log(err);
      // console.log("Gravando cesta ", lineToStore);
    });

  });
  // console.log(deliveries);
  let lineToStore = ']\n}\n}';
  fs.appendFile(fileToWrite, lineToStore + ' ', async function (err) {
    if (err) return console.log(err);
  });

}

initializeFile();
getData();




/*

Essa script lê o banco de dados Cestas Cooperflora e gera um arquivo csv com dados dos pagamentos para análise do grupo de consumo.

Execução: node Report01-Pagamentos.js

*/

const { initializeApp, cert } = require('firebase-admin/lib/app');
const { getFirestore } = require('firebase-admin/lib/firestore');
const fs = require('fs');
const fileToWrite = 'report02-pagamentos.csv';

// Prod DB
const serviceAccount = require('../../cestascooperflorabarao-firebase-adminsdk-kg42n-083eab8467.json');

// Dev DB
// const serviceAccount = require('../../cestascooperflorabarao-dev-firebase-adminsdk-hopm6-00aa0ec043.json');

// const serviceAccount = require('../../cestascooperflorabarao-dev-firebase-adminsdk-hopm6-8a8fcf03f3.json');
// const databaseURL = 'https://cestascooperflorabarao-dev-default-rtdb.asia-southeast1.firebasedatabase.app';

console.log('Iniciando a leitura dos dados do app Cestas Cooperflora Barão.');
console.log('Leitura do banco de dados de pagamentos.');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Initialization of the output file.
const initializeFile = () => {
  let lineToStore =
    'Nome,Data do Registro, Saldo da Pessoa Consumidora, Saldo no Registro de Pagamento, Total a Ser Pago, Total do Pedido, Data do Pagamento, Status do Pagamento\n';
  fs.writeFile(fileToWrite, lineToStore, async function (err) {
    if (err) return console.log(err);
  });
};

// let lineToStore = `${name},${date},${balanceFromUserDoc},${balanceFromPaymentDoc},${totalToBePaid},${orderTotalAmount},${paymentDate}\n`;

const getData = async () => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const dateFormatter = new Intl.DateTimeFormat('pt-BR', options);
  // const formattedDate = dateFormatter.format(date);

  let users = await db.collection('users').orderBy('name').get();
  // let ordersAux = await db.collection('orders').where('date', '>', '2022-05-21T23:43:06.816Z').get();
  users.forEach(async (user) => {
    const name = user.data().name;
    const balanceFromUserDoc = user.data().balance;
    const subCollectionRef = db.collection('users').doc(user.id);
    const payments = await subCollectionRef.collection('payments').orderBy('date').get();
    payments.forEach((payment) => {
      let date = new Date(payment.data().date);
      date = dateFormatter.format(date);
      const balanceFromPaymentDoc = payment.data().currentBalance;
      const totalToBePaid = payment.data().totalToBePaid;
      const orderTotalAmount = payment.data().orderTotalAmount;
      let paymentDate = new Date(payment.data().date);
      paymentDate = dateFormatter.format(paymentDate);
      let status = '';
      switch (payment.data().status) {
        case 'opened':
          status = 'Aberto';
          break;
        case 'completed':
          status = 'Completo';
          break;
        default:
          status = '';
      }
      let lineToStore = `${name},${date},${balanceFromUserDoc},${balanceFromPaymentDoc},${totalToBePaid},${orderTotalAmount},${paymentDate},${status}\n`;
      fs.appendFile(fileToWrite, lineToStore, async function (err) {
        if (err) return console.log(err);
      });
      console.log(lineToStore);
    });
  });
};

initializeFile();
getData();

/*

Essa script lê o banco de dados Cestas Cooperflora e gera um arquivo csv com dados das pessoas do grupo de consumo.

Execução: node Report03-users.js

*/

const { initializeApp, cert } = require('firebase-admin/lib/app');
const { getFirestore } = require('firebase-admin/lib/firestore');
const fs = require('fs');
const fileToWrite = 'report03-users.csv';

// Prod DB
const serviceAccount = require('../../cestascooperflorabarao-firebase-adminsdk-kg42n-083eab8467.json');

// Dev DB
// const serviceAccount = require('../../cestascooperflorabarao-dev-firebase-adminsdk-hopm6-00aa0ec043.json');

// const serviceAccount = require('../../cestascooperflorabarao-dev-firebase-adminsdk-hopm6-8a8fcf03f3.json');
// const databaseURL = 'https://cestascooperflorabarao-dev-default-rtdb.asia-southeast1.firebasedatabase.app';

console.log('Iniciando a leitura dos dados do app Cestas Cooperflora Barão.');
console.log('Leitura do banco de dados de pessoas consumidoras.');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Initialization of the output file.
const initializeFile = () => {
  let lineToStore = 'Nome,Email,Criado em,Notificação\n ';
  fs.writeFile(fileToWrite, lineToStore + ' ', async function (err) {
    if (err) return console.log(err);
  });
};

const getData = async () => {
  let usersAux = await db.collection('users').orderBy('name').get();
  usersAux.forEach((user) => {
    // const date = new Date(order.data().date);
    // console.log(date);
    // const options = { day: '2-digit', month: 'short', year: 'numeric' };
    // const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    // const dateFormatter = new Intl.DateTimeFormat('pt-BR', options);
    // const formattedDate = dateFormatter.format(date);
    // console.log(formattedDate);

    const name = user.data().name;
    const email = user.data().email;
    const createdAt = user.data().createdAt ? user.data().createdAt : 'Não cadastrada';
    const pushNotification = user.data().pushNotificationToken ? 'Sim' : 'Não';

    let lineToStore = `${name},${email},${createdAt},${pushNotification}\n`;
    console.log(lineToStore);
    fs.appendFile(fileToWrite, lineToStore, async function (err) {
      if (err) return console.log(err);
    });
  });
};

initializeFile();
getData();

// Esse script lê o banco de dados Cestas Cooperflora e gera um arquivo JS com os dados em formato exportado
// Execução: node ReadData.js

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const fileToWrite = 'cooperflorabarao.js';

// Carrega credenciais do Firebase (banco de produção)
const serviceAccount = require('../../cestascooperflorabarao-firebase-adminsdk-kg42n-083eab8467.json');

// Inicializa o app do Firebase
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

let baseProductsPrice;
const dataToExport = {
  cooperflorabarao: {
    group: {},
    extraProducts: [],
    deliveries: []
  }
};

const getData = async () => {
  console.log('Iniciando a leitura dos dados do app Cestas Cooperflora Barão');

  // Conta usuários cadastrados
  const usersSnap = await db.collection('users').get();
  const usersCount = usersSnap.size;
  console.log('Total de consumidores cadastrados:', usersCount);

  // Coleta informações do grupo
  const groupSnap = await db.collection('groups').get();
  const currentDate = new Date();

  groupSnap.forEach(doc => {
    const d = doc.data();
    baseProductsPrice = d.baseProductsPrice;

    dataToExport.cooperflorabarao.group = {
      address: d.address,
      name: d.name,
      deliveryWeekDay: d.deliveryWeekDay,
      notice: d.notice,
      deliveryFrequencyInDays: d.deliveryFrequencyInDays,
      deliveryFrequencyText: d.deliveryFrequencyText,
      baseProductsPrice: d.baseProductsPrice,
      deliveryFee: d.deliveryFee,
      consumers: usersCount,
      date: currentDate.toString()
    };
    console.log('Dados do grupo obtidos com sucesso.');
  });

  // Lista de produtos extras disponíveis
  const productsSnap = await db.collection('products').orderBy('name').get();
  productsSnap.forEach(doc => {
    const nome = doc.data().name.replace(/"/g, '');
    dataToExport.cooperflorabarao.extraProducts.push(nome);
  });
  console.log('Produtos extras carregados:', dataToExport.cooperflorabarao.extraProducts.length);

  // Dados das entregas e pedidos
  const deliveriesSnap = await db.collection('groups').doc('vhvp5xf4PNESoy0qR2Yx').collection('deliveries').get();
  const ordersSnap = await db.collection('orders').get();

  const deliveries = [];

  for (const order of ordersSnap.docs) {
    const orderData = order.data();
    const deliveryId = orderData.deliveryId;

    let existing = deliveries.find(d => d.deliveryId === deliveryId);
    if (!existing) {
      const deliveryDoc = deliveriesSnap.docs.find(d => d.id === deliveryId);
      let deliveryDate = deliveryDoc?.data().date.toDate();
      let deliveryDateText = deliveryDate?.toLocaleDateString('pt-BR') || null;

      const extraProducts = orderData.extraProducts.map(p => ({
        name: p.productTitle,
        amount: p.quantity,
        price: p.productPrice
      }));

      deliveries.push({
        deliveryId,
        date: deliveryDate,
        dateText: deliveryDateText,
        cestas: orderData.baseProducts,
        extraProducts
      });
    } else {
      // Soma os valores caso já exista uma entrega com mesmo ID
      existing.cestas += orderData.baseProducts;
      orderData.extraProducts.forEach(p => {
        const found = existing.extraProducts.find(e => e.name === p.productTitle);
        if (found) {
          found.amount += p.quantity;
        } else {
          existing.extraProducts.push({
            name: p.productTitle,
            amount: p.quantity,
            price: p.productPrice
          });
        }
      });
    }
  }

  // Ordena as entregas por data
  deliveries.sort((a, b) => a.date - b.date);

  deliveries.forEach(delivery => {
    const totalAmountBaseProductsSale = delivery.cestas * baseProductsPrice;
    const totalAmountExtraProductsSales = delivery.extraProducts.reduce((sum, p) => sum + p.amount * p.price, 0);

    console.log(`Entrega ${delivery.deliveryId} em ${delivery.dateText}: ${delivery.cestas} cestas, R$ ${totalAmountExtraProductsSales.toFixed(2)} em produtos extras.`);

    dataToExport.cooperflorabarao.deliveries.push({
      deliveryId: delivery.deliveryId,
      date: delivery.date.toISOString().substring(0, 10),
      dateText: delivery.dateText,
      cestas: delivery.cestas,
      totalAmountBaseProductsSale,
      extraProducts: delivery.extraProducts,
      totalAmountExtraProductsSales
    });
  });

  // Salva o arquivo JS final com export
  fs.writeFileSync(fileToWrite, 'export const data = ' + JSON.stringify(dataToExport, null, 2));
  console.log('Arquivo salvo com sucesso em', fileToWrite);
};

getData();
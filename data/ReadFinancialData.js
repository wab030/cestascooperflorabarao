const data = require('./cooperflorabarao');

// console.log(data);

const baseProductsPrice = data.cooperflorabarao.group.baseProductsPrice;
let totalExtraProductsSale;

data.cooperflorabarao.deliveries.map((data) => {
  totalAmountBaseProductSale = data.cestas * baseProductsPrice;
  totalExtraProductsSale = 0;
  data.extraProducts.map((extraProduct) => {
    totalExtraProductsSale = totalExtraProductsSale + extraProduct.amount*extraProduct.price;
  });
  console.log(`${data.dateText} - ${data.cestas} - ${totalAmountBaseProductSale} - ${totalExtraProductsSale}`); 
})
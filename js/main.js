const nbInStock = document.getElementById('in-stock');
const nbCategory = document.getElementById('nb-category');
const nbSoldOut = document.getElementById('nb-sold-out');
const nbIncoming = document.getElementById('incoming');

//
let listData = JSON.parse(localStorage.getItem('listData'));


function saveData() {
      localStorage.setItem('listData', JSON.stringify(listData));
}

function loadData() {
      let loadData = JSON.parse(localStorage.getItem('listData'));
      if (loadData != undefined) {
            listData = loadData
      }
      else {
            saveData();
      }
}


let products = listData.listProductInstock;
let allProducts = 0;
for (let product of products) {
      allProducts += parseInt(product.quanlityall);
}

let orders = listData.listProductsCopy;
let itemOrder = 0;
for (let order of orders) {
      itemOrder += parseInt(order.qulities);
}

let listPro = listData.listProducts;
let InStock = 0;
for (let pro of listPro){
      InStock += parseInt(pro.quanlityall);
}

//
nbInStock.textContent = InStock;
nbSoldOut.textContent = listData.listSum.totalProsoldOut;
nbIncoming.textContent = listData.listSum.soldOutPrice + " $";
nbCategory.textContent = listData.listCategory.length;

//nb of order
let nbOrder = document.getElementById('order');
nbOrder.style.display = 'none';

if(listData.listOders.length>0){
      nbOrder.style.display = 'block'
      nbOrder.textContent = listData.listOders.length;
}
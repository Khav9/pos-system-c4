const btnNewProduct = document.getElementById('add-new-product');
const search = document.getElementById('search');
const groupCard = document.querySelector('.contaner-buttom');
const btnSubmit = document.getElementById('submit');
const btnCancel = document.getElementById('cancel');


const ContainerTop = document.querySelector('.container-top');
const ContainerAdd = document.querySelector('.box-add');
const ContainerButtom = document.querySelector('.contaner-buttom');
const table = document.querySelector('table');
const summryPro = document.querySelector('.detail');

const category = document.querySelector('.type-category');
let namePro = document.getElementById('name-product');
let quanlityAll = document.getElementById('quality');
pricePro = document.getElementById('price');

let groupSelect = document.querySelector('.fitter');
let select = document.querySelector('.inputbox');
let selectForm = document.querySelector('.type-category');

let btnClearFitter = document.getElementById('clear-fitter');

let nbOrder = document.getElementById('order');
nbOrder.style.display = 'none';

let editor = null;
let cate = null;

//Data
let listData = {
      listProducts: [],
      listOders: [],
      listSum: {
            soldOutPrice: 0,
            totalProsoldOut: 0,
      },
      listProductsCopy: [],
      listProductInstock: [],
      listCategory: [],
      latestId: null,
}

function saveData() {
      localStorage.setItem('listData', JSON.stringify(listData));
}

function loadData() {
      let loadData = JSON.parse(localStorage.getItem('listData'));
      if (loadData != undefined) {
            listData = loadData;
      }
      else {
            saveData();
      }
}

function hide(element) {
      element.style.display = 'none';
}

function show(element) {
      element.style.display = 'flex';
}



function renderProduct() {
      loadData();

      let productData = listData.listProducts;

      document.querySelector('tbody').remove();

      let newTbody = document.createElement('tbody');

      for (let index in productData) {
            let tableRow = document.createElement('tr');
            tableRow.dataset.index = index;

            let tdID = document.createElement('td');

            tdID.textContent = parseInt(index) + 1;

            let tdName = document.createElement('td');
            tdName.textContent = productData[index].name;

            let tdCategory = document.createElement('td');
            tdCategory.textContent = productData[index].category;


            let tdQulity = document.createElement('td');
            tdQulity.textContent = productData[index].quanlityall;
            // tdQulity.textContent = qall -qsold;

            let tdPrice = document.createElement('td');
            tdPrice.textContent = productData[index].price + ' $';

            let tdAction = document.createElement('td');
            tdAction.className = 'action';

            let btnSummary = document.createElement('i');
            btnSummary.className = 'material-symbols-outlined';
            btnSummary.textContent = 'visibility';
            btnSummary.addEventListener('click', onSummry);

            let btnAdd = document.createElement('i');
            btnAdd.className = 'material-symbols-outlined';
            btnAdd.textContent = 'add_shopping_cart';
            btnAdd.addEventListener('click', addToOrder);

            let btnEdit = document.createElement('i');
            btnEdit.className = 'material-symbols-outlined';
            btnEdit.textContent = 'edit';
            btnEdit.addEventListener('click', editData);

            let btnDelete = document.createElement('i');
            btnDelete.className = 'material-symbols-outlined delete';
            btnDelete.textContent = 'delete';
            btnDelete.addEventListener('click', deleteData);

            tdAction.appendChild(btnSummary);
            tdAction.appendChild(btnAdd);
            tdAction.appendChild(btnEdit);
            tdAction.appendChild(btnDelete);

            tableRow.appendChild(tdID);
            tableRow.appendChild(tdName);
            tableRow.appendChild(tdCategory);
            tableRow.appendChild(tdQulity);
            tableRow.appendChild(tdPrice);
            tableRow.appendChild(tdAction);

            newTbody.appendChild(tableRow);
      }
      table.appendChild(newTbody);
}

//edit 
function editData(e) {
      let index = e.target.closest('tr').dataset.index;

      namePro.value = listData.listProducts[index].name;
      quanlityAll.value = listData.listProducts[index].quanlityall;
      pricePro.value = listData.listProducts[index].price;
      category.value = listData.listProducts[index].category;

      editor = index;
      formNewPro()
      btnSubmit.textContent = 'Update';
      saveData();
}

function onCreate() {

      ///
      let proId = listData.latestId;
      if (proId === null || listData.listProducts.length === 0) {
            proId = 1;
      } else {
            proId = proId + 1;
      }

      listData.latestId = proId;
      ///

      let newProduct = {
            id: proId,
            name: namePro.value,
            category: category.value,
            quanlityall: quanlityAll.value,
            price: pricePro.value,
            date: date + "/" + month + "/" + year,
            time: hour + ":" + Minutes + ":" + seconds,
      };

      if (editor === null) {
            listData.listProducts.push(newProduct);
            listData.listProductsCopy.push(newProduct);
            listData.listProductInstock.push(newProduct);
      } else {
            listData.listProducts[editor] = newProduct;
            listData.listProductsCopy[editor] = newProduct;
            listData.listProductInstock[editor] = newProduct;
            editor = null
      }

      saveData();
      namePro.value = "";
      category.value = "";
      quanlityAll.value = "";
      pricePro.value = "";
      renderProduct();
      hide(ContainerAdd);
      show(ContainerTop);
      show(ContainerButtom);
}

function formNewPro() {
      hide(ContainerTop);
      hide(ContainerButtom);
      ContainerAdd.style.display = 'block';
}

function onCancel() {
      hide(ContainerAdd);
      show(ContainerTop);
      ContainerButtom.style.display = 'grid';
}

// delete product
function deleteData(e) {
      let index = e.target.closest('tr').dataset.index;
      let namePro = listData.listProducts[index].name;
      if (confirm('Are you sure you want to delete " ' + namePro + '" ?'));
      listData.listProducts.splice(index, 1);
      saveData();
      renderProduct();
}

//date____________
let today = new Date();
let hour = today.getHours();
let Minutes = today.getMinutes();
let seconds = today.getSeconds();
let date = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();

if (hour > 12) {
      hour -= 12
}

//_______________
// add card to order
function addToOrder(e) {
      let index = e.target.closest('tr').dataset.index;
      let newOrder = {
            name: listData.listProducts[index].name,
            qulities: 1,
            price: listData.listProducts[index].price,
            total: listData.listProducts[index].price,
      };
      listData.listOders.push(newOrder);
      saveData()
  
      if(listData.listOders.length>0){
            nbOrder.style.display = 'block'
            nbOrder.textContent = listData.listOders.length;
      }

}

//summry
function onSummry(e) {
      show(summryPro);
      let index = e.target.closest('tr').dataset.index;

      const dName = document.getElementById('dName');
      const dCategory = document.getElementById('dCategory');
      const dQuanlity = document.getElementById('dquanlity');
      const dQStock = document.getElementById('dqStock');

      const date = document.getElementById('date');
      const time = document.getElementById('time');
      const totalPrice = document.getElementById('total-prices');

      dName.textContent = 'Name : ' + listData.listProducts[index].name;
      dCategory.textContent = 'Category : ' + listData.listProducts[index].category;
      dQuanlity.textContent = 'Quanlity in stock : ' + listData.listProducts[index].quanlityall;
      dQStock.textContent = 'Price : ' + listData.listProducts[index].price + ' $';

      date.textContent = 'Date : ' + listData.listProducts[index].date
      time.textContent = 'Time : ' + listData.listProducts[index].time
      totalPrice.textContent = 'Total Price : ' + listData.listProducts[index].quanlityall*listData.listProducts[index].price + ' $';

}

function closeSummry() {
      hide(summryPro)
}
document.querySelector('.detail .material-symbols-outlined').addEventListener('click', closeSummry);

//search by word

function searchName(e) {
      let text = e.target.value.toUpperCase();
      const rows = document.querySelectorAll('tbody tr');
      for (let tr of rows) {
            let proName = tr.children[1].textContent.toUpperCase();
            if (proName.includes(text)) {
                  tr.style.display = ''
            } else {
                  tr.style.display = 'none'
            }
      }
}

//search by fitter

function filterData(e) {
      let cat = e.target.value;
      const rows = document.querySelectorAll('tbody tr');
      for (let tr of rows) {
            let category = tr.children[2].textContent;
            if (category === cat) {
                  tr.style.display = '';
            } else {
                  tr.style.display = 'none';
            }
      }
}

function clearFilter() {
      const rows = document.querySelectorAll('tbody tr');
      for (let tr of rows) {
            tr.style.display = '';
      }
}
//
show(ContainerTop);
ContainerButtom.style.display = 'grid';
hide(ContainerAdd)

//

btnNewProduct.addEventListener('click', formNewPro);

loadData();

renderProduct()
let cats = listData.listCategory;
// category______________________________________________________________

let newCategoryAdd = document.querySelector('.type-category');
let firstOp = document.createElement('option');
firstOp.textContent = 'All Product';
newCategoryAdd.appendChild(firstOp);

for (let index of cats) {
      let optionAdd = document.createElement('option');
      optionAdd.textContent = index.name;

      newCategoryAdd.appendChild(optionAdd);
}

//
let categoryOutSinde = document.querySelector('.inputbox');
let firstOption = document.createElement('option');
firstOption.textContent = 'All Product';
categoryOutSinde.appendChild(firstOption);

for (let index of cats) {
      let option = document.createElement('option');
      option.textContent = index.name;

      categoryOutSinde.appendChild(option);
}

categoryOutSinde.addEventListener('click', filterData);
//number of order
if(listData.listOders.length>0){
      nbOrder.style.display = 'block'
      nbOrder.textContent = listData.listOders.length;
}
//____________________________________________________________________

btnSubmit.addEventListener('click', onCreate);

btnCancel.addEventListener('click', onCancel);
search.addEventListener('keyup', searchName);
btnClearFitter.addEventListener('click', clearFilter);
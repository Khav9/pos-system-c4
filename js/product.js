const btnNewProduct = document.getElementById('add-new-product');
const search = document.getElementById('search');
const groupCard = document.querySelector('.contaner-buttom');
const btnSubmit = document.getElementById('submit');
const btnCancel = document.getElementById('cancel');


const ContainerTop = document.querySelector('.container-top');
const ContainerAdd = document.querySelector('.box-add');
const ContainerButtom = document.querySelector('.contaner-buttom');
const table = document.querySelector('table');


let editor = null;
//

let listData = {
      listProducts: [],
      latestId: null,
}

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

function hide(element) {
      element.style.display = 'none'
}

function show(element) {
      element.style.display = 'flex'
}

function renderProduct() {
      loadData();

      let productData = listData.listProducts;

      document.querySelector('tbody').remove();

      let newTbody = document.createElement('tbody');

      for (let index in productData) {
            console.log(index);
            let tableRow = document.createElement('tr');
            tableRow.dataset.index = index;

            let tdID = document.createElement('td');
            tdID.textContent = productData[index].id;

            let tdName = document.createElement('td');
            tdName.textContent = productData[index].name;

            let tdCategory = document.createElement('td');
            tdCategory.textContent = productData[index].category;

            let tdQulity = document.createElement('td');
            tdQulity.textContent = productData[index].quanlityall;

            let tdPrice = document.createElement('td');
            tdPrice.textContent = productData[index].price;

            let tdAction = document.createElement('td');

            let btnSummary = document.createElement('i');
            btnSummary.className = 'material-symbols-outlined';
            btnSummary.textContent = 'visibility';

            let btnAdd = document.createElement('i');
            btnAdd.className = 'material-symbols-outlined';
            btnAdd.textContent = 'add_shopping_cart';

            let btnEdit = document.createElement('i');
            btnEdit.className = 'material-symbols-outlined';
            btnEdit.textContent = 'edit';

            let btnDelete= document.createElement('i');
            btnDelete.className = 'material-symbols-outlined';
            btnDelete.textContent = 'delete';

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

            newTbody.appendChild(tableRow)
      }
      table.appendChild(newTbody);
}

function onCreate() {
      let proId = listData.latestId;
      if (proId === null || listData.listProducts.length === 0) {
          proId = 1;
      } else {
          proId = proId + 1;
      }

      listData.latestId = proId;
      let newProduct = {
            id : proId,
            name: document.getElementById('name-product').value,
            category: 'smartphone',
            quanlityall: document.getElementById('quality').value,
            price: document.getElementById('price').value,
      };

      listData.listProducts.push(newProduct);

      saveData();

      renderProduct();
}

function formNewPro() {
      hide(ContainerTop);
      hide(ContainerButtom);
      ContainerAdd.style.display = 'block'
}

function onCancel() {
      hide(ContainerAdd);
      show(ContainerTop);
      ContainerButtom.style.display = 'grid';
}

function addCard(event) {
      let index = event.target.closest('.card');
      console.log(index);
}

//
show(ContainerTop);
ContainerButtom.style.display = 'grid';
hide(ContainerAdd)

//

btnNewProduct.addEventListener('click', formNewPro)

loadData();
renderProduct()

btnSubmit.addEventListener('click', onCreate)

btnCancel.addEventListener('click', onCancel)

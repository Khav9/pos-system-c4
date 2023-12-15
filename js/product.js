const btnNexProduct = document.getElementById('add-new-product');
const search = document.getElementById('search');
const groupCard = document.querySelector('.contaner-buttom');
const btnSubmit = document.getElementById('submit');
const btnCancel = document.getElementById('cancel');


const ContainerTop = document.querySelector('.container-top');
const ContainerAdd = document.querySelector('.box-add');
const ContainerButtom = document.querySelector('.contaner-buttom');



let editor = null;
//
let listData = {
      listProducts: [
            { name: 'iphone', image: '../images/iphone.jpg', category: 'smartphone', quanlityall: '9', price: '199' },
            { name: 'iphone', image: '../images/iphone.jpg', category: 'smartphone', quanlityall: '3', price: '199' },
      ],


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
            saveProducts()
      }
}

function hide(element) {
      element.style.display = 'none'
}

function show(element) {
      element.style.display = 'flex'
}

function renderProduct() {
      // listData();

      let productData = listData.listProducts;

      for (let index in productData) {
            let divCard = document.createElement('div');
            divCard.className = 'card';
            divCard.dataset.index = index;

            let divImage = document.createElement('img');
            divImage.src = productData[index].image;
            let divId = document.createElement('p');
            divId.className = 'id';
            divId.textContent = index;
            let divName = document.createElement('p');
            divName.textContent = productData[index].name;

            let divValue = document.createElement('div');
            divValue.className = 'value';
            let divStock = document.createElement('p');
            divStock.className = 'stock';
            //need update____
            divStock.textContent = 'In Stock : ' + '9';
            let divPrice = document.createElement('p');
            divPrice.className = 'price';
            divPrice.textContent = '$ ' + productData[index].price;

            divValue.appendChild(divStock)
            divValue.appendChild(divPrice)

            let divAction = document.createElement('div');
            divAction.className = 'button';

            let btnEdit = document.createElement('i');
            btnEdit.className = 'material-symbols-outlined';
            btnEdit.textContent = 'edit';
            btnEdit.addEventListener('click', editData)

            let btnAddTOCard = document.createElement('i');
            btnAddTOCard.className = 'material-symbols-outlined add';
            btnAddTOCard.textContent = 'add';
            btnAddTOCard.addEventListener('click', addCard)

            let btnDelete = document.createElement('i');
            btnDelete.className = 'material-symbols-outlined';
            btnDelete.textContent = 'delete'
            btnDelete.addEventListener('click', deleteData)

            divAction.appendChild(btnEdit)
            divAction.appendChild(btnAddTOCard)
            divAction.appendChild(btnDelete)

            divCard.appendChild(divImage)
            divCard.appendChild(divId)
            divCard.appendChild(divName)
            divCard.appendChild(divValue)
            divCard.appendChild(divAction)

            //
            groupCard.appendChild(divCard)
      }

}

function editData(event) {
      let index = event.target.closest('.card').dataset.index;
      console.log(index);

      // console.log(listData.listProducts[index]);

      // document.getElementById('fname').value = listUsers[index].firstName
      // document.getElementById('lname').value = listUsers[index].lastName

      // editor = index

      // show(btnUpdate)
      // hide(btnNexProduct)
}

function deleteData(event) {
      let index = event.target.closest('.card');

      // let fullName = listUsers[index].firstName + listUsers[index].lastName;

      if (confirm('Are you sure you want to delete ')) {
            listData.listProducts.splice(index, 1)
      }

      // saveData();
      // renderProduct();
}

function onCreate() {
      let newProduct = {
            name: document.getElementById('name-product').value,
            image: document.getElementById('avatar').src,
            category: 'smartphone',
            quanlityall: document.getElementById('quality'),
            price: document.getElementById('price'),
      };

      if (editor === null) {
            listData.listProducts.push(newProduct);
      } else {
            listData.listProducts[editor] = newProduct;
            editor = null;

      }

      // saveData();
      renderProduct();
}

function newProduct() {
      hide(ContainerTop);
      hide(ContainerButtom);
      console.log(listData);
}

function onCancel() {
      hide(ContainerAdd);
      show(ContainerTop);
      show(ContainerButtom);
}

function addCard(event) {
      let index = event.target.closest('.card');
      console.log(index);
}

//
show(ContainerTop);
show(ContainerButtom);
hide(ContainerAdd)
// btnNexProduct.addEventListener('click', onCreate)
btnNexProduct.addEventListener('click', newProduct)
btnSubmit.addEventListener('click', onCreate)
btnCancel.addEventListener('click', onCancel)
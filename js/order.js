const btnOder = document.getElementById('check-out');
const totalResult = document.getElementById('total');
let listTable = document.querySelector('.list-card');
//

let listData = JSON.parse(localStorage.getItem('listData'));

let nbOrder = document.getElementById('order');
nbOrder.style.display = 'none';
// save and load data

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

function renderCardOrder() {
      document.getElementById('tables').remove();
      let newTable = document.createElement('table');
      newTable.id = 'tables';

      let listOrder = listData.listOders;

      for (let index in listOrder) {
            if (listOrder[index].name !== '' && listOrder[index].qulities && listOrder[index].price && listOrder[index].total) {
                  let newTableRow = document.createElement('tr');
                  newTableRow.dataset.index = index;

                  let tdID = document.createElement('td');
                  tdID.textContent = parseInt(index) + 1;
                  let tdName = document.createElement('td');
                  tdName.textContent = listOrder[index].name;
                  let tdQuality = document.createElement('td');
                  let inputNb = document.createElement('input');
                  inputNb.type = 'number';
                  inputNb.setAttribute('min', '0');
                  inputNb.value = listData.listOders[index].qulities;

                  inputNb.addEventListener('change', getQuantities);
                  tdQuality.appendChild(inputNb);

                  let tdPrice = document.createElement('td');
                  tdPrice.textContent = listOrder[index].total + '$';

                  let tdIcon = document.createElement('td');
                  let btndelet = document.createElement('i');
                  btndelet.className = 'material-symbols-outlined';
                  btndelet.textContent = 'delete';
                  btndelet.addEventListener('click', deleteOder);
                  tdIcon.appendChild(btndelet);

                  newTableRow.appendChild(tdID);
                  newTableRow.appendChild(tdName);
                  newTableRow.appendChild(tdQuality);
                  newTableRow.appendChild(tdPrice);
                  newTableRow.appendChild(tdIcon);

                  newTable.appendChild(newTableRow);
            }
      }
      listTable.appendChild(newTable);
}

//sum price
function getTotal() {
      //______________________________________________
      // loadData()
      let rows = document.querySelectorAll('#tables tr');
      let totalPrice = 0;
      for (let tr of rows) {
            let trTotal = tr.children[3].textContent;
            totalPrice += parseInt(trTotal);
      }
      total.textContent = totalPrice + ' $';
}

//just get value
function getQuantities(e) {
      let i = e.target.closest('tr').dataset.index;
      let index = e.target.closest('tr')
      let qly = index.children[2].children[0].value;
      let unitPrice = listData.listOders[i].price;

      listData.listOders[i].qulities = qly;

      let total = listData.listOders[i].qulities * unitPrice;

      let tdTotal = index.children[3];
      tdTotal.textContent = total + ' $';

      listData.listOders[i].total = total;
      saveData();
      getTotal();

}

//delete
function deleteOder(e) {
      let index = e.target.closest('tr').dataset.index;
      let namePro = e.target.closest('tr').children[1].textContent;
      //nb of order
      let nbOrder = document.getElementById('order');
      nbOrder.textContent = listData.listOders.length - 1;

      if (confirm('Are you sure you want to delet this order <' + namePro + '> ?')) {
            listData.listOders.splice(index, 1);
            saveData();
            renderCardOrder();
      }
      getTotal();
      nbOrder.style.display = 'none';
      if(listData.listOders.length>0){
            nbOrder.style.display = 'block';
            nbOrder.textContent = listData.listOders.length;
      }
}

//checkout
function checkout(e) {

      let listOrder = listData.listOders;
      let n = 0;
      for (let list of listOrder) {
            n = n + parseInt(list.qulities);
            incoming = (list.qulities) * (list.price);
      }
      listData.listSum.totalProsoldOut = listData.listSum.totalProsoldOut + n;
      listData.listSum.soldOutPrice = listData.listSum.soldOutPrice + incoming;

      // when click on checkout
      let pros = listData.listProducts;
      for (let list in listOrder) {
            for (let pro in pros) {
                  let nameOne = pros[pro].name;
                  let nameTwo = listOrder[list].name;
                  if (nameOne.includes(nameTwo)) {
                        if (parseInt(listData.listProducts[pro].quanlityall) < parseInt(listData.listOders[list].qulities)) {
                              alert('This product does not have enough in stock ');
                        } else {
                              listData.listProducts[pro].quanlityall -= listData.listOders[list].qulities;
                              listData.listOders.splice(0, listOrder.length);
                              total.textContent = '0 $';
                        }
                  }
            }
      }

      saveData();
      renderCardOrder();
      nbOrder.style.display = 'none';
      if(listData.listOders.length>0){
            nbOrder.style.display = 'block';
            nbOrder.textContent = listData.listOders.length;
      }
}

//nb of order
if(listData.listOders.length>0){
      nbOrder.style.display = 'block';
      nbOrder.textContent = listData.listOders.length;
}

//call function________
loadData();
renderCardOrder();
getTotal();
btnOder.addEventListener('click', checkout);

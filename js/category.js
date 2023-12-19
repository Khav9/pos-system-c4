const addBtn = document.querySelector("#show-form");
const btnCancel = document.querySelector('.bnt-cancel');
const form = document.querySelector('.form');
const search = document.getElementById('searchCategory');

const table = document.querySelector('table');

let editor = null;
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
          listData = loadData
    }
    else {
          saveData();
    }
}

function renderCategory() {
    let Categories= listData.listCategory;
    document.querySelector('tbody').remove();

    let tBody = document.createElement('tbody');

    for (let index in Categories) {
        let tr = document.createElement('tr');
        tr.dataset.index = index;

        let tdID = document.createElement('td');
        tdID.textContent = parseInt(index) + 1;

        let tdName = document.createElement('td');
        tdName.textContent = Categories[index].name;

        let tdAction = document.createElement('td');
        tdAction.className = 'action'

        let btnEdit = document.createElement('i');
        btnEdit.className = 'material-symbols-outlined edit';
        btnEdit.addEventListener('click', onEdit);
        btnEdit.textContent = 'edit';

        let btnDelete = document.createElement('i');
        btnDelete.className = 'material-symbols-outlined delete';
        btnDelete.addEventListener('click', onDelete)
        btnDelete.textContent = 'delete';

        tdAction.appendChild(btnEdit);
        tdAction.appendChild(btnDelete);

        tr.appendChild(tdID);
        tr.appendChild(tdName);
        tr.appendChild(tdAction);

        tBody.appendChild(tr);
    }
    table.appendChild(tBody);
}

function onEdit(e) {
    let index = e.target.closest('tr').dataset.index;
    
    document.getElementById('name').value = listData.listCategory[index].name;
    document.getElementById('descript').value = listData.listCategory[index].Desciption;

    editor = index;
    form.style.display = 'flex';
    document.querySelector('.btn-create').textContent = 'Update';

}

function onCreate() {
    
    let newCategory = {
        name: document.getElementById('name').value,
        Desciption: document.getElementById('descript').value,
    };
    if (editor === null){
        listData.listCategory.push(newCategory)
    }else{
        listData.listCategory[editor] = newCategory;
        editor = null;
    }

    saveData();
    renderCategory();

    form.style.display = 'none';
}

function onDelete(e){
    let index = e.target.closest('tr').dataset.index;
    let nameCat = e.target.closest('tr').children[1].textContent;

    if (confirm('Are you sure you want to delete "' + nameCat + ' " this category ?')){
        listData.listCategory.splice(index,1)
    }
    saveData();
    renderCategory();
}

function formAdd() {
    form.style.display = 'flex';
}

function onCancel() {
    form.style.display = 'none';
}

//search by name

function searchName(e) {
    let text = e.target.value.toUpperCase();
    const rows = document.querySelectorAll('tbody tr');
    for (let tr of rows) {
          let catName = tr.children[1].textContent.toUpperCase();
          if (catName.includes(text)) {
                tr.style.display = '';
          } else {
                tr.style.display = 'none';
          }
    }
}

///
form.style.display = 'none';

loadData();

//nb of order
let nbOrder = document.getElementById('order');
nbOrder.style.display = 'none';

if(listData.listOders.length>0){
      nbOrder.style.display = 'block'
      nbOrder.textContent = listData.listOders.length;
}

addBtn.addEventListener('click', formAdd);
btnCancel.addEventListener('click', onCancel);
renderCategory();

search.addEventListener('keyup',searchName);
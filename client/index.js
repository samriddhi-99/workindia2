document.addEventListener('DOMContentLoaded',function(){
    fetch('http://localhost:5000/getAll')
    .then(response=>response.json())
    .then(data =>loadHTMLTable(data['data']));
    
});

document.querySelector('table tbody').addEventListener('click',function(event){
    if(event.target.className === "delete-row-btn"){
        deleteRowByID(event.target.dataset.id);
    }
    if(event.target.className === "edit-row-btn"){
        handleEditRow(event.target.dataset.id);
    }
});

function deleteRowByID(id){
    fetch('http://localhost:5000/delete/'+id,{
        method:'DELETE'
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
            location.reload();
        }
    });
}
const updateBtn=document.querySelector('#update-row-btn');
const searchBtn=document.querySelector('#search-btn');
const loginbtn=document.querySelector("#login-btn");

searchBtn.onclick=function(){
    const searchValue=document.querySelector('#search-input').value;
    fetch('http://localhost:5000/search/'+searchValue)
    .then(response=>response.json())
    .then(data =>loadHTMLTable(data['data']));
}
loginbtn.onclick=function(){
    const nameInputLogin=document.querySelector('#name-input-login');
    const nameLogin=nameInputLogin.value;
    nameInputLogin.value="";

    fetch('http://localhost:5000/login',{
        headers:{
            'Content-type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify({nameLogin:nameLogin})
    })
    .then(response=>response.json())
    .then(data=>insertRowIntoTable(data['data']));
}
function handleEditRow(id){
    
    const updateSection=document.querySelector('#update-row');
    updateSection.hidden=false;
    document.querySelector('#update-name-input').dataset.id=id;
    
}

updateBtn.onclick=function(){
    const updateNameInput=document.querySelector('#update-name-input');
    fetch('http://localhost:5000/update',{
        method:'PATCH',
        headers:{
            'Content-type': 'application/json'   
        },
        body: JSON.stringify({
            id:updateNameInput.dataset.id,
            name:updateNameInput.value
        })
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
            location.reload();
        }
    });
}

const addBtn=document.querySelector('#add-name-btn');

addBtn.onclick=function(){
    const nameInput=document.querySelector('#name-input');
    const name=nameInput.value;
    nameInput.value="";
    const passwordInput=document.querySelector('#password-input');

    const password=passwordInput.value;
    // console.log(password);
    passwordInput.value="";
    const titleInput=document.querySelector('#title-input');
    const title=titleInput.value;
    titleInput.value="";
    const descriptionInput=document.querySelector('#description-input');
    const description=descriptionInput.value;
    descriptionInput.value="";
    const categoryInput=document.querySelector('#category-input');
    const category=categoryInput.value;
    categoryInput.value="";

    fetch('http://localhost:5000/insert',{
        headers:{
            'Content-type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name:name,password:password,description:description,title:title,category:category})
    })
    .then(response=>response.json())
    // .then(data=>insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data){
    const table=document.querySelector('table tbody');
    const isTableData =table.querySelector('.no-data');

    let tableHTML="<tr>";
    for (var key in data){
        if(data.hasOwnProperty(key)){
            if(key==='dateAdded'){
                data[key]=new Date(data[key]).toLocaleString();
            }
            tableHTML+=`<td>${data[key]}</td>`;
        }
    }

    tableHTML+=`<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHTML+=`<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;
    tableHTML+="</tr>";
    if(isTableData){
        table.innerHTML=tableHTML;
    }
    else{
        const newRow=table.insertRow();
        newRow.innerHTML=tableHTML;
    }
}

function loadHTMLTable(data){
    const table = document.querySelector('table tbody');

    console.log(data);
    if(data.length===0){
        table.innerHTML="<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }
    let tableHTML="";
    data.forEach(function({id,name,date_added}){
        tableHTML+="<tr>";
        tableHTML+=`<td>${id}</td>`;
        tableHTML+=`<td>${name}</td>`;
        tableHTML+=`<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHTML+=`<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHTML+=`<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHTML+="</tr>";
    });
    table.innerHTML=tableHTML;
    
}
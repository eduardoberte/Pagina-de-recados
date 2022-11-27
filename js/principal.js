const isLogged = localStorage.getItem("loggedUser");

if(!isLogged){
    window.location.href="./index.html"
};

const logOutButton = document.getElementById("logoutBtn");
logOutButton.addEventListener("click", ()=>{
    messageUpdate();
    localStorage.removeItem("loggedUser");
    setTimeout(()=>{
        window.location.href="./index.html"
    }, 1000)
});

let {email, messages} = JSON.parse(localStorage.getItem("loggedUser"));

setMessage();

function messageUpdate(){
    
    let loggedUser = JSON.parse(localStorage.getItem('user'));
    loggedUser.forEach(element => {
        if(element.email===email){
            element.messages=messages
        }
    })
    localStorage.setItem("user", JSON.stringify(loggedUser));
};

const createMsnButton = document.getElementById("createButton");
createMsnButton.addEventListener('click',()=>{
    let desc = document.getElementById("description").value;
    let cont = document.getElementById("content").value;
    let id = messages.length+1

    if(!desc ||!cont){
       return alert('Digite em todos os campos do recado');
    };

    messages.push({id, desc, cont});
    localStorage.setItem('loggedUser', JSON.stringify({email, messages}));
    
    setMessage();
    clearField()

});

function setMessage(){
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML=''
    for(const index in messages){

        tableBody.innerHTML+=`
        <tr class="tBody">
        <td class="textTd">${messages[index].desc}</td>
        <td class="textTd">${messages[index].cont}</td>
        <td class="tdBtn">
            <button class="tBodyButton eraseBtn" onclick="deleteMessage(${messages[index].id})">Apagar</button>
            <button class="tBodyButton editBtn" onclick="editMessage(${messages[index].id})">Editar</button>
        </td>

    </tr>`
    };
};

function deleteMessage(id){
    const confirmDelete = confirm('Tem certeza q deseja deletar o recado?')

    if(confirmDelete){
    let remove = messages.filter((message)=> message.id !== id);
    messages = remove;
    localStorage.setItem('loggedUser', JSON.stringify({email, messages}));
    setMessage();
    }
};

function clearField(){
    let description = document.getElementById("description");
    description.value = '';

    let content = document.getElementById("content");
    content.value= '';
}


/////////////////////////////////////////////////////////////////////////////////////////////// 

let modalDesc = document.getElementById("modalDesc");
let modalCont = document.getElementById("modalCont");

function editMessage(id){
    let modal = document.getElementById('modal');
    modal.style.display= 'block'

    modalPintMessage(id);
    
    const modalSaveBtn = document.getElementById('modalSaveBtn')
    modalSaveBtn.onclick = () => {
        modalEditMessage(id)
        setTimeout(()=>{
            closeModal()
        }, 500)
    };

}

const modalCancelBtn = document.getElementById('modalCancelBtn')
modalCancelBtn.onclick = () => closeModal()

function searchMessage(id){
    return messages.findIndex((message)=> message.id === id)
}

function modalPintMessage(id){
    const tempMessage = searchMessage(id);
    modalDesc.value = messages[tempMessage].desc
    modalCont.value = messages[tempMessage].cont
}

function modalEditMessage(id){
    const tempMessage = searchMessage(id);
    messages[tempMessage].desc = modalDesc.value;
    messages[tempMessage].cont = modalCont.value;
    localStorage.setItem('loggedUser', JSON.stringify({email, messages}));
    setMessage();
}

function closeModal(){
    let modal = document.getElementById('modal');
    modal.style.display= 'none'
}


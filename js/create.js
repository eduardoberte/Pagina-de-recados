let email = document.getElementById("email");
let passWord = document.getElementById("passWord");
let verify = document.getElementById("verifyPassWord");

let db = JSON.parse(localStorage.getItem("user")) || [];


document.querySelector("button").addEventListener("click", (e)=>{
    e.preventDefault();
    save(email, passWord, verify);
 
        
});

document.getElementById("verifyPassWord").addEventListener("keypress", (e)=>{

    if(e.key==="Enter"){
        e.preventDefault();
        save(email, passWord, verify);
       
    }
});

function save(email,passWord,verify){

    if (email.value === "" || passWord.value === "" || verify.value === "") {
        
        alertPassword("preencha todos os dados", "warning")
        return;
    }

    if (passWord.value !== verify.value) {
        alertPassword("Senhas não são iguais", "warning")
        return;
    }

    if(!email.value.match(/\S+@\S+.\S/)) {
        alertPassword("Preencha o campo com um email válido", "warning")
       
          return;
    }

    if(passWord.length < 4) {
        alertPassword("preencha a senha com no mínimo 4 digitos", "warning");
        return;
    }

    const verifyUser = db.some((valor) => valor.email === email.value);
    
    if(verifyUser){

        alertPassword("Usuario já cadastrado", "warning");
        
        return;
    }

    let user = {
    id: generateGuid(),
    email: email.value,
    password: passWord.value,
    messages:[]
    }

    alert("Usuario cadastrado");

    db.push(user);

    localStorage.setItem("user", JSON.stringify(db));

    goLogin();

};

function clear(email,passWord,verify){
    email.value="";
    passWord.value="";
    verify.value="";
}

function goLogin(){
    setTimeout(() => {
        window.location.href = './index.html'
    }, 1000)
}

function generateGuid() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }



  const alertApp = document.getElementById("alertApp") 

  function alertPassword(message,type){

 
    alertApp.innerHTML=""
    const wrapper = document.createElement("div")
    wrapper.innerHTML+=`<div class="alert alert-${type} alert-dismissible" role="alert" > 
    ${message}
    </div>
    `

  alertApp.appendChild(wrapper)
  
  setTimeout(() => {
    alertApp.removeChild(wrapper)
  }, 2000);

  };



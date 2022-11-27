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
        alert("preencha todos os dados");
        return;
    }

    if (passWord.value !== verify.value) {
        alert("Senhas não são iguais");
        return;
    }

    if(!email.value.match(/\S+@\S+.\S/)) {
       alert("Preencha o campo com um email válido");
          return;
    }

    if(passWord.length < 4) {
        alert("preencha a senha com no mínimo 4 digitos");
        return;
    }

    const verifyUser = db.some((valor) => valor.email === email.value);
    console.log(verifyUser);
    
    if(verifyUser){

        alert("Usuario já cadastrado");
        
        return;
    }

    let user = {
    id: db.length + 1,
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







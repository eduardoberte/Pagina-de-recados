
const isLogged = localStorage.getItem("loggedUser");

if(isLogged){
    window.location.href="./principal.html"
};

const loginClick = document.querySelector("button").addEventListener("click", (e)=>{
    e.preventDefault();    

    let email = document.getElementById("emailLog");
    let passWord = document.getElementById("passWordLog");
    let db =JSON.parse(localStorage.getItem("user"))|| [];

    if (email.value === "" || passWord.value === "") {
        alertPassword("preencha todos os dados", "warning");
        return;
      }
    
      const verifyUser = db.findIndex((usuario) => email.value === usuario.email && passWord.value === usuario.password );
        
        if(verifyUser >= 0){
            let  logado = {
                login: db[verifyUser].email, 
                messages: db[verifyUser].messages,
                
            }

            localStorage.setItem("loggedUser",  JSON.stringify(logado));
            return window.location.href = './principal.html'
        }
        alertPassword("Credenciais incorretas", "warning");
        clear(email,passWord);
});



const loginEnter = document.getElementById("passWordLog").addEventListener("keypress", (e)=>{

    if(e.key==="Enter"){
         e.preventDefault();
        
        let email = document.getElementById("emailLog");
        let passWord = document.getElementById("passWordLog");
        let db =JSON.parse(localStorage.getItem("user"))|| [];
    
        if (email.value === "" || passWord.value === "") {
            
            alertPassword("preencha todos os dados", "warning");
            return;
          }
        
          const verifyUser = db.findIndex((usuario) => email.value === usuario.email && passWord.value === usuario.password );
            
            if(verifyUser >= 0){
                const logado = {
                    email: db[verifyUser].email, 
                    messages: db[verifyUser].messages
                }
    
                localStorage.setItem("loggedUser",  JSON.stringify(logado));
                return window.location.href = './principal.html'
            }
            alertPassword("Credenciais incorretas", "warning");
            
            clear(email,passWord);
 }
});


function clear(email,passWord){
    email.value="";
    passWord.value="";
    
};



const alertApp = document.getElementById("alertApp") 

function alertPassword(message,type){

alertApp.innerHTML=""

const wrapper = document.createElement("div")
wrapper.innerHTML=`<div class="alert alert-${type} alert-dismissible" role="alert" position-absolute> 
${message}
</div>
`

alertApp.appendChild(wrapper)

setTimeout(() => {
  alertApp.removeChild(wrapper)
}, 2000);

};
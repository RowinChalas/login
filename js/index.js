const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});
var controlRegistro = false;

document.getElementById("cbRegistro").addEventListener("click",()=>{
   const btn = document.getElementById("btn")
   const label = document.getElementById("cbRegistro")
  
   if(!controlRegistro){
       btn.value = "REGISTRAR"
       label.innerText = "Eres miembro?"
       controlRegistro = true;
    }else{
        btn.value = "INICIAR SESION"
        label.innerText = "No eres miembro?"
       controlRegistro = false;
    }

})

function sendForm(){
    
    const datosRecibidos = {Username:username.value,Password:password.value}

    if(controlRegistro){
        fetch('https://rwchdb.herokuapp.com/rwch/registrar',
        {
            method:'POST',
            body: JSON.stringify(datosRecibidos),
            headers:{
                "Content-type":"application/json"
            }
        }
        ).then(res => res.json())
        .then(userData=>{
            if(userData.ok){
                console.log("Usuario registrado");
            }else{
                console.log("Usuario no registrado");
            }
        })

    }else{
        fetch('https://rwchdb.herokuapp.com/rwch/login',
    {
        method:"POST",
        body: JSON.stringify(datosRecibidos),
        headers:
            {
            "Content-type":"application/json"
            }

    })
    .then(respuesta => respuesta.json())
    .then(user=>{
        if(user.User.length>0){
            console.log("Usuario logeado");
        }else{
            console.log("Usuario no registrado");
        }
    })
    }
    document.getElementById("password").value="";
    document.getElementById("username").value="";
    return false;
}
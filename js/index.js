

document.addEventListener("DOMContentLoaded", function(){
    htmlLoginModificado  = `
    <form action="" method="" id="formulario">
        <div>
            <img src="img/login.png" alt="" width="350" height="150">
            <h1>Inicio de sesion</h1>
            <div class="contenidoForm">
                <div class="mail">
                    <label for="email">Email</label><br>
                    <input type="email" name="mail" placeholder="Email" id="email"><br>
                    <small id="avisoEmail" class="error"></small>
                </div>
                <br>
                <div clas="pass">
                    <label for="password">Contraseña</label><br>
                    <input type="password" name="password" placeholder="Contraseña" id="password"><br>
                    <small id="avisoPass" class="error"></small>
                </div>
                <br>
                <input type="submit" value="Ingresar" id="rBoton" class="botonr">
            </div>
        </div>
    </form>`
    
    document.getElementById("loginSesion").innerHTML = htmlLoginModificado;
})



document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("formulario").addEventListener("submit", function(evt){
        evt.preventDefault()                                                                //Evita que se envie el formulario
        let form = document.getElementById("formulario");                                   
        let email = document.getElementById("email");                                       
        let password = document.getElementById("password");                                 
        let avisoEmail = document.getElementById("avisoEmail")                              
        let avisoPass = document.getElementById("avisoPass")                                
        let vemail = false                                                                  //Establece un booleano que inpedira que los datos se envien
        let vpassword = false                                                               //Establece un booleano que inpedira que los datos se envien                             
        avisoEmail.innerHTML = ""                                                           //Para que no me muestre el aviso de que faltan datos                               
        avisoPass.innerHTML = ""                                                            //Para que no me muestre el aviso de que faltan datos
        
        if(email.value == ""){
            avisoEmail.innerHTML = "Ingrese su email"
            email.classList.add('bordeError');
            vemail = false
        }else{
            email.classList.remove('bordeError');
            vemail = true
        }

        if(password.value == ""){
            avisoPass.innerHTML = "Ingrese su contraseña"
            password.classList.add("bordeError")
            vpassword = false
        }else{
            password.classList.remove("bordeError")
            vpassword = true
        }

        if(vemail && vpassword){                                                            //Si ambos valores son true, se ejecuta la funcion
            redirigir()
        }
    })
    
})


function redirigir(){
    window.location.href="portada.html";                                                    //Funcion para redirigir la pagina
}
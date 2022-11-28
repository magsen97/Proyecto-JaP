document.addEventListener("DOMContentLoaded", function(){
    htmlLoginModificado  = `
    <form action="" method="" id="formulario" style="font-family: sans-serif;" class="needs-validation" novalidate>
        <div>
            <img src="img/login.png" alt="Logo" width="350" height="150" class="mb-4 img-fluid rounded mx-auto d-block">
            <h1 class="h3 mb-3 fw-normal">Inicio de sesion</h1>
            <div class="contenidoForm">
                <div class="mail">
                    <label for="email" class="form-label">Email</label><br>
                    <input type="email" name="mail" placeholder="Email" id="email" required><br>
                    <div class="invalid-feedback">
                        Por favor, ingrese su email.
                    </div>
                </div>
                <br>
                <div clas="pass">
                    <label for="password" class="form-label">Contraseña</label><br>
                    <input type="password" name="password" placeholder="Contraseña" minlength="6" id="password" required><br>
                    <div class="invalid-feedback">
                        Por favor, ingrese su contraseña (6 digitos o mas).
                    </div>
                </div>
                <br>
                <input type="submit" value="Ingresar" id="rBoton" class="w-30 btn btn-lg btn-primary">
            </div>
        </div>
    </form>`
    
    document.getElementById("loginSesion").innerHTML = htmlLoginModificado;
});


document.addEventListener("DOMContentLoaded", function(){
    let formFlag = false;
    document.getElementById("formulario").addEventListener("submit", function(evt){
        evt.preventDefault();                                                                //Evita que se envie el formulario
        let email = document.getElementById("email");                                       
        let password = document.getElementById("password");
        let form = document.getElementById("formulario")                              
        if (!formFlag) {                                                                    //Establece un booleano que inpedira que los datos se envien
            form.classList.add("was-validated");
        };


        

        if(form.checkValidity()){                       //Si los valores son true, se ejecuta la funcion y Guardo los datos en localStorage 
            form.classList.remove("was-validated");   
            localStorage.setItem("Email",email.value);
            localStorage.setItem("Contrasena",password.value);
            redirigir();                                             
        };
    });
    
});


function redirigir(){
    window.location.href="portada.html";                                                    //Funcion para redirigir la pagina
};
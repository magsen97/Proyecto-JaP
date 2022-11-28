const Email = localStorage.getItem("Email");
const pUsuario = JSON.parse(localStorage.getItem("PUsuario"));

function showInfoP (){                          //Muestro el formulario
    let addInfoHTML = "";
    addInfoHTML +=`
        <form id="formUserChange" style="font-family: sans-serif;" class="row mt-4 needs-validation" novalidate>
            <div class="col">
                <div class="row g-3 my-3">
                    <div class="displey-flex row">
                        <div class="col-sm-12 row">
                            <div class="col-sm-9 fs-1">
                                <h1 class="mb-3" style="float: left;">Perfil</h1>
                            </div>
                            <div class="col-sm-3" id="divPerfil">
                                <i class="fa fa-user fa-8x border mb-3" id="Picon"></i>
                            </div>
                        </div>
                    </div>

                    <hr class="my-4"/>

                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="Nombre" class="form-label">Nombre<strong>*</strong></label>
                            <input type="text" class="form-control form-control-lg" id="Nombre" required/>
                            <div class="invalid-feedback">Debe ingresar un nombre.</div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="SNombre" class="form-label">Segundo Nombre</label>
                            <input type="text" class="form-control form-control-lg" id="SNombre"/>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="Apellido" class="form-label">Apellido<strong>*</strong></label>
                            <input type="text" class="form-control form-control-lg" id="Apellido" required/>
                            <div class="invalid-feedback">Debe ingresar un apellido.</div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="SApellido" class="form-label">Segundo Apellido</label>
                            <input type="text" class="form-control form-control-lg" id="SApellido"/>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="Email" class="form-label">Email<strong>*</strong></label>
                            <input type="email" class="form-control form-control-lg" id="Email" required/>
                            <div class="invalid-feedback">Debe ingresar un email valido.</div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="TContacto" class="form-label">Telefono de Contacto</label>
                            <input type="text" class="form-control form-control-lg" id="TContacto"/>
                        </div>
                    </div>

                    <div class="col-sm-8">
                        <div class="row">
                            <div class="col-sm-9">
                                <label for="InputImg" class="form-label">Imagen de Perfil</label>
                                <input type="file" class="form-control form-control-lg" id="InputImg">
                            </div>
                            <div class="col-sm-3">
                                <label for="btnEF" class="form-label">Eliminar Imagen</label>
                                <button type="button" id="btnEF" class="btn btn-primary" style="height: 50%; width: 75%;">Quitar foto</button>
                            </div>
                        </div>
                    </div>

                    <hr class="my-4"/>

                    <button id="btnGC" class="btn btn-primary col-sm-3" type="submit">Guardar Cambios</button>
                </div>
            </div>
        </form>`
    
    document.getElementById("showInfoP").innerHTML = addInfoHTML
};

                       

document.addEventListener("DOMContentLoaded", function(){
    if (!Email){                                                            //Verifico que haya secion activa
        alert("Inicie sesion antes!");
        redirigir();
    }else{
        showInfoP ();
        
        const UserForm = document.getElementById("formUserChange")
        let InputNombre = document.getElementById("Nombre");
        let InputSNombre = document.getElementById("SNombre");
        let InputApellido = document.getElementById("Apellido");
        let InputSApellido = document.getElementById("SApellido");
        let InputEmail = document.getElementById("Email");
        let InputTContacto = document.getElementById("TContacto");
        let InputImg = document.getElementById("InputImg")
        let botonGuardar = document.getElementById("btnGC");
        let botonEliminarFoto = document.getElementById("btnEF")

        InputEmail.setAttribute("value", Email);                        //Muestro el email con el que se inicio session


        InputImg.addEventListener('change', (event) => {                //Aqui obtengo y muestro la foto de perfil que se subio, intercambiandola con el icono.
            const file = event.target.files[0];
            const reader = new FileReader();
            if (file) {        
                reader.onload = function (e) {
                    let img = e.target.result
                    document.getElementById("divPerfil").innerHTML = `<img src="" alt="FotoDePerfil" id="Fperfil" class="mb-3" width="150" height="150"></img>`
                    document.getElementById("Fperfil").src = img;
                }        
                reader.readAsDataURL(file);
            }   
        });


        botonEliminarFoto.addEventListener("click", () =>{              //Elimino la foto de perfil actual
            document.getElementById("divPerfil").innerHTML = `<i class="fa fa-user fa-8x border mb-3" id="Picon"></i>`
        })


        if (pUsuario){                                                          //Aqui verifico si hay datos sobre el usuario actual
            for (let c = 0; c < Object.keys(pUsuario).length; c++) {
                const key = Object.keys(pUsuario)[c]
                const element = pUsuario[key];
                if(key == Email){                                                     //Si los hay, los muestro
                    InputNombre.setAttribute("value", element.userName);
                    InputSNombre.setAttribute("value", element.userSecondname);
                    InputApellido.setAttribute("value", element.userLastName);
                    InputSApellido.setAttribute("value", element.userSecondLastName);
                    InputEmail.setAttribute("value", Email);
                    InputTContacto.setAttribute("value", element.userPhone);

                    let dataImage = element.userImage
                    if(dataImage){                                                      //Muestro la foto
                        document.getElementById("divPerfil").innerHTML = `<img src="" alt="FotoDePerfil" id="Fperfil" class="mb-3" width="150" height="150"></img>`
                        document.getElementById("Fperfil").src = "data:image/png;base64," + dataImage;
                    }

                    break;
                }else{                                                                  //Si no los hay dejo todo menos el email en blanco
                    InputNombre.setAttribute("value", "");
                    InputSNombre.setAttribute("value", "");
                    InputApellido.setAttribute("value", "");
                    InputSApellido.setAttribute("value", "");
                    InputEmail.setAttribute("value", Email);
                    InputTContacto.setAttribute("value", "");
                }
            }

        }


        let formFlag = false;
        botonGuardar.addEventListener("click", function (event){                //Guardar Datos
            event.preventDefault();
            event.stopPropagation();

            if (!formFlag) {
                UserForm.classList.add("was-validated");                        //Impido que se guarde hasta validar
            };

            let imgPerfil = document.getElementById("Fperfil");
            let imgData = ""

            if (imgPerfil){                                                         //Si hay foto de perfil, la comvierto para guardar
                imgData = getBase64Image(imgPerfil);
            }

            if (UserForm.checkValidity()){                                          //Si esta validado lo necesario
                if (pUsuario) {                                                     //Si existen usuarios en localStorage
                    if (pUsuario[Email]) {                                          //Si existe quien esta en sesion activa, actualizo los datos existentes
                        localStorage.setItem(
                            "PUsuario",
                            JSON.stringify({
                            ...pUsuario,
                            [Email]:
                                {"userName": InputNombre.value,
                                "userSecondname": InputSNombre.value,
                                "userLastName": InputApellido.value,
                                "userSecondLastName": InputSApellido.value,
                                "userMail": InputEmail.value,
                                "userPhone": InputTContacto.value,
                                "userImage": imgData
                            },
                            })
                            );
                            UserForm.classList.remove("was-validated");
                            UserForm.parentElement.innerHTML += `
                                <div class="alert alert-success alert-dismissible position-absolute top-0 start-50 translate-middle-x mt-4 fade show" role="alert">
                                    ¡La informacion fue actualizada con exito!
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`
                                location.reload();
                        return;
                    }

                    localStorage.setItem(                                       //Guardo los datos del nuevo usuario
                        "PUsuario",
                        JSON.stringify({
                        ...pUsuario,
                        [Email]:
                                {"userName": InputNombre.value,
                                "userSecondname": InputSNombre.value,
                                "userLastName": InputApellido.value,
                                "userSecondLastName": InputSApellido.value,
                                "userMail": InputEmail.value,
                                "userPhone": InputTContacto.value,
                                "userImage": imgData
                            },
                            })
                            );
                            UserForm.classList.remove("was-validated");
                            UserForm.parentElement.innerHTML += `
                                <div class="alert alert-success alert-dismissible position-absolute top-0 start-50 translate-middle-x mt-4 fade show" role="alert">
                                    ¡La informacion del nuevo usuario fue guardada con exito!
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`
                                location.reload();
                } else {    
                    localStorage.setItem(                                           //Creo y guardo en localStorage a los usuarios, usando sus email como key
                        "PUsuario",
                        JSON.stringify({
                            [Email]:
                            {"userName": InputNombre.value,
                            "userSecondname": InputSNombre.value,
                            "userLastName": InputApellido.value,
                            "userSecondLastName": InputSApellido.value,
                            "userMail": InputEmail.value,
                            "userPhone": InputTContacto.value,
                            "userImage": imgData
                        },
                        })
                        );
                        UserForm.classList.remove("was-validated");
                        UserForm.parentElement.innerHTML += `
                            <div class="alert alert-success alert-dismissible position-absolute top-0 start-50 translate-middle-x mt-4 fade show" role="alert">
                                ¡La informacion del primer usuario fue guardada con exito!
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`
                            location.reload();
                };
                
            }else{
                UserForm.parentElement.innerHTML += `
                <div class="alert alert-danger alert-dismissible position-absolute top-0 start-50 translate-middle-x mt-4 fade show" role="alert">
                    Complete todos los campos requeridos!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `;
            }

        });
            
    }
});

function redirigir(){
    window.location.href="index.html";                                                    //Funcion para redirigir la pagina
};


function getBase64Image(img) {                                  //Funcion necesaria para poder guardar la foto de perfil subida
    let canvas = document.createElement("canvas");

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let MAX_WIDTH = 150;
    let MAX_HEIGHT = 150;
    let width = img.width;
    let height = img.height;
    
    if (width > height) {
        if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
        }
    } else {
        if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
        }
    }

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, width, height);

    let dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}



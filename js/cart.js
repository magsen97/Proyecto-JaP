const CART_25801 = "25801";
const ObjetoPrecios = {};
const userEmail = localStorage.getItem("Email");

function showCart(my_cart) {
    let addTableHTMLcontent = "";
    let addOptionHTMLcontent = "";
    let addCartHTMLcontent = "";


    if (my_cart){                                                           //Comienzo a crear la tabla donde se veran los productos
        addCartHTMLcontent += `
            <h2 style="font-family: sans-serif;">Articulos a comprar</h2>
            <div style="font-family: sans-serif;" class="d-flex row text-justify table table-responsive">
                <table class="table">
                    <thead>
                        <div class="text-justify">
                            <tr>
                                <th class="p-2 flex-fill"></th>
                                <th class="p-2 flex-fill">Nombre</th>
                                <th class="p-2 flex-fill">Costo</th>
                                <th class="p-2 flex-fill">Cantidad</th>
                                <th class="p-2 flex-fill">Subtotal</th>
                                <th class="p-2 flex-fill"></th>
                            </tr>
                        </div>
                    </thead>
                <tbody  id="Mcarrito">

                </tbody>
                </table>
            </div>
            <hr>
            <br>
            <div class="text-left" id="opcionesPedido">
        
            </div>
        `
        document.getElementById("cartShow").innerHTML = addCartHTMLcontent
        
                                                                                //Continuo con lo demas
        addOptionHTMLcontent += `
        <form action="#" method="get" id="formCart"  style="font-family: sans-serif;" class="needs-validation" novalidate>

            <div class="form-group col-lg-6 col-sm-12">
                <h2>Tipo de envio</h3>
                <div id="tEnvio" class="col-lg-6 col-sm-12">
                    <label><input type="radio" value="Premium" name="envio" required checked> Premium 2 a 5 dias (15%)</label><br>
                    <label><input type="radio" value="Express" name="envio"> Express 5 a 8 dias (7%)</label><br>
                    <label><input type="radio" value="Standard" name="envio"> Standard 12 a 15 dias (5%)</label>
                </div>
            </div>

            <br>

            <div class="form-group">
                <h2>Direccion de envio</h2>
            
                <div class="row">
                
                    <div class="col-lg-6 col-sm-12">
                        <div>
                            <label for="Fcalle" class="form-label">Calle</label><br>
                            <input type="text" id="Fcalle" class="form-control" required>
                            <div class="invalid-feedback">
                                Por favor, ingrese su calle.
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-sm-12">
                        <div>
                            <label for="Fnumero" class="form-label">Numero</label><br>
                            <input type="text" id="Fnumero" class="form-control" required>
                            <div class="invalid-feedback">
                                Por favor, ingrese su numero de puerta.
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-sm-12">
                        <div>
                            <label for="Fesquina" class="form-label">Esquina</label><br>
                            <input type="text" id="Fesquina" class="form-control" required>
                            <div class="invalid-feedback">
                                Por favor, ingrese su esquina.
                            </div>
                        </div>
                    </div>
                
                </div>

            </div>

            <hr>

            <div class="row form-group">
                <h2>Costos</h2>

                <div class="border">
                    <div class="row">
                        <h4>Subtotal</h4>
                        <div class="row col-sm-12">
                            <div class="col-sm-9">
                                <p style="opacity: .7">Costo unitario del producto por cantidad</p>
                            </div>
                            <div class="col-sm-3">
                                <p id="SubTos" style="float: right; opacity: .7"></p>
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <h4>Coste por envio</h4>
                        <div class="row col-sm-12">
                            <div class="col-sm-9">
                                <p style="opacity: .7">Segun el tipo de envio</p>
                            </div>
                            <div class="col-sm-3">
                                <p id="cE" style="float: right; opacity: .7"></p>
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="row col-sm-12">
                            <div class="col-sm-10">
                                <h4>Total ($)</h4>
                            </div>
                            <div class="col-sm-2">
                                <p id="Tot" style="float: right;" class="font-weight-bold"></p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <hr>

            <div class="col-sm-12">
                <div class="row">
                    <h2>Forma de pago</h2><br>
                    <div class="col-auto">
                        <p id="selecP">No ha seleccionado</p>
                        <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#modalP" id="modalInvalido">Seleccionar</button>
                        <div id="MetodoPagoInvalidos" class="d-none text-danger col-auto">
                            Debe seleccionar y completar un metodo de pago.
                        </div>
                    </div>
                </div>
              </div>
        </form>


        <div>
            <div class="modal fade" id="modalP" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title fs-5">Forma de pago</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">

                            <label><input type="radio" value="Tarjeta de credito" name="pago" id="pagoT" required onClick=STarjeta()> Tarjeta de credito </label>
                            <hr>
                            <div class="row">
                                <div class="col-lg-6 col-sm-12">
                                    <div>
                                        <label for="Ntarjeta">Numero de tarjeta</label><br>
                                        <input type="text" name="Ntarjeta" class="form-control" required id="ntarj">
                                    </div>
                                </div>

                                <div class="col-lg-5 col-sm-12">
                                    <div>
                                        <label for="Scodigo">Codigo de seguridad</label><br>
                                        <input type="text" name="Scodigo" class="form-control" required id="ctarj">
                                    </div>
                                </div>
                                <br>
                                <div class="col-lg-6 col-sm-12">
                                    <div>
                                        <label for="vencimiento">Vencimiento(MM/AA)</label><br>
                                        <input type="text" name="vencimiento" class="form-control" required id="vtarj">
                                    </div>
                                </div>
                            </div>

                            <br>

                            <label><input type="radio" value="Transferencia Bancaria" name="pago" id="pagoC" required onClick=SBancaria()> Transferencia Bancaria </label>
                            <hr>
                            <div class="row">
                                <div class="col-lg-6 col-sm-12">
                                    <label for="Ncuenta">Numero de tarjeta</label><br>
                                    <div>
                                        <input type="text" name="Ncuenta" class="form-control" required id="ncuen">
                                    </div>
                                </div>
                            </div> 
                            <br> 
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <button type="submit" class="btn btn-primary col-12" form="formCart" id="btnFS" href="#">Finalizar compra</button>
        `
        document.getElementById("opcionesPedido").innerHTML = addOptionHTMLcontent
    }else{
        document.getElementById("cartShow").innerHTML = `<h2 class="text-center">No hay articulos en su carrito</h2>`
        return;
    }


    for (let c = 0; c < Object.keys(my_cart).length; c++) {                     //Obtengo los datos de mi carrito en localStorage
        const key = Object.keys(my_cart)[c]                                     
        const element = my_cart[key];       
        const cArtic = element.articles[0]
        let nombreProducto = cArtic.name
        let moneda = cArtic.currency
        let coste = cArtic.unitCost
        if (moneda == "UYU"){                                                   //Comvierto la moneda utilizada en dolares
            coste = Math.round(ConvertirCosto(cArtic.unitCost))
            moneda = "USD"
        }
        let cantidadUnidades = cArtic.count
        let SubTotalC
        if (cantidadUnidades > 1){                                              //Calculo el nuevo valor en dolares de mi producto
            let valorTotalProducto = Math.round(calcular_valor(coste, cantidadUnidades))
            SubTotalC = valorTotalProducto
        }else{
            SubTotalC = coste
        }

        ObjetoPrecios[key] = SubTotalC                                          //Creo una lista donde se guardan los precios de mis productos

        addTableHTMLcontent += `
            <tbody>
                <div class="text-justify">
                    <tr>
                        <td class="p-2 flex-fill"><img src="${cArtic.image}" title="Ver producto" class="cursor-active" width=75px; onClick=redirigirInfo("ProductoIndividual",${(cArtic.id)})></td>
                        <td class="p-2 flex-fill">${nombreProducto}</td>
                        <td class="p-2 flex-fill" id="costoUnidad">${moneda} ${coste}</td>
                        <td class="p-2 flex-fill"><input type="number" value="${cantidadUnidades}" min="1" id="vProd${key}" onClick="calcular_subTotal(${key})"></td>
                        <td class="p-2 flex-fill" id="subT${key}"><strong>${moneda} ${SubTotalC}</strong></td>
                        <td class="p-2 flex-fill" title="Eliminar producto" id="deleteArticle" onClick="deleteEcart(${key})"><i class="bi bi-x-square btn btn-danger"></i></td>
                    </tr>
                </div>
            </tbody>
            `  
        document.getElementById("Mcarrito").innerHTML = addTableHTMLcontent             //Muestro los productos y su informacion

        let subTotalFinal = calcular_subTotalFinal(Object.values(ObjetoPrecios))            //Comienzo a calcular los costos
        document.getElementById("SubTos").innerHTML =`${moneda} ${subTotalFinal}`
        let valorCheck
        let radios = document.getElementsByName("envio");
        for (let i = 0; i <  radios.length; i++) {                                          //Veo que tipo de envio se selecciono
            if (radios[i].checked) {
                valorCheck = radios[i].value;
                break;
            }
        }
        let valorTotalProducto = Math.round(calcular_valor(subTotalFinal, cantidadUnidades))
        let valorEnvio = Math.round(calcular_envio(valorCheck,valorTotalProducto))

        document.getElementById("cE").innerHTML = `${moneda} ${valorEnvio}`
        document.getElementById("Tot").innerHTML = `${moneda} ${valorTotalProducto+valorEnvio}`         //Termino de mostrar los costos iniciales
                





        document.getElementById("tEnvio").addEventListener("change", function(){                            //Modifico los costos cada vez que se selecciona un nuevo tipo de envio
            let subTotalFinal = Math.round(calcular_subTotalFinal(Object.values(ObjetoPrecios)))
            let valorCheck
            let radios = document.getElementsByName("envio");
            for (let i = 0; i <  radios.length; i++) {
                if (radios[i].checked) {
                    valorCheck = radios[i].value;
                    break;
                }
            }
            let valorEnvio = Math.round(calcular_envio(valorCheck,subTotalFinal))

            document.getElementById("cE").innerHTML = `${moneda} ${valorEnvio}`
            document.getElementById("Tot").innerHTML = `${moneda} ${subTotalFinal+valorEnvio}`
                    
        })
    }
    
};


document.addEventListener("DOMContentLoaded", function(){
    const MyCart = JSON.parse(localStorage.getItem(`cart${userEmail}`));                    
    if (MyCart){                                                                    //Me aseguro de que haya un carrito que mostrar
        showCart(MyCart);
    }else{
        document.getElementById("cartShow").innerHTML = `<h2 class="text-center">No hay articulos en su carrito</h2>`
        return;
    };
    

    const form = document.getElementById("formCart");

    let formFlag = false;
    form.addEventListener("submit", (event) => {                            //Comienzo las validaciones y la compra
        event.preventDefault();
        event.stopPropagation();                                              //Evito que siga su curso sin validar

        if (!formFlag) {                                                    //Booleano para validar
            form.classList.add("was-validated");    
        };
        
        const botonModal = document.getElementById("modalInvalido");
        const MetodoPagoInvalidos = document.getElementById("MetodoPagoInvalidos");
        const pagoT = document.getElementById("pagoT");
        const pagoC = document.getElementById("pagoC");
        const nCuenta = document.getElementById("ncuen");
        const nTarjeta = document.getElementById("ntarj");
        const vTarjeta = document.getElementById("vtarj");
        const cTarjeta = document.getElementById("ctarj");
        const vRadio = document.getElementsByName("tEnvio");
        let vR = false;
        let Vcb = false;
        let Vnt = false;
        let Vvt = false;
        let Vct = false;
        let Vmodal = false;
        let Vcant = false;
        let contador = 0;

        
        if (pagoT.checked || pagoC.checked) {                           //Compruevo las validaciones del modal
            if (pagoT.checked){
                STarjeta()
                if(nTarjeta.checkValidity()){
                    nTarjeta.classList.remove("is-invalid");
                    nTarjeta.classList.add("is-valid");
                    Vnt = true
                }else{
                    nTarjeta.classList.remove("is-valid");
                    nTarjeta.classList.add("is-invalid");
                    nTarjeta.setCustomValidity("Por favor, ingrese el numero de su tarjeta.")
                    let Vnt = false
                }
                if(vTarjeta.checkValidity()){
                    vTarjeta.classList.remove("is-invalid");
                    vTarjeta.classList.add("is-valid");
                    Vvt = true
                }else{
                    vTarjeta.classList.remove("is-valid");
                    vTarjeta.classList.add("is-invalid");
                    vTarjeta.setCustomValidity("Por favor, ingrese el codigo de su tarjeta.")
                    let Vvt = false
                }
                if(cTarjeta.checkValidity()){
                    cTarjeta.classList.remove("is-invalid");
                    cTarjeta.classList.add("is-valid");
                    Vct = true
                }else{
                    cTarjeta.classList.remove("is-valid");
                    cTarjeta.classList.add("is-invalid");
                    cTarjeta.setCustomValidity("Por favor, ingrese el vencimiento de su tarjeta.")
                    let Vct = false
                }
    
            }else{
                SBancaria()
                if(nCuenta.checkValidity()){
                    nCuenta.classList.remove("is-invalid");
                    nCuenta.classList.add("is-valid");
                    Vcb = true
                }else{
                    nCuenta.classList.remove("is-valid");
                    nCuenta.classList.add("is-invalid");
                    nCuenta.setCustomValidity("Por favor, ingrese su numero de cuenta bancaria.")
                    Vcb = false
                }
                
            }
            botonModal.classList.remove("text-danger");
            MetodoPagoInvalidos.classList.add("d-none");
        }else{
            botonModal.classList.add("text-danger");
            MetodoPagoInvalidos.classList.remove("d-none");
            Vmodal = false
        }

        if ((Vnt && Vvt && Vct) || Vcb){                                    //Valido modal
            botonModal.classList.remove("text-danger");
            MetodoPagoInvalidos.classList.add("d-none");
            Vmodal = true
        }else{
            botonModal.classList.add("text-danger");
            MetodoPagoInvalidos.classList.remove("d-none");
            Vmodal = false
        };

        if(!Vcant){
            for (let y = 0; y < Object.keys(ObjetoPrecios).length; y++) {               //Valido si hay cantidad de productos individuales
                const e = Object.keys(ObjetoPrecios)[y];
                if ((document.getElementById(`vProd${e}`).value)>0){
                    document.getElementById(`vProd${e}`).classList.remove("border");
                    document.getElementById(`vProd${e}`).classList.remove("border-danger");
                    contador++
                }else{
                    document.getElementById(`vProd${e}`).classList.add("border");
                    document.getElementById(`vProd${e}`).classList.add("border-danger");
                    Vcant=false;
                };
            };
            if (contador === (Object.keys(ObjetoPrecios).length)){
                Vcant=true;
            }else{
                Vcant=false;
            };
        }else{
            Vcant = true
        }
        
        if (document.querySelector('input[name="envio"]:checked')){                         //Valido que se selecciono tipo de envio
            document.getElementById("tEnvio").classList.remove("border")
            document.getElementById("tEnvio").classList.remove("border-danger")
            vR = true
        }else{
            document.getElementById("tEnvio").classList.add("border")
            document.getElementById("tEnvio").classList.add("border-danger")
            vR = false
        };
        
        
            
        if (form.checkValidity() && Vmodal && Vcant && vR) {                                //Si todo esta ok, lo envio borrando el carrito actual
            
            alert("¡Gracias por su compra!")
            form.classList.remove("was-validated");
            localStorage.removeItem(`cart${userEmail}`);
            console.log("aqui")
            document.getElementById("cartShow").innerHTML = `<h2 class="text-center">No hay articulos en su carrito</h2>`
            window.location.reload()
        }else{
            alert("Complete los campos necesarios!")
            window.location.href="#";
        };
    });
});



function calcular_valor(precio, cantidad){
    return (precio*cantidad)
};

function calcular_envio(selec, precio){
    if (selec == "Premium"){
        return precio*0.15
    }else if (selec == "Express") {
        return precio*0.07
    }else if  (selec == "Standard"){
        return precio*0.05
    }
};

function redirigirInfo(nombre, ID){
    localStorage.setItem(nombre, ID)
    window.location.href="product-info.html";
};

function deleteEcart(id) {                                              //Funcion para eliminar un producto del carrito
    const MyCart = JSON.parse(localStorage.getItem("cart"));
  
    delete MyCart[id];
    
    localStorage.setItem("cart", JSON.stringify(MyCart));
    
    delete ObjetoPrecios[id];
    
    showCart(MyCart);
};

function STarjeta(){
	document.getElementById("ntarj").disabled = false;
	document.getElementById("ctarj").disabled = false;
	document.getElementById("vtarj").disabled = false;
	document.getElementById("ncuen").disabled = true;
    document.getElementById("selecP").innerHTML='Tarjeta de credito'
};
//Tanto arriba como abajo se modifica el tipo de metodo de pago a realizar y se cierra el restante
function SBancaria(){
	document.getElementById("ncuen").disabled = false;
	document.getElementById("ntarj").disabled = true;
	document.getElementById("ctarj").disabled = true;
	document.getElementById("vtarj").disabled = true;
    document.getElementById("selecP").innerHTML='Cuenta bancaria'
};

function ConvertirCosto (precio){                               //Funcion para comvertir a dolares
    return (precio/40)
};

function calcular_subTotalFinal(lista){                          //Funcion para calcular el coste final   
    let sumatoria = 0
    for (let x = 0; x < lista.length; x++) {
        let elem = lista[x];
        sumatoria = sumatoria + elem
    }
    return sumatoria
};

function calcular_subTotal (eleccion){                              //Funcion en donde se calculan y se modifican los valores en tiempo real
    my_cart = JSON.parse(localStorage.getItem(`cart${userEmail}`));
    const element = my_cart[eleccion];
        
    for(let c = 0; c < element.articles.length; c++) {
        const cArtic = element.articles[c]
        let moneda = cArtic.currency
        let coste = cArtic.unitCost
        if (moneda == "UYU"){
            coste = ConvertirCosto(cArtic.unitCost)
            moneda = "USD"
        }
        let cant = document.getElementById(`vProd${eleccion}`).value
        let SubTotalC
        if (cant > 1){
            let valorTotalProducto = Math.round(calcular_valor(coste, cant))
            SubTotalC = Math.round(valorTotalProducto)
        }else{
            SubTotalC = Math.round(coste)
        }
                
        ObjetoPrecios[eleccion] = Math.round(SubTotalC)

        let subTotalFinal = calcular_subTotalFinal(Object.values(ObjetoPrecios))

        let valorCheck
        let radios = document.getElementsByName("envio");
        for (let i = 0; i <  radios.length; i++) {
        if (radios[i].checked) {
            valorCheck = radios[i].value;
            break;
        }
        }

        let valorEnvio = Math.round(calcular_envio(valorCheck, subTotalFinal))

        document.getElementById(`subT${eleccion}`).innerHTML =`<strong>${moneda} ${SubTotalC}</strong>`
        document.getElementById("SubTos").innerHTML =`${moneda} ${subTotalFinal}`
        document.getElementById("cE").innerHTML = `${moneda} ${valorEnvio}`
        document.getElementById("Tot").innerHTML = `${moneda} ${subTotalFinal+valorEnvio}`
    }

};




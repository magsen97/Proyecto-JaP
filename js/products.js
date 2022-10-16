const listadoAutos101_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"  //Json de productos autos


let aMostrar = localStorage.getItem("catID");   //Guardo en localStorage el identificador del json corespondiente
let aMostrarlistado = [];     //Variable donde se guardan los datos del listado.
let minCost = undefined;
let maxCost = undefined;
let filtrarBuscador = undefined



function mostrarListaProductos(listaP){      // Funcion para mostrar lista de productos en products.html.
    document.getElementById("tituloCategaria").innerHTML = `
        <h2>Productos</h2>
        <h3>Veras aqui todos los productos de la categoria ${datos.catName}</h3>`

    let htmlMostrarproduct = "";     // Contenido a agregar a products.html.
    for(let elem = 0; elem < listaP.length; elem++){       //Recorro la lista de objetos 'products'.
        let product = listaP[elem];                        //Por cada producto en 'products'.
        if (((minCost == undefined) || (minCost != undefined && product.cost >= minCost)) &&        //Si la opcion de Min. esta vacia o el costo del producto es mayor que el colocado
            ((maxCost == undefined) || (maxCost != undefined && product.cost <= maxCost))){         //Si la opcion de Max. esta vacia o el costo del producto es menor que el colocado
            if ((filtrarBuscador == undefined || filtrarBuscador == "" || product.name.toLowerCase().indexOf(filtrarBuscador.toLowerCase()) > -1) ||
                (filtrarBuscador == undefined || filtrarBuscador == "" || product.description.toLowerCase().indexOf(filtrarBuscador.toLowerCase()) > -1)){  //Filtro en donde buscar.
                htmlMostrarproduct += `
                <div class="list-group-item list-group-item-action cursor-active" onClick=redirigirInfo("ProductoIndividual",${(product.id)})>
                    <div class="row">
                       <div class="col-3">
                            <img src="${product.image}" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                <h4>${product.name} - ${product.currency} ${product.cost}</h4> 
                                <p>${product.description}</p> 
                                </div>
                                <small class="text-muted">${product.soldCount} vendidos</small> 
                            </div>
                        </div>
                    </div>
                </div>
                `;
                
                document.getElementById("muestra").innerHTML = htmlMostrarproduct;    //Agrego el contenido de arriba a products.html en la seccion main.
            }
        }
        
    }
}




let datos                                                           //Variable donde guardo los objetos del .json para otros usos.
document.addEventListener("DOMContentLoaded", function(){           //Se espera a cargar la pagina.
    let url_listado = PRODUCTS_URL+aMostrar+EXT_TYPE;               //Creo la string para obtener el enlace usando el catID.

    getJSONData(url_listado).then(function(resultObj){              //Obtengo el objeto del getJSONData con los atributos 'datos' y 'status'.
        if (resultObj.status === "ok") {                            //Si todo va correcto sigo.
            datos = resultObj.data;                                 //Separo el objeto que obtengo de datos, el cual contiene 'CATID', 'CATNAME' y 'products'.
            aMostrarlistado = datos.products;                       //Obtengo una lista con solo los objetos 'products'.
            console.log(aMostrarlistado)
            
            mostrarListaProductos(aMostrarlistado);                                //Inicio la funcion para mostrar la lista de productos en el .json correspondiente.
        }else{
            alert("Hay problemas: "+resultObj.data);                //Si algo falla muestro un error.
        }
    });


    document.getElementById("botonFiltrar").addEventListener("click", function(){           //Funcionalidad de filtrado.
        minCost = document.getElementById("filtrarCostMin").value;                          //Valor colocado en la casilla Min.
        maxCost = document.getElementById("filtrarCostMax").value;                          //Valor colocado en la casilla Max.

        if ((minCost != undefined) && (minCost != "") && (minCost >= 0)){                   //Si se coloco algo distinto de cero en la casilla Min.
            minCost;                                                                        //Se usa lo colocado
        }else{
            minCost = undefined;                                                            //No tomo el valor de Min. si sucede algo diferente a lo de arriba
        }
        if ((maxCost != undefined) && (maxCost != "") && (maxCost >= 0)){                   //Si se coloco algo distinto de cero en la casilla Max.
            maxCost;                                                                        //Se usa lo colocado
        }else{
            maxCost = undefined;                                                            //No tomo el valor de Max. si sucede algo diferente a lo de arriba
        }
        console.log(aMostrarlistado)
        mostrarListaProductos(aMostrarlistado);                                                            //Voy a la funcion del comienzo
    });

    document.getElementById("limpiarFiltros").addEventListener("click", function(){         //Funcionalidad de limpiar.
        document.getElementById("filtrarCostMin").value = "";
        document.getElementById("filtrarCostMax").value = "";
        minCost = undefined;
        maxCost = undefined;
        
        console.log(aMostrarlistado)
        mostrarListaProductos(aMostrarlistado);                                                            //Se reestablezen todos los valores y se muestran los productos
    });

    document.getElementById("ordenAsc").addEventListener("click", function(){               //Funcionalidad de ordenar asendentemente.
        aMostrarlistado.sort(function (a, b) {                                              //funcion sort que permite ordenar listas segun parametros
            if ((a.cost) > (b.cost)){                                                       
                return 1;
            }
            if ((a.cost) < (b.cost)){                                                       
                return -1;
            }
            return 0;
        })
        console.log(aMostrarlistado)
        mostrarListaProductos(aMostrarlistado);                                             //Se usa la funcion principal de muestra con la lista ya ordenada asendentemente                  
    });

    document.getElementById("ordenDesc").addEventListener("click", function(){             //Funcionalidad de ordenar descendentemente.
        aMostrarlistado.sort(function (a, b) {                                             //funcion sort que permite ordenar listas segun parametros
            if ((a.cost) > (b.cost)){
                return -1;
            }
            if ((a.cost) < (b.cost)){
                return 1;
            }
            return 0;
        })
        console.log(aMostrarlistado)
        mostrarListaProductos(aMostrarlistado);                                         //Se usa la funcion principal de muestra con la lista ya ordenada descendentemente
    });

    let activoBoton = false                                                             //Compruevo de el boton ya fue activado?
    document.getElementById("relevancia").addEventListener("click", function(){         //Funcionalidad de ordenar descendentemente por productos vendidos.

        if (activoBoton == false) {                                                     //Si el boton no se presiono, ordeno.
            aMostrarlistado.sort(function (a, b) {                                      //Funcion para ordenar
                return a.soldCount - b.soldCount                                        //Ordeno desendente
            })
            console.log(aMostrarlistado)
            mostrarListaProductos(aMostrarlistado);
        }
    });

    document.getElementById("buscador").addEventListener("input", function(){          //Funcionalidad de buscador.
        filtrarBuscador = document.getElementById("buscador").value;
        console.log(aMostrarlistado)
        mostrarListaProductos(aMostrarlistado);
    });

});


function redirigirInfo(nombre, ID){
    localStorage.setItem(nombre, ID)
    window.location.href="product-info.html";
}
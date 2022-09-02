const listadoAutos101_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"  //Json de productos autos


let aMostrar = localStorage.getItem("catID")

let aMostrarlistado = []     //Variable donde se guardan los datos del listado.


function showLISTproduct(lista){      // Funcion para mostrar lista de productos en products.html.
    let htmlMostrarproduct = "";     // Contenido a agregar a products.html.

    document.getElementById("tituloCategaria").innerHTML = `
        <h2>Productos</h2>
        <h3>Veras aqui todos los productos de la categoria ${datos.catName}</h3>`

    for(let elem = 0; elem < lista.length; elem++){       //Recorro la lista de objetos 'products'.
        let product = lista[elem];                        //Por cada producto en 'products'.
        htmlMostrarproduct += `
        <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + ` - ` + product.currency + ` ` + product.cost + `</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("muestra").innerHTML = htmlMostrarproduct;    //Agrego el contenido a products.html en la seccion main.
    }
}

let datos
document.addEventListener("DOMContentLoaded", function(){           //Se espera a cargar la pagina.
    let url_listado = PRODUCTS_URL+aMostrar+EXT_TYPE
    console.log(url_listado)

    getJSONData(url_listado).then(function(resultObj){      //Obtengo el objeto del getJSONData con los atributos 'datos' y 'status'.
        if (resultObj.status === "ok") {                            //Si todo va correcto sigo.
            datos = resultObj.data;                                 //Separo el objeto que obtengo de datos, el cual contiene 'CATID', 'CATNAME' y 'products'.
            aMostrarlistado = datos.products;                       //Obtengo una lista con solo los objetos 'products'.
            showLISTproduct(aMostrarlistado);                       //Inicio la funcion para mostrar la lista de autos.
        }
    });
})
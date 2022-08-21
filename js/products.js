const listadoAutos101_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"


let listadoAutos101 = []     //Variable donde se guardan los datos del listado.


function showLISTautos(lista){      // Funcion para mostrar lista de productos 'Autos101' en index.html.
    let htmlAutosagregados = "";    // Contenido a agregar a products.html.

    for(let i = 0; i < lista.length; i++){       //Recorro la lista de objetos 'products'.
        let auto = lista[i];                        //Por cada auto en 'products'.
        htmlAutosagregados += `
        <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + auto.image + `" alt="auto image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ auto.name + ` - ` + auto.currency + ` ` + auto.cost + `</h4> 
                        <p> `+ auto.description +`</p> 
                        </div>
                        <small class="text-muted">` + auto.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("muestra").innerHTML = htmlAutosagregados;    //Agrego el contenido a index.html en la seccion main.
    }
}

    
document.addEventListener("DOMContentLoaded", function(){           //Se espera a cargar la pagina.
    getJSONData(listadoAutos101_URL).then(function(resultObj){      //Obtengo el objeto del getJSONData con los atributos 'datos' y 'status'.
        if (resultObj.status === "ok")                              //Si todo va correcto sigo.
        {
            datos = resultObj.data;                   //Separo el objeto que obtengo de datos, el cual contiene 'CATID', 'CATNAME' y 'products'.
            console.log(datos);
            listadoAutos101 = datos.products;         //Obtengo una lista con solo los objetos 'products'.
            console.log(listadoAutos101);
            showLISTautos(listadoAutos101);          //Inicio la funcion para mostrar la lista de autos.

        }
    });
})
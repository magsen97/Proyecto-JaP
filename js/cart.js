const CART_25801 = "25801"


function showCart(my_cart) {
    console.log(my_cart)
    let addTableHTMLcontent = "";
    let addOptionHTMLcontent = "";
    let addCartHTMLcontent = "";

    if (my_cart.articles.length >= 1){
        
        addCartHTMLcontent += `
            <h3>Articulos a comprar</h3>
            <div class="d-flex row text-justify table table-responsive">
                <table class="table">
                    <thead>
                        <div class="text-justify">
                            <tr>
                                <th class="p-2 flex-fill"></th>
                                <th class="p-2 flex-fill">Nombre</th>
                                <th class="p-2 flex-fill">Costo</th>
                                <th class="p-2 flex-fill">Cantidad</th>
                                <th class="p-2 flex-fill">Subtotal</th>
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

        for(let c = 0; c < my_cart.articles.length; c++) {
            let cArtic = my_cart.articles[c]
            addTableHTMLcontent += `
            <tbody>
                <div class="text-justify">
                    <tr>
                        <td class="p-2 flex-fill"><img src="${cArtic.image}" alt="article image" width=70px;></td>
                        <td class="p-2 flex-fill">${cArtic.name}</td>
                        <td class="p-2 flex-fill">${cArtic.currency} ${cArtic.unitCost}</td>
                        <td class="p-2 flex-fill"><input type="number" value="1" min="1" max="${cArtic.count}" id="vProd${[c]}"></td>
                        <td class="p-2 flex-fill"  id="subT"><strong>${cArtic.currency} ${cArtic.unitCost}</strong></td>
                    </tr>
                </div>
            </tbody>
            ` 
        };
        document.getElementById("Mcarrito").innerHTML = addTableHTMLcontent

        addOptionHTMLcontent += `
        <form action="" id="formCart">

          <div class="form-group">
            <h3>Tipo de envio</h3>
            <p>
              <label><input type="radio" value="Premium" name="envio" required checked> Premium 2 a 5 dias (15%)</label><br>
              <label><input type="radio" value="Express" name="envio"> Express 5 a 8 dias (7%)</label><br>
              <label><input type="radio" value="Standard" name="envio"> Standard 12 a 15 dias (5%)</label>
            </p>
          </div>

          <br>

          <div class="form-group">
            <h3>Direccion de envio</h3>
            
            <div class="row">
              
              <div class="col-lg-6 col-sm-12">
                <label for="calle">Calle</label><br>
                <div>
                  <input type="text" name="calle" class="form-control">
                </div>
              </div>

              <div class="col-lg-6 col-sm-12">
                <label for="numero">Numero</label><br>
                <div>
                  <input type="text" name="numero" class="form-control">
                </div>
              </div>

              <div class="col-lg-6 col-sm-12">
                <label for="esquina">Esquina</label><br>
                <div>
                  <input type="text" name="esquina" class="form-control">
                </div>
              </div>
            
            </div>

          </div>

        </form>
        `
        document.getElementById("opcionesPedido").innerHTML = addOptionHTMLcontent
        for(let c = 0; c < cart_product.articles.length; c++) {
            document.getElementById(`vProd${[c]}`).addEventListener("input", function(){
                let cant = document.getElementById(`vProd${[c]}`).value
                document.getElementById("subT").innerHTML =`<strong>${cart_product.articles[c].currency} ${calcular_valor(cart_product.articles[c].unitCost, cant)}</strong>`
            })
        };
    }else{
        document.getElementById("cartShow").innerHTML = `<h2 class="text-center">No hay articulos en su carrito</h2>`
    }

}



document.addEventListener("DOMContentLoaded", function(){
    let url_cart
    let userCart = localStorage.getItem("Usuario")
    
    if (userCart){
        url_cart = CART_INFO_URL+userCart+EXT_TYPE;
        alert("hola")

    }else{
        url_cart = CART_INFO_URL+CART_25801+EXT_TYPE;
        getJSONData(url_cart).then(function(resultObj){
            if (resultObj.status === "ok") {
                cart_product = resultObj.data;
                showCart(cart_product);
            }else{
                alert("Hay problemas: "+resultObj.data);
            }
        });
    }

})


function calcular_valor(precio, cantidad){
    return (precio*cantidad)
}
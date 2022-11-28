const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
};

document.addEventListener("DOMContentLoaded", function(){
  perfilUsuario();
});


function perfilUsuario() {
  const Email = localStorage.getItem("Email")                      //Toma los datos del registro de seccion y los muestra.
  if(Email){
      document.getElementById("perfil").innerHTML = `
      <div class="btn-group me-2">
        <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuClickableOutside" data-bs-toggle="dropdown" data-bs-auto-close="inside" aria-expanded="false">
          ${Email}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuClickableOutside">
          <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
          <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
          <li><a class="dropdown-item" href="index.html" onClick=closeSession()>Cerrar sesión</a></li>
        </ul>
      </div>
      `
  }else{
      document.getElementById("perfil").innerHTML = `
      <a class="nav-link" href="index.html">Perfil</a>`
  }
};


function closeSession(){
  localStorage.removeItem("Email");
  localStorage.removeItem("Contrasena");
};



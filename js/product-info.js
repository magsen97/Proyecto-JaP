let IDproducto = localStorage.getItem("ProductoIndividual")
let user = localStorage.getItem("Usuario")


function mostrarProducto(productoInfo){
    let htmlMostrarProductInfo = "";
    let product = productoInfo;
    let imag = "";
    let indicadorCarrusel = "";
    console.log(imag)
    htmlMostrarProductInfo += `
        <div class="infostyle">
            <br>
            <div>
                <h1>${product.name}.</h1>
            </div>
            <br>
            <hr>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-outline-dark" onClick= volverLproduct()><i class="bi bi-arrow-left"></i>Volver a ver productos</button>
            </div>
            <div>
                <h4>Precio</h4>
                <P>${product.currency} ${product.cost}</p>
            </div>
            <br>
            <div>
                <h4>Descripcion</h4>
                <P>${product.description}</p>
            </div>
            <br>
            <div>
                <h4>Categoria</h4>
                <P>${product.category}</p>
            </div>
            <br>
            <div>
                <h4>Cantidad de vendidos</h4>
                <P>${product.soldCount}</p>
            </div>
            <br>
            <div>
                <h4>Imagenes ilustrativas</h4> 
            </div>
            <br>
            <div id="carouselConIndicadores" class="carousel slide" style="width: 50%;" data-bs-ride="carousel" data-bs-interval="2000">
                <div class="carousel-indicators" id="indicadorCarrusel">
                    
                </div>
                <div class="carousel-inner rounded" id="imagCarrusel">
                    
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselConIndicadores" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselConIndicadores" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Siguiente</span>
                </button>
            </div>
        </div>    
        `;          
        document.getElementById("contenedor").innerHTML = htmlMostrarProductInfo;
        
        for(let i = 0; i < product.images.length; i++) {
            if (i == 0){
                indicadorCarrusel += `
                    <button type="button" data-bs-target="#carouselConIndicadores" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i+1}"></button>
                `}
            if (i >= 1){
                indicadorCarrusel += `
                <button type="button" data-bs-target="#carouselConIndicadores" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>
                `}
            }
            document.getElementById("indicadorCarrusel").innerHTML = indicadorCarrusel;

            for(let i = 0; i < product.images.length; i++) {
                if (i == 0){
                    imag += `
                    <div class="carousel-item active">
                    <img src="${product.images[i]}" class="d-block w-100" alt="..."></img>
                    </div>`}
                    if (i >= 1){
                        imag += `
                    <div class="carousel-item">
                        <img src="${product.images[i]}" class="d-block w-100" alt="..."></img>
                        </div>`}
                    }
            document.getElementById("imagCarrusel").innerHTML = imag;
}

function MostrarComentarios(comentariosInfo) {
    let datosObj = comentariosInfo
    let htmlMostrarcomentInfo = "<br><h3>Comentarios</h3><br>";
    if (datosObj.length>=1){
        for(let elem = 0; elem < datosObj.length; elem++) {
            let coment = datosObj[elem];
            htmlMostrarcomentInfo += `
            <div class="comentS">
                <strong>${coment.user}</strong> - ${coment.dateTime} - ${calificar(coment.score)} <br>
                ${coment.description}
            </div>
            `;
        }
    }else{
        htmlMostrarcomentInfo += `<p><strong>Se el primero en comentar sobre este producto</strong></p>`
    }

    htmlMostrarcomentInfo += `
    <br><h3>Comentar</h3><br>
    <form id=comentarform>
        <p>Tu opinion:</p>
        <textarea name="descripcion" rows="4" cols="100" id="opinion"></textarea>
        <br>
        <p>Tu puntuacion:</p>
        <select name="estrellas" id="estrellas">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <br><br>
        <input type="button" value="enviar" class="comar" id="publicarCom" onClick= nuevoCom()>
    </form>
    <br>`
    

    document.getElementById("comentarios").innerHTML = htmlMostrarcomentInfo;
    
}

function fecha(){
    let now = new Date();
    let dateTime = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} `;
    dateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    return dateTime
}

function calificar(calificacion) {
    let puntaje = calificacion
    let star = ""
    for (let i = 0; i < 5; i++) {
        if (i < puntaje) {
            star += `<span class="fa fa-star checked"></span>`
        }else{
            star += `<span class="fa fa-star"></span>`
        }
    }
    return star
}

function nuevoCom(){
    let Opinion = document.getElementById("opinion").value;
    console.log(Opinion)
    let Estrellas = document.getElementById("estrellas").value;
    console.log(Estrellas)
    let lCom = []
    console.log(ComentariosProducto)
    if (Opinion && Estrellas){
        ComentariosProducto.push({"product": IDproducto, "score": Estrellas, "description": Opinion, "user": user, "dateTime": fecha()})
    }
     
    console.log(ComentariosProducto)
    localStorage.setItem("Comentarios",ComentariosProducto);
    MostrarComentarios(ComentariosProducto)
}

function MostrarProductosRelacionados(PRel){
    let htmlMostrarProductRel = ""
    let product = PRel;
    htmlMostrarProductRel += `<br><br><h3>Productos relacionados</h3><br>`
    for(let r = 0; r < product.relatedProducts.length; r++) {
        let rProduc = product.relatedProducts[r]
        htmlMostrarProductRel += `
        <div class="col-md-4">
            <div class="card cursor-active" style="width: 18rem;" onClick=redirigirInfo("ProductoIndividual",${(rProduc.id)})>
                <img src="${rProduc.image}" class="card-img-top" alt="product image">
                <div class="card-body">
                    <h5 class="card-title">${rProduc.name}</h5>
                </div>
            </div>
        </div>`
    };
    document.getElementById("productRel").innerHTML = htmlMostrarProductRel;
}

function redirigirInfo(nombre, ID){
    localStorage.setItem(nombre, ID)
    window.location.href="product-info.html";
}

function volverLproduct() {
    window.location = "products.html";
}

document.addEventListener("DOMContentLoaded", function(){

    let url_producto = PRODUCT_INFO_URL+IDproducto+EXT_TYPE;
    console.log(url_producto)
    getJSONData(url_producto).then(function(resultObj){
        if (resultObj.status === "ok") {
            ObjetoProducto = resultObj.data;
            mostrarProducto(ObjetoProducto);
        }else{
            alert("Hay problemas: "+resultObj.data);
        }
    });


    let url_comentario = PRODUCT_INFO_COMMENTS_URL+IDproducto+EXT_TYPE;
    getJSONData(url_comentario).then(function(resultObj){
        if (resultObj.status === "ok") {
            ComentariosProducto = resultObj.data;

            MostrarComentarios(ComentariosProducto);
        }else{
            alert("Hay problemas: "+resultObj.data);
        }
    });

    let url_productoRel = PRODUCT_INFO_URL+IDproducto+EXT_TYPE;
    getJSONData(url_productoRel).then(function(resultObj){
        if (resultObj.status === "ok") {
            ObjetoProducto = resultObj.data;

            MostrarProductosRelacionados(ObjetoProducto);
        }else{
            alert("Hay problemas: "+resultObj.data);
        }
    });
})


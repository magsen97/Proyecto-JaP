let IDproducto = localStorage.getItem("ProductoIndividual");
const user = localStorage.getItem("Usuario");
const userEmail = localStorage.getItem("Email");


function mostrarProducto(productoInfo){
    let htmlMostrarProductInfo = "";
    let product = productoInfo;
    let imag = "";
    let indicadorCarrusel = "";
    console.log(imag)
    htmlMostrarProductInfo += `
        <div class="col">
            <br>
            <div class="row d-flex justify-content-between">
                <div class="row col-sm-12">
                    <div class="col-sm-8">
                        <h1>${product.name}.</h1>
                    </div>
                    <div class="col-sm-4">
                        <button type="button" class="btn btn-success" id="addCart"><i class="bi bi-basket2"></i> Añadir al carrito</button>
                    </div>
                </div>
            </div>
            <br>
            <hr>
            <div class="row d-flex justify-content-between">
                <div class="row col-sm-12">
                    <div class="col-sm-8">
                        <h4>Precio</h4>
                        <P>${product.currency} ${product.cost}</p>
                    </div>
                    <div class="col-sm-4">
                        <button type="button" class="btn btn-outline-dark" onClick= volverLproduct()><i class="bi bi-arrow-left-circle-fill"></i> Volver a ver productos</button>
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-12">
                        <h4>Descripcion</h4>
                        <P>${product.description}</p>
                    </div>
                    <br>
                    <div class="col-sm-12">
                        <h4>Categoria</h4>
                        <P>${product.category}</p>
                    </div>
                    <br>
                    <div class="col-sm-12">
                        <h4>Cantidad de vendidos</h4>
                        <P>${product.soldCount}</p>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-sm-12">
                            <h4>Imagenes ilustrativas</h4> 
                        </div>
                        <br>
                        <div id="carouselConIndicadores" class="carousel slide class="col-sm-12" data-bs-ride="carousel" data-bs-interval="2000">
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
                </div>
            </div>
        </div>    
        `;          
        document.getElementById("contenedor").innerHTML = htmlMostrarProductInfo;
        
        for(let i = 0; i < product.images.length; i++) {            //Recoro las imagenes para los botones del carrusel
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

            for(let i = 0; i < product.images.length; i++) {        //Recoro las imagenes para mostrarlas en el carrusel
                if (i == 0){
                    imag += `
                    <div class="carousel-item active">
                        <img src="${product.images[i]}" class="d-block w-100" alt="..."></img>
                    </div>`}
                    if (i >= 1){
                        imag += `
                        <div class="carousel-item">
                            <img src="${product.images[i]}" class="d-block w-100" alt="..."></img>
                        </div>`
                    }
                }
            document.getElementById("imagCarrusel").innerHTML = imag;
};

function MostrarComentarios(comentariosInfo) {
    let datosObj = comentariosInfo
    let htmlMostrarcomentInfo = "<br><h3>Comentarios</h3><br>";
    if (datosObj.length>=1){
        for(let elem = 0; elem < datosObj.length; elem++) {     //Muestro los comentarios existentes
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
        <textarea name="descripcion" style="height: 100px" id="opinion"></textarea>
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
    
};

function fecha(){                           //Funcion para obtener la fecha actual
    let now = new Date();
    let dateTime = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} `;
    dateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    return dateTime
};

function calificar(calificacion) {
    let puntaje = calificacion
    let star = ""
    for (let i = 0; i < 5; i++) {               //Veo la puntuacion del comentario y creo la visual de estrellas
        if (i < puntaje) {
            star += `<span class="fa fa-star checked"></span>`
        }else{
            star += `<span class="fa fa-star"></span>`
        }
    }
    return star
};

function nuevoCom(){                                            //Funcion para crear nuevo comentario
    let Opinion = document.getElementById("opinion").value;
    let Estrellas = document.getElementById("estrellas").value;
    if (Opinion && Estrellas){
        if(user){
            ComentariosProducto.push({"product": IDproducto, "score": Estrellas, "description": Opinion, "user": user, "dateTime": fecha()})
        }else{
            ComentariosProducto.push({"product": IDproducto, "score": Estrellas, "description": Opinion, "user": userEmail, "dateTime": fecha()})

        } 
    }
     
    MostrarComentarios(ComentariosProducto)
};

function MostrarProductosRelacionados(PRel){                //Funcion para mostrar las imagenes de los productos relacionados
    let htmlMostrarProductRel = ""
    let product = PRel;
    document.getElementById("productRel").innerHTML = `<br><br><h3>Productos relacionados</h3><br>
                                                        <div class="row col-sm-12" id="productRel2">
                                                        </div>`
    for(let r = 0; r < product.relatedProducts.length; r++) {
        let rProduc = product.relatedProducts[r]
        htmlMostrarProductRel += `
        <div class="col-sm-4">
            <div class="card cursor-active" style="width: 18rem;" onClick=redirigirInfo("ProductoIndividual",${(rProduc.id)})>
                <img src="${rProduc.image}" class="card-img-top" alt="product image">
                <div class="card-body">
                    <h5 class="card-title">${rProduc.name}</h5>
                </div>
            </div>
        </div>`
    };
    document.getElementById("productRel2").innerHTML = htmlMostrarProductRel;
};

function redirigirInfo(nombre, ID){
    localStorage.setItem(nombre, ID)
    window.location.href="product-info.html";
};

function volverLproduct() {
    window.location = "products.html";
};




document.addEventListener("DOMContentLoaded", function(){
    let url_producto = PRODUCT_INFO_URL+IDproducto+EXT_TYPE;
    getJSONData(url_producto).then(function(resultObj){
        if (resultObj.status === "ok") {
            ObjetoProducto = resultObj.data;
            mostrarProducto(ObjetoProducto);

            let count=1;
            document.getElementById("addCart").addEventListener("click", () => {
            if (!localStorage.getItem("Email") || localStorage.getItem("Email") === "") {           //Primero veo si esta logiado
                alert("Tienes que iniciar sesion primero");
                return;
            };

            const carrito = JSON.parse(localStorage.getItem(`cart${userEmail}`));                   //Utilizo el email para crearle un carrito
            const id = localStorage.getItem("ProductoIndividual");

            if (carrito) {                                                                          //Si ya existe un carrito
                if (carrito[id]) {                                                                  //Si tiene este producto en el carrito, le aumento en 1 la cantidad
                    alert("Este producto ya esta en tu carrito de compras, se agrega una unidad.");
                    count = count +1;
                    localStorage.setItem(
                        `cart${userEmail}`,
                        JSON.stringify({
                        ...carrito,
                        [id]:
                            {"user":  userEmail,
                            "articles":[{
                            "id": ObjetoProducto.id,
                            "name": ObjetoProducto.name,
                            "currency": ObjetoProducto.currency,
                            "unitCost": ObjetoProducto.cost,
                            "count": count,
                            "image": ObjetoProducto.images[0]
                        }]
                        },
                        })
                        );
                    return;
                }
                localStorage.setItem(                                                                 //Si no tiene este producto, lo agrego
                    `cart${userEmail}`,
                    JSON.stringify({
                    ...carrito,
                    [id]:
                        {"user":  userEmail,
                        "articles":[{
                        "id": ObjetoProducto.id,
                        "name": ObjetoProducto.name,
                        "currency": ObjetoProducto.currency,
                        "unitCost": ObjetoProducto.cost,
                        "count": count,
                        "image": ObjetoProducto.images[0]
                    }]
                    },
                    })
                    );
                    alert("El producto fue agregado a tu carrito de compras!");
            } else {
                count=1
                localStorage.setItem(                                                           //Si no tiene carrito, lo creo
                    `cart${userEmail}`,
                    JSON.stringify({
                    [id]: 
                    {"user":  userEmail,
                        "articles":[{
                            "id": ObjetoProducto.id,
                            "name": ObjetoProducto.name,
                            "currency": ObjetoProducto.currency,
                            "unitCost": ObjetoProducto.cost,
                            "count": count,
                            "image": ObjetoProducto.images[0]
                    }]
                        
                    },
                    })
                    );
                    
                    alert("El producto fue agregado a tu nuevo carrito de compras!");
            };
        });
        }else{
            alert("Hay problemas: "+resultObj.data);
        };
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

});




    /* const MyComent = JSON.parse(localStorage.getItem("Comenterios"));
    const url_comentario = PRODUCT_INFO_COMMENTS_URL+IDproducto+EXT_TYPE;
    const idP = localStorage.getItem("ProductoIndividual");
    getJSONData(url_comentario).then(function(resultObj){
        if (resultObj.status === "ok") {
            ComentariosProducto = resultObj.data;
            console.log(ComentariosProducto)
            if (MyComent){
                ComentariosProducto.forEach(element => {
                    console.log(element)
                    localStorage.setItem("Comenterios",JSON.stringify({[idP]: 
                        {"user":  userEmail,
                        "comentariosGuardados":[{
                            "product": element.product,
                            "score": element.score,
                            "description": element.description,
                            "user": element.user,
                            "dateTime": element.dateTime
                            }]
                        },
                    }));    
                });
                console.log(JSON.parse(localStorage.getItem("Comenterios")))
                console.log(MyComent)
                MostrarComentarios(ComentariosProducto);
            }else{
                ComentariosProducto.forEach(element => {
                    console.log(element)
                    localStorage.setItem("Comenterios",JSON.stringify({[idP]: 
                        {"user":  userEmail,
                        "comentariosGuardados":[{
                            "product": element.product,
                            "score": element.score,
                            "description": element.description,
                            "user": element.user,
                            "dateTime": element.dateTime
                            }]
                        },
                    }));

                })
                const MyComent = JSON.parse(localStorage.getItem("Comenterios"));
                console.log(MyComent)
                MostrarComentarios(ComentariosProducto);
            }

        }else{
            alert("Hay problemas: "+resultObj.data);
        }
    }); */
    //AAA Intento de guardar nuevo comentario en localStorage (solucionar asunto misma key)
let modalBody = document.getElementById(`modalBody`)
let botonCarrito = document.getElementById(`botonCarrito`)
let finalizarCompra = document.getElementById(`finalizarCompra`)
let precioTotal = document.getElementById(`precioTotal`)
let acumulador


function compraTotal(productosDelStorage) {
    acumulador = 0;
    productosDelStorage.forEach((producto) => {
        acumulador += producto.precio * producto.cant        
    })

    if(acumulador == 0){
        precioTotal.innerHTML = ""
        modalBody.innerHTML = "<p>¿Qué estas esperando para agregar tu postre preferido al carrito?</p>"
    } else {
        precioTotal.innerHTML = `Importe total $ ${new Intl.NumberFormat("de-DE").format(acumulador)}`
    }    
}

function cargarEventosModal(productosDelStorage){
    productosDelStorage.forEach((producto, indice) =>{
        document.getElementById(`botonEliminar${indice}`).addEventListener(`click`, () => {
            console.log(`Producto ${producto.nombre}eliminado`)
            document.getElementById(`productoCarrito${indice}`).remove()
            productos.splice(indice, 1)
            localStorage.setItem(`carrito`, JSON.stringify(productos))
            cargarProductosModal(JSON.parse(localStorage.getItem(`carrito`)))
        })
    })
}


function cargarProductosModal(productosDelStorage){
    modalBody.innerHTML =" "
    productosDelStorage.forEach((producto, indice) => {
        modalBody.innerHTML += `
        <div class="container">
            <div class="card mb-3" id="productoCarrito${indice}" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${producto.img}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>                                
                                <div class="row">
                                    <p class="card-text">Cant: ${producto.cant}</p>                                                                         
                                </div>                                
                            <p class="card-text">$${new Intl.NumberFormat("de-DE").format(producto.precio * producto.cant)}</p>
                            <button class="btn btn-danger" id="botonEliminar${indice}"><i class="far fa-trash-alt"></i></button>        
                        </div>
                    </div>
                </div>
            </div>
        </div>        
        `
    })

    cargarEventosModal(productosDelStorage)
    compraTotal(productosDelStorage)
}

botonCarrito.addEventListener(`click`, () => {
    let productosDelStorage = JSON.parse(localStorage.getItem(`carrito`))
    cargarProductosModal(productosDelStorage)
})

finalizarCompra.addEventListener(`click`, () => {
    localStorage.setItem(`carrito`, JSON.stringify([]))
    swal("¡Muchas gracias por tu compra!", "Nos pondremos en contacto para coordinar la entrega", "success");
})


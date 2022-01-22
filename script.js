if(!localStorage.getItem('carrito')){
    localStorage.setItem('carrito', JSON.stringify([]))
}

let divProductos = document.getElementById("divProductos")
fetch('productos.json')
.then(response => response.json())
.then(data => {
    data.forEach((productoEnArray, indice) =>{
        divProductos.innerHTML += `
        <div class="card" style="width: 29%">
        <img src="${productoEnArray.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${productoEnArray.nombre}</h5>
          <p class="card-text">${productoEnArray.desc}</p>
          <p class="card-text">Tamaño: ${productoEnArray.tamaño}</p>          
          <p class="card-text">Precio: $ ${productoEnArray.precio}</p>
          <p class="card-text">Stock: ${productoEnArray.cantidad}</p>
          <button id="boton${indice}" class="btn btn-dark"><i class="fas fa-cart-plus"></i> </button>
          
          
        </div>
      </div>
        `
    });

    productos = JSON.parse(localStorage.getItem('carrito'))
    data.forEach((productoEnArray, indice)=>{
        document.getElementById(`boton${indice}`).addEventListener('click', () => {
            if(productos.find(producto => producto.nombre == productoEnArray.nombre)) {
                let index = productos.findIndex(producto => producto.nombre == productoEnArray.nombre)
                productos[index].cant++
                localStorage.setItem('carrito', JSON.stringify(productos))
            } else {
                let nuevoProducto = new Producto(productoEnArray.nombre, productoEnArray.desc, productoEnArray.tamaño, productoEnArray.precio, productoEnArray.cantidad,productoEnArray.img)
                productos.push(nuevoProducto)
                localStorage.setItem('carrito', JSON.stringify(productos))
            }
        })
    })
})

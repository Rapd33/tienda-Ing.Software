const productosCarro = JSON.parse(localStorage.getItem("productosCarro"));

const containerVacio = document.querySelector("#carro-vacio");
const containerCarroProductos = document.querySelector("#carro-productos");
const carroAcciones = document.querySelector("#carro-acciones");
let botonesEliminarCarro = document.querySelectorAll(".boton-eliminar");
const botonVaciarCarro = document.querySelector("#boton-vaciar");
const totalCarro = document.querySelector("#total");
const botonFinalizarCompra = document.querySelector("#boton-comprar");
let botonCantidadMas = document.querySelectorAll(".boton-cantidad-mas");
let botonCantidadMenos = document.querySelectorAll(".boton-cantidad-menos");
let botonInputCantidad = document.querySelectorAll(".producto-cantidad");

// Funcion para cargar y agregar los productos en el carro
function cargarProductosCarro () {

    if (productosCarro && productosCarro.length > 0) {

        containerVacio.classList.add("disabled");
        containerCarroProductos.classList.remove("disabled");
        carroAcciones.classList.remove("disabled");

        containerCarroProductos.innerHTML = "";

        productosCarro.forEach((productos) => {

            const div = document.createElement("div");
            div.classList.add("carro-producto");
            div.innerHTML = `
                    <img class="imagen-carro" src="${productos.imagen}" alt="${productos.titulo}">
                    <div class="carro-producto-titulo">
                        <small>Nombre</small>
                        <h3>${productos.titulo}</h3>
                    </div>
                    <div class="carro-producto-cantidad">
                        <small>Cantidad</small>
                        <button class="boton-cantidad-menos" id="${productos.id}">-</button>
                        <input type="number" class="producto-cantidad" value="${productos.cantidad}" id="${productos.id}" min="1" max="999"></input>
                        <button class="boton-cantidad-mas" id="${productos.id}">+</button>
                    </div>
                    <div class="carro-producto-precio">
                        <small>Precio</small>
                        <p>$${productos.precio}</p>
                    </div>
                    <div class="carro-producto-total">
                        <small>Total</small>
                        <p>$${productos.precio * productos.cantidad}</p>
                    </div>
                    <button class="boton-eliminar"><i class="bi bi-trash2"></i> Eliminar</button>
                `;

            containerCarroProductos.append(div);

        });

        actualizarEliminarCarro();
        actualizarTotalCarro();
        actualizarCantidadCarro();

    }
    else {
        containerVacio.classList.remove("disabled");
        containerCarroProductos.classList.add("disabled");
        carroAcciones.classList.add("disabled");
    }
}

cargarProductosCarro();

// Funcion actualizar los botones de eliminar
function actualizarEliminarCarro() {
    botonesEliminarCarro = document.querySelectorAll(".boton-eliminar");
    
    botonesEliminarCarro.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarro);
    });
}

// Funcion para eliminar productos del carro
function eliminarDelCarro(e) {

    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #2321a7f8, #3260cc)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
    }).showToast();

    let idBoton = e.currentTarget.id
    const index = productosCarro.findIndex(producto => producto.id === idBoton);

    productosCarro.splice(index, 1);
    cargarProductosCarro();

    localStorage.setItem("productosCarro", JSON.stringify(productosCarro));
}

// Funcion para vaciar el carro
botonVaciarCarro.addEventListener("click", vaciarCarro);
function vaciarCarro() {

    Swal.fire({
        title: "¿Quieres vaciar el carro?",
        icon: "warning",
        html: `Se van a borrar ${productosCarro.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6"
    }).then((result) => {
        if (result.isConfirmed) {
            productosCarro.length = 0;
            localStorage.setItem("productosCarro", JSON.stringify(productosCarro));
            cargarProductosCarro();
            actualizarCantidadCarro();
            Swal.fire({
                title: "Carro vacio",
                text: "Se han eliminado todos los productos.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6"
            })
        }
      })

}

//Funcion para actualizar total del carro
function actualizarTotalCarro() {
    const totalDelCarro = productosCarro.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCarro.innerText = `$${totalDelCarro}`;
}

// Funcion para finalizar la compra
botonFinalizarCompra.addEventListener("click", finalizarCompra);
function finalizarCompra() {

    if (localStorage.getItem("usuario") === null) {
        mostrarPopup(); // Mostrar popup si no está logueado
        return;
    }

    alert("Gracias por tu compra!");
    productosCarro.length = 0;
    localStorage.setItem("productosCarro", JSON.stringify(productosCarro));
    cargarProductosCarro();
    actualizarCantidadCarro();

}

// Funcion para actualizar la cantidad de productos
function actualizarCantidadCarro() {
    botonCantidadMas = document.querySelectorAll(".boton-cantidad-mas");
    botonCantidadMenos = document.querySelectorAll(".boton-cantidad-menos");
    botonInputCantidad = document.querySelectorAll(".producto-cantidad");

    botonCantidadMas.forEach(boton => {
        boton.addEventListener("click", sumarCantidad);
    });

    botonCantidadMenos.forEach(boton => {
        boton.addEventListener("click", restarCantidad);
    });

    botonInputCantidad.forEach(input => {
        input.addEventListener("change", cambiarCantidad);
    });
}

// Funcion para sumar productos
function sumarCantidad(e) {

    Toastify({
        text: "Unidad añadida",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #2321a7f8, #3260cc)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idProducto = e.currentTarget.id;
    const producto = productosCarro.findIndex(producto => producto.id === idProducto);

    if (productosCarro[producto].cantidad < 999){
        productosCarro[producto].cantidad++;
    }
    else
    {
        productosCarro[producto].cantidad;
    }

    cargarProductosCarro();

    localStorage.setItem("productosCarro", JSON.stringify(productosCarro));
}

// Funcion para restar productos
function restarCantidad(e) {

    Toastify({
        text: "Unidad eliminada",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #2321a7f8, #3260cc)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idProducto = e.currentTarget.id;
    const producto = productosCarro.findIndex(producto => producto.id === idProducto);

    if (productosCarro[producto].cantidad > 1)
    {
    productosCarro[producto].cantidad--;
    }
    else
    {
        eliminarDelCarro(e);
    }

    cargarProductosCarro();

    localStorage.setItem("productosCarro", JSON.stringify(productosCarro));
}

// Funcion para digitar la cantidad de productos
function cambiarCantidad(e) {

    
    const idProducto = e.currentTarget.id;
    const nuevaCantidad = parseInt(e.currentTarget.value);
    const producto = productosCarro.findIndex(producto => producto.id === idProducto);
    
    if (nuevaCantidad > 0 && nuevaCantidad < 1000)
        {
            productosCarro[producto].cantidad = nuevaCantidad;
    }
    else if (nuevaCantidad === 0)
    {
        eliminarDelCarro(e);
    }
    else
    {
        productosCarro[producto].cantidad;
    }
    cargarProductosCarro();
    
    localStorage.setItem("productosCarro", JSON.stringify(productosCarro));

    Toastify({
        text: "Cantidad establecida a " + nuevaCantidad,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #2321a7f8, #3260cc)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
    }).showToast();

}

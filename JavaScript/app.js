let productos = []

fetch("./JavaScript/productos.json")
    .then(response => response.json())
    .then (data => {
        productos = data;
        cargarProductos(productos);
    })

const containerProductos = document.querySelector("#container-producto");
const botonesCategorias = document.querySelectorAll(".boton-categorias");
const tituloPrincipal = document.querySelector(".titulo-main");
const numeroProductos = document.querySelector("#numero-productos");
let botonesAgregarCarro = document.querySelectorAll(".boton-agregar-carro");

// Funcion para cargar los productos
function cargarProductos(productosElegidos) {

    containerProductos.innerHTML = "";

    productosElegidos.forEach((productos) => {

        const div = document.createElement("div");
        div.classList.add("productos-main");
        div.innerHTML = `
        <div class="producto">
            <img class="producto-img" src="${productos.imagen}" alt="${productos.titulo} loading="lazy">
            <div class="producto-info">
                <h3 class="producto-titulo">${productos.titulo}</h3>
                <p class="producto-descripcion">${productos.descripcion}</p>
                <p class="producto-precio">$${productos.precio}</p>
                <button class="boton-agregar-carro" id="${productos.id}">Agregar al carro</button>
            </div>
        </div>
        `;

        containerProductos.append(div);

    });

    actualizarAgregarCarro();

}

cargarProductos(productos);

// Este pedazo sirve para filtrar los productos por categoria en el aside
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
    
        botonesCategorias.forEach(boton => boton.classList.remove ("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos-los-productos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }
        else {
            tituloPrincipal.innerText= "Todos nuestros productos";
            cargarProductos(productos);
        }

    })
});

// Funcion para actualizar los botones de agregar al carro
function actualizarAgregarCarro() {
    botonesAgregarCarro = document.querySelectorAll(".boton-agregar-carro");
    
    botonesAgregarCarro.forEach(boton => {
        boton.addEventListener("click", agregarAlCarro);
    });
}

// Almacenar productos en el local storage
let productosCarro;
let productosCarroLS = localStorage.getItem("productosCarro");
if (productosCarroLS) {
    productosCarro = JSON.parse(productosCarroLS);
    actualizarNumeroProductos();
} 
else {
    productosCarro = [];
}

// Funcion para agregar al carro
function agregarAlCarro(e) {

    Toastify({
        text: "Producto agregado",
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
    const productoAgregar = productos.find(producto => producto.id === idProducto);

    if (productosCarro.some(producto => producto.id === idProducto)) {
        const index = productosCarro.findIndex(producto => producto.id === idProducto);
        productosCarro[index].cantidad++;
    }
    else 
    {
        productoAgregar.cantidad = 1;
        productosCarro.push(productoAgregar);
    }

    actualizarNumeroProductos();

    localStorage.setItem("productosCarro", JSON.stringify(productosCarro));

}

// Funcion para actualizar el numero de productos
function actualizarNumeroProductos() {
    let nuevoNumeroProductos = (productosCarro.reduce((acc, producto) => acc + producto.cantidad, 0));
    numeroProductos.innerText = nuevoNumeroProductos;
}
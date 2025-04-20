// Elementos del DOM
const fotoPerfil = document.getElementById("foto-perfil");
const inputFoto = document.getElementById("input-foto");
const datosPersonales = document.querySelector(".usuario-datos-personales div");
const datosCuenta = document.querySelector(".usuario-datos-cuenta div");
const datosDireccion = document.querySelector(".usuario-datos-direccion div");
const datosPago = document.querySelector(".usuario-datos-pago div");

// Cargar datos del usuario desde localStorage
let usuario = JSON.parse(localStorage.getItem("usuario")) || null;

// Verificar si el usuario está logueado
cargarDatosUsuario();


// Función para cargar los datos del usuario en la interfaz
function cargarDatosUsuario() {
    if (!usuario) return;

    // Foto de perfil
    fotoPerfil.src = usuario.foto || "img/imagen_usuario.webp";

    // Datos personales
    datosPersonales.innerHTML = `
        <p>Nombres: ${usuario.nombres || "No especificado"} <span><button class="btn-modificar" data-campo="nombres">Modificar</button></span></p>
        <p>Apellidos: ${usuario.apellidos || "No especificado"} <span><button class="btn-modificar" data-campo="apellidos">Modificar</button></span></p>
        <p>Documento de identificación: ${usuario.documento || "No especificado"} <span><button class="btn-modificar" data-campo="documento">Modificar</button></span></p>
    `;

    // Datos de la cuenta
    datosCuenta.innerHTML = `
        <p>Nombre de usuario: ${usuario.username || "No especificado"} <span><button class="btn-modificar" data-campo="username">Modificar</button></span></p>
        <p>Contraseña: ******** <span><button class="btn-modificar" data-campo="password">Modificar</button></span></p>
        <p>Correo: ${usuario.email || "No especificado"} <span><button class="btn-modificar" data-campo="email">Modificar</button></span></p>
        <p>Celular: ${usuario.celular || "No especificado"} <span><button class="btn-modificar" data-campo="celular">Modificar</button></span></p>
    `;

    // Direcciones
    datosDireccion.innerHTML = `
        <p>${usuario.direccion || "No especificada"} <span><button class="btn-modificar" data-campo="direccion">Modificar</button></span></p>
        <button class="btn-anadir" data-campo="direccion">Añadir</button>
    `;

    // Métodos de pago
    datosPago.innerHTML = `
        <p>${usuario.metodoPago || "No especificado"} <span><button class="btn-modificar" data-campo="metodoPago">Modificar</button></span></p>
        <button class="btn-anadir" data-campo="metodoPago">Añadir</button>
    `;

    // Actualizar eventos de los botones
    actualizarEventos();
}

// Evento para subir foto de perfil
inputFoto?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            usuario.foto = event.target.result;
            fotoPerfil.src = usuario.foto;
            localStorage.setItem("usuario", JSON.stringify(usuario));
            mostrarToast("Foto de perfil actualizada");
        };
        reader.readAsDataURL(file);
    }
});

// Función para actualizar los eventos de los botones
function actualizarEventos() {
    document.querySelectorAll(".btn-modificar").forEach((boton) => {
        boton.addEventListener("click", () => modificarCampo(boton.dataset.campo));
    });

    document.querySelectorAll(".btn-anadir").forEach((boton) => {
        boton.addEventListener("click", () => anadirCampo(boton.dataset.campo));
    });
}

// Función para modificar un campo específico
function modificarCampo(campo) {
    const labels = {
        nombres: "Nombres",
        apellidos: "Apellidos",
        documento: "Documento de identificación",
        username: "Nombre de usuario",
        password: "Contraseña",
        email: "Correo",
        celular: "Celular",
        direccion: "Dirección",
        metodoPago: "Método de Pago"
    };

    Swal.fire({
        title: `Modificar ${labels[campo]}`,
        input: campo === "password" ? "password" : "text",
        inputValue: usuario[campo] || "",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33"
    }).then((result) => {
        if (result.isConfirmed && result.value.trim() !== "") {
            usuario[campo] = result.value.trim();
            localStorage.setItem("usuario", JSON.stringify(usuario));
            cargarDatosUsuario();
            mostrarToast(`${labels[campo]} actualizado`);
        }
    });
}

// Función para añadir un nuevo campo (dirección o método de pago)
function anadirCampo(campo) {
    const labels = {
        direccion: "Dirección",
        metodoPago: "Método de Pago"
    };

    Swal.fire({
        title: `Añadir ${labels[campo]}`,
        input: "text",
        inputPlaceholder: `Ingresa tu nueva ${labels[campo].toLowerCase()}`,
        showCancelButton: true,
        confirmButtonText: "Añadir",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33"
    }).then((result) => {
        if (result.isConfirmed && result.value.trim() !== "") {
            usuario[campo] = result.value.trim();
            localStorage.setItem("usuario", JSON.stringify(usuario));
            cargarDatosUsuario();
            mostrarToast(`${labels[campo]} añadida`);
        }
    });
}

// Función para mostrar un mensaje Toastify
function anadirCampo(campo) {
    const labels = {
        direccion: "Dirección",
        metodoPago: "Método de Pago"
    };

    Swal.fire({
        title: `Añadir ${labels[campo]}`,
        input: "text",
        inputPlaceholder: `Ingresa tu nueva ${labels[campo].toLowerCase()}`,
        showCancelButton: true,
        confirmButtonText: "Añadir",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33"
    }).then((result) => {
        if (result.isConfirmed && result.value.trim() !== "") {
            const nuevoValor = result.value.trim();

            // Crear un nuevo elemento para la dirección o método de pago
            const nuevoElemento = document.createElement("div");
            nuevoElemento.classList.add("campo-item");
            nuevoElemento.innerHTML = `
                <p>${nuevoValor}</p>
                <button class="btn-marcar-principal" data-campo="${campo}">Marcar como principal</button>
                <button class="btn-modificar" data-campo="${campo}">Modificar</button>
            `;

            // Añadir el nuevo elemento al contenedor correspondiente
            if (campo === "direccion") {
                datosDireccion.appendChild(nuevoElemento);
                if (!usuario.direcciones) usuario.direcciones = [];
                usuario.direcciones.push({ valor: nuevoValor, principal: false });
            } else if (campo === "metodoPago") {
                datosPago.appendChild(nuevoElemento);
                if (!usuario.metodosPago) usuario.metodosPago = [];
                usuario.metodosPago.push({ valor: nuevoValor, principal: false });
            }

            // Guardar en localStorage
            localStorage.setItem("usuario", JSON.stringify(usuario));

            // Actualizar eventos de los botones
            actualizarEventos();

            // Mostrar mensaje de éxito
            mostrarToast(`${labels[campo]} añadida correctamente`);
        }
    });
}

function marcarComoPrincipal(campo, valor) {
    if (campo === "direccion") {
        usuario.direcciones.forEach((direccion) => {
            direccion.principal = direccion.valor === valor;
        });
        cargarDirecciones();
    } else if (campo === "metodoPago") {
        usuario.metodosPago.forEach((metodo) => {
            metodo.principal = metodo.valor === valor;
        });
        cargarMetodosPago();
    }

    // Guardar en localStorage
    localStorage.setItem("usuario", JSON.stringify(usuario));
}
function cargarDirecciones() {
    datosDireccion.innerHTML = "";

    if (usuario.direcciones) {
        usuario.direcciones
            .sort((a, b) => b.principal - a.principal) // Ordenar por principal
            .forEach((direccion) => {
                const elemento = document.createElement("div");
                elemento.classList.add("campo-item");
                elemento.innerHTML = `
                    <p>${direccion.valor} ${direccion.principal ? "(Principal)" : ""}</p>
                    <button class="btn-marcar-principal" data-campo="direccion" data-valor="${direccion.valor}">Marcar como principal</button>
                    <button class="btn-modificar" data-campo="direccion" data-valor="${direccion.valor}">Modificar</button>
                `;
                datosDireccion.appendChild(elemento);
            });
    }

    actualizarEventos();
}

function cargarMetodosPago() {
    datosPago.innerHTML = "";

    if (usuario.metodosPago) {
        usuario.metodosPago
            .sort((a, b) => b.principal - a.principal) // Ordenar por principal
            .forEach((metodo) => {
                const elemento = document.createElement("div");
                elemento.classList.add("campo-item");
                elemento.innerHTML = `
                    <p>${metodo.valor} ${metodo.principal ? "(Principal)" : ""}</p>
                    <button class="btn-marcar-principal" data-campo="metodoPago" data-valor="${metodo.valor}">Marcar como principal</button>
                    <button class="btn-modificar" data-campo="metodoPago" data-valor="${metodo.valor}">Modificar</button>
                `;
                datosPago.appendChild(elemento);
            });
    }

    actualizarEventos();
}
function actualizarEventos() {
    document.querySelectorAll(".btn-modificar").forEach((boton) => {
        boton.addEventListener("click", () => modificarCampo(boton.dataset.campo, boton.dataset.valor));
    });

    document.querySelectorAll(".btn-marcar-principal").forEach((boton) => {
        boton.addEventListener("click", () => marcarComoPrincipal(boton.dataset.campo, boton.dataset.valor));
    });

    document.querySelectorAll(".btn-anadir").forEach((boton) => {
        boton.addEventListener("click", () => anadirCampo(boton.dataset.campo));
    });
}

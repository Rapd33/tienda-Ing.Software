

const botonUsuario = document.querySelector(".boton-usuario");
let nombreUsuario = document.querySelector(".nombre-usuario");
const popupContainer = document.querySelector("#popup-container");

function mostrarPopup() {
    // Limpia el contenido previo del popup
    popupContainer.innerHTML = "";
    popupContainer.classList.remove("disabled");

    // Crea el contenido del popup
    const divPopup = document.createElement("div");
    divPopup.classList.add("popup");
    divPopup.innerHTML = `
    <div class="popup-contenido">

        <!--Seccion Login-->
        <h3 id="titulo-popup">Iniciar Sesión</h3>
        <div id="seccion-login" class="seccion-login">
            <p>Ingresa tu email o nombre de Usuario:</p>
            <input type="text" id="login-email" placeholder="Email o Usuario" required>
            <p>ingresa tu contraseña:</p>
            <input type="password" id="login-password" placeholder="Contraseña" required>
            <button id="boton-iniciar-sesion">Iniciar Sesión</button>
        </div>
        <p for="mostrar-registro" class="mostrar-registro" >¿No tienes cuenta? <a href="#" id="mostrar-registro">Regístrate</a></p>

        <!--seccion-registro-->
        <div id="seccion-registro" class="seccion-registro disabled">
            <p>Ingresa tu email:<small>(Requerido)</small></p>
            <input type="email" id="registro-email" placeholder="Correo" required>
            <p>Ingresa tu nombre de usuario:<small>(Requerido)</small></p>
            <input type="text" id="registro-usuario" placeholder="Nombre de usuario" required>
            <p>Ingresa tu contraseña:<small>(Requerido)</small></p>
            <input type="password" id="registro-password" placeholder="Contraseña" required>
            <p>Confirma tu contraseña:<small>(Requerido)</small></p>
            <input type="password" id="registro-password2" placeholder="Confirmar Contraseña" required>
            <p>Ingresa tu nombre:<small>(Requerido)</small></p>
            <input type="text" id="registro-nombre" placeholder="Nombre" required>
            <p>Ingresa tu apellido:<small>(Requerido)</small></p>
            <input type="text" id="registro-apellido" placeholder="Apellido" required>
            <p>Ingresa tu documento de identificación:<small>(Requerido)</small></p>
            <input type="text" id="registro-documento" placeholder="Documento de Identificación" required>
            <p>Ingresa tu número de celular:<small>(Opcional)</small></p>
            <input type="text" id="registro-celular" placeholder="Celular" >
            <p>Ingresa tu dirección:<small>(Opcional)</small></p>
            <input type="text" id="registro-direccion" placeholder="Dirección">
            <p>Ingresa tu método de pago:<small>(Opcional)</small></p>
            <input type="text" id="registro-pago" placeholder="Método de Pago">
            <button id="boton-registrarse">Registrame</button>
        </div>
        <p for="mostrar-login" class="mostrar-login disabled" >¿Ya tienes cuenta? <a href="#" id="mostrar-login">Iniciar Sesión</a></p>

        <button id="cerrar-popup" class="cerrar-popup" title="Cerrar"><i class="bi bi-x-lg"></i></button>

    </div>
    `;

    // Añade el popup al contenedor
    popupContainer.appendChild(divPopup);

    const mostrarRegistro = document.querySelector(".mostrar-registro");
    const mostrarLogin = document.querySelector(".mostrar-login");
    const seccionLogin = document.getElementById("seccion-login");
    const seccionRegistro = document.getElementById("seccion-registro");
    const tituloPopup = document.getElementById("titulo-popup");
    // Configura los eventos dentro del popup

    mostrarRegistro.addEventListener("click", (e) => {
        e.preventDefault();
        seccionLogin.classList.add("disabled");
        seccionRegistro.classList.remove("disabled");
        mostrarRegistro.classList.add("disabled");
        mostrarLogin.classList.remove("disabled");
        tituloPopup.textContent = "Regístro";
    });

    mostrarLogin.addEventListener("click", (e) => {
        e.preventDefault();
        seccionRegistro.classList.add("disabled");
        seccionLogin.classList.remove("disabled");
        mostrarRegistro.classList.remove("disabled");
        mostrarLogin.classList.add("disabled");
        tituloPopup.textContent = "Iniciar Sesión";
    });

    document.getElementById("cerrar-popup").addEventListener("click", () => {
        popupContainer.classList.add("disabled");
    });

    // Evento para el botón de registro
    // Evento para el botón de registro
    document.getElementById("boton-registrarse").addEventListener("click", registrarUsuario);
    document.getElementById("registro-documento").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            registrarUsuario();
        }
    });
    document.getElementById("registro-celular").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            registrarUsuario();
        }
    });
    document.getElementById("registro-direccion").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            registrarUsuario();
        }
    });
    document.getElementById("registro-pago").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            registrarUsuario();
        }
    });


    function registrarUsuario() {
        const email = document.getElementById("registro-email").value;
        const username = document.getElementById("registro-usuario").value;
        const password = document.getElementById("registro-password").value;
        const confirmPassword = document.getElementById("registro-password2").value;

        if (!email || !username || !password || !confirmPassword) {
            Swal.fire({
                title: "Error",
                text: "Por favor, completa todos los campos obligatorios.",
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6"
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                title: "Error",
                text: "Las contraseñas no coinciden.",
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6"
            });
            return;
        }

        const usuario = {
            email,
            username,
            password,
            nombres: document.getElementById("registro-nombre").value,
            apellidos: document.getElementById("registro-apellido").value,
            documento: document.getElementById("registro-documento").value,
            direccion: document.getElementById("registro-direccion").value || "",
            celular: document.getElementById("registro-celular").value || "",
            metodoPago: document.getElementById("registro-pago").value || "",
        };

        // Guardamos en localStorage (esto se cambiará cuando conectemos con Django)
        localStorage.setItem("usuario", JSON.stringify(usuario));
        Swal.fire({
            title: "Registro exitoso",
            text: "Tu cuenta ha sido creada.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6"
        });
        seccionRegistro.classList.add("disabled");
        seccionLogin.classList.remove("disabled");
        mostrarRegistro.classList.remove("disabled");
        mostrarLogin.classList.add("disabled");
        tituloPopup.textContent = "Iniciar Sesión";
    }


    // Evento para el botón de iniciar sesión
    document.getElementById("boton-iniciar-sesion").addEventListener("click", iniciarSesion);
    document.getElementById("login-password").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            iniciarSesion();
        }
    });


    function iniciarSesion() {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (usuario && (usuario.email === email || usuario.username === email) && usuario.password === password) {
            Swal.fire({
                title: "Inicio de sesión exitoso",
                text: "Bienvenido de nuevo.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6"
            });
            popupContainer.classList.add("disabled");
            location.reload();
        } else if (usuario && (usuario.email === email || usuario.username === email) && usuario.password !== password) {
            Swal.fire({
                title: "Contraseña incorrecta",
                text: "Verifica que tu email o nombre de usuario y contraseña, sean correctos.",
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6"
            })
            return;
        } else if (usuario && (usuario.email !== email || usuario.username !== email) && usuario.password === password) {
            Swal.fire({
                title: "El correo de usuario o nombre de usuario no existe",
                text: "Verifica que tu email o nombre de usuario y contraseña, sean correctos.",
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6"
            })
            return;
        }
        else {
            Swal.fire({
                title: "Parece que no tienes cuenta",
                text: "Antes de iniciar sesión, por favor regístrate.",
                icon: "error",
                confirmButtonText: "Quiero registrarme",
                cancelButtonText: "Quizas mas tarde",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                CancelButtonColor: "#d33",
            }) .then((result) => {
                if (result.isConfirmed) {
                seccionLogin.classList.add("disabled");
                seccionRegistro.classList.remove("disabled");
                mostrarRegistro.classList.add("disabled");
                mostrarLogin.classList.remove("disabled");
                tituloPopup.textContent = "Regístro";
                }
                else {
                    return;
                }
            });
        }
    }
}

// Configura el evento para mostrar el popup al hacer clic en "Mi perfil"
if (nombreUsuario) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
        nombreUsuario.textContent = usuario.nombres;
        botonUsuario.href = "perfil.html";
    } else {
        botonUsuario.addEventListener("click", (e) => {
            e.preventDefault();
            mostrarPopup();
        });
    }
}


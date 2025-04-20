const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
});

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
});

document.addEventListener("DOMContentLoaded", () => {
    const botonesCategorias = document.querySelectorAll(".boton-categorias");
    botonesCategorias.forEach(boton => 
        boton.addEventListener("click", (e) => {
            aside.classList.remove("aside-visible");
        })
    );

    initializeUserButton();
});


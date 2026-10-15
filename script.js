"use strict";


/* =========================================
   CÓDIGO DE CONSULTA
========================================= */

const CODIGO_CONSULTA = "1013590763-24";


/* =========================================
   DATOS DEL REGISTRO
========================================= */

const registro = {

    nombre:
        "Andres Felipe Salinas Mondragon",

    documento:
        "C.C. 1.013.590.763 de Bogota",

    programa:
        "Educación Media",

    titulo:
        "Bachiller Académico",

    fecha:
        "29 de Noviembre de 2024",

    acta:
        "024"

};


/* =========================================
   DOCUMENTOS
========================================= */

const documentos = {

    acta: {

        titulo:
            "Acta Individual de Grado",

        archivo:
            "acta.png",

        descarga:
            "Acta_Individual_de_Grado.png"

    },

    diploma: {

        titulo:
            "Diploma de Grado",

        archivo:
            "diploma.png",

        descarga:
            "Diploma_de_Grado.png"

    }

};


/* =========================================
   ELEMENTOS
========================================= */

const codigo =
    document.getElementById("codigo");

const consultar =
    document.getElementById("btnConsultar");

const mensaje =
    document.getElementById("mensaje");

const resultado =
    document.getElementById("resultado");

const visor =
    document.getElementById("visor");

const visorTitulo =
    document.getElementById("visorTitulo");

const imagen =
    document.getElementById("imagenDocumento");

const cerrar =
    document.getElementById("cerrar");


/* =========================================
   CARGAR DATOS
========================================= */

function cargarDatos() {

    document.getElementById("nombre")
        .textContent = registro.nombre;

    document.getElementById("documento")
        .textContent = registro.documento;

    document.getElementById("programa")
        .textContent = registro.programa;

    document.getElementById("titulo")
        .textContent = registro.titulo;

    document.getElementById("fecha")
        .textContent = registro.fecha;

    document.getElementById("acta")
        .textContent = registro.acta;
}


/* =========================================
   CONSULTAR
========================================= */

function realizarConsulta() {

    const valor =
        codigo.value
            .trim()
            .toUpperCase();


    mensaje.style.display = "none";

    resultado.classList.remove(
        "visible"
    );


    if (!valor) {

        mensaje.textContent =
            "Ingrese el código de consulta.";

        mensaje.style.display = "block";

        codigo.focus();

        return;
    }


    if (valor !== CODIGO_CONSULTA) {

        mensaje.textContent =
            "El código ingresado no corresponde al registro.";

        mensaje.style.display = "block";

        codigo.focus();

        return;
    }


    cargarDatos();


    resultado.classList.add(
        "visible"
    );


    setTimeout(() => {

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);
}


/* =========================================
   ABRIR DOCUMENTO
========================================= */

function abrirDocumento(tipo) {

    const documento =
        documentos[tipo];

    if (!documento) {
        return;
    }


    visorTitulo.textContent =
        documento.titulo;

    imagen.src =
        documento.archivo;

    imagen.alt =
        documento.titulo;


    visor.classList.add(
        "visible"
    );

    document.body.style.overflow =
        "hidden";
}


/* =========================================
   CERRAR DOCUMENTO
========================================= */

function cerrarDocumento() {

    visor.classList.remove(
        "visible"
    );

    imagen.src = "";

    document.body.style.overflow =
        "";
}


/* =========================================
   DESCARGAR
========================================= */

function descargarDocumento(tipo) {

    const documento =
        documentos[tipo];

    if (!documento) {
        return;
    }


    const enlace =
        document.createElement("a");

    enlace.href =
        documento.archivo;

    enlace.download =
        documento.descarga;

    document.body.appendChild(
        enlace
    );

    enlace.click();

    enlace.remove();
}


/* =========================================
   IMPRIMIR
========================================= */

function imprimirDocumento(tipo) {

    const documento =
        documentos[tipo];

    if (!documento) {
        return;
    }


    const ventana =
        window.open(
            "",
            "_blank",
            "width=900,height=700"
        );


    if (!ventana) {

        alert(
            "Permita las ventanas emergentes para imprimir."
        );

        return;
    }


    ventana.document.write(`

        <!DOCTYPE html>

        <html lang="es">

        <head>

            <meta charset="UTF-8">

            <title>
                ${documento.titulo}
            </title>

            <style>

                html,
                body {

                    margin: 0;
                    padding: 0;

                    background: white;

                }

                .documento {

                    width: 100%;

                    text-align: center;

                }

                img {

                    width: 100%;

                    max-width: 100%;

                    height: auto;

                }

                @media print {

                    img {

                        width: 100%;

                    }

                }

            </style>

        </head>

        <body>

            <div class="documento">

                <img
                    src="${documento.archivo}"
                    onload="window.print()"
                >

            </div>

        </body>

        </html>

    `);

    ventana.document.close();
}


/* =========================================
   EVENTOS
========================================= */

consultar.addEventListener(
    "click",
    realizarConsulta
);


codigo.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            realizarConsulta();

        }

    }
);


/* ACTA */

document
    .getElementById("verActa")
    .addEventListener(
        "click",
        () => abrirDocumento("acta")
    );


document
    .getElementById("descargarActa")
    .addEventListener(
        "click",
        () => descargarDocumento("acta")
    );


document
    .getElementById("imprimirActa")
    .addEventListener(
        "click",
        () => imprimirDocumento("acta")
    );


/* DIPLOMA */

document
    .getElementById("verDiploma")
    .addEventListener(
        "click",
        () => abrirDocumento("diploma")
    );


document
    .getElementById("descargarDiploma")
    .addEventListener(
        "click",
        () => descargarDocumento("diploma")
    );


document
    .getElementById("imprimirDiploma")
    .addEventListener(
        "click",
        () => imprimirDocumento("diploma")
    );


/* CERRAR */

cerrar.addEventListener(
    "click",
    cerrarDocumento
);


visor.addEventListener(
    "click",
    function(event) {

        if (event.target === visor) {

            cerrarDocumento();

        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            cerrarDocumento();

        }

    }
);
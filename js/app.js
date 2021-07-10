let cadena, cod;
const tener = RegExp("(TIENE|TIENES|TENES|TENÉS)");
const intgc = RegExp("(C.MO|QU.|CU.L|CU.N.O|D.NDE)");
const curso = RegExp("(CURSO)");
const eres = RegExp("(ERES|VIVES)");
const edad = RegExp("(AÑOS|EDAD)");
const saludo = /HOLA/;
const novia = /NOVIA/;
const hijo = /HIJOS/;
const experiencia = RegExp("(EXPERIENCIA|TRABAJA|TRABAJO|LABORAL)");
const habilidades = RegExp("(HABILIDAD|DESTREZA|FORTALEZA)");
const pasatiempo = RegExp("(PASATIEMPO|GUST.|HACES|INTERESES)");
const estudio = RegExp("(ESTUDIA|ESTUDIO|CARRERA|PROFECI.N|GRADO)");
const contacto = RegExp("(CONTACTA|CONTACTO|NUMERO|CORREO)");
const nombre = RegExp("(NOMBRE|LLAMAS)");
let nores = 0;


function send() {
    if (chat.value == "") {

    } else {
        mostrarMsg(chat.value);
        chat.value = "";

    }
}


function evaluarPregunta(cad) {
    cod = 0;
    cadena = cad.toUpperCase();

    if (saludo.test(cadena) == true) {
        cod = 1;
    }

    if ((tener.test(cadena) == true && edad.test(cadena) == true) || (intgc.test(cadena) == true && edad.test(cadena) == true)) {
        cod = 2;
    }
    if ((intgc.test(cadena) == true && pasatiempo.test(cadena) == true) || (tener.test(cadena) == true && pasatiempo.test(cadena) == true)) {
        cod = 3;
    }
    if (intgc.test(cadena) == true && estudio.test(cadena) == true) {
        cod = 4;
    }
    if (intgc.test(cadena) == true && eres.test(cadena) == true) {
        cod = 5;
    }
    if (curso.test(cadena) == true) {
        cod = 6;
    }
    if (intgc.test(cadena) == true && experiencia.test(cadena) == true) {
        cod = 7;
    }

    if ((tener.test(cadena) == true || intgc.test(cadena) == true) && habilidades.test(cadena) == true) {
        cod = 8;
    }
    if (contacto.test(cadena) == true) {
        cod = 9;
    }
    if (intgc.test(cadena) == true && nombre.test(cadena) == true) {
        cod = 10;
    }
    if (cod == 0) {
        nores = nores + 1;
        if (nores > 3) {
            cod = 11;
        }
    }

    return cod;
}


async function obtenerRespuesta(cod) {
    const url = 'respuestas.json';
    const resultado = await fetch(url);
    const datos = await resultado.json();
    return datos.respuestas[cod].respuesta;

}

const mostrarMsg = (msg) => {
    const cod = evaluarPregunta(msg);
    const chatBody = document.querySelector(".scroller");
    const divUser = document.createElement("div");
    divUser.className = "me visible";
    divUser.textContent = msg;
    chatBody.append(divUser);
    scrollchat()
    //respuesta bot
    obtenerRespuesta(cod)
        .then(res => {
            if (cod == 3 || cod == 6 || cod == 7 || cod == 11) {
                time = 0;
                res.forEach(element => {
                    time += 600;
                    const divCpu = document.createElement("div");
                    divCpu.className = "jose visible";
                    divCpu.innerHTML = element;
                    setTimeout(() => {
                        chatBody.append(divCpu);
                        scrollchat()
                    }, time);
                });

            } else {
                const divCpu = document.createElement("div");
                divCpu.className = "jose visible";
                n = res.length;
                divCpu.innerHTML = res[Math.floor(Math.random() * (0 - n)) + n];
                setTimeout(() => {
                    chatBody.append(divCpu);
                    scrollchat()
                }, 600);
            }
        })
        .catch(() => {
            const divCpu = document.createElement("div");
            divCpu.className = "jose visible";
            console.log("error");
            divCpu.innerHTML = "Disculpa no entendi tu pregunta";
            setTimeout(() => {
                chatBody.append(divCpu);
                scrollchat()
            }, 600);
        });
}

function scrollchat() {
    let elementoch = document.querySelectorAll('.visible');
    let n = elementoch.length - 1
    elementoch[n].scrollIntoView({ block: "end", behavior: "smooth" });
}

const chat = document.getElementById("chat");
chat.addEventListener("keydown", function (event) {
    console.log("Escribiendo...");
    if (event.keyCode === 13) {
        send();
    }
}, false);

var chatbot = document.getElementById('chatbot');
var chatbutton = document.getElementById('chat-button');
function cerrar_w() {
    chatbot.classList.replace("visible", "none");
    chatbutton.classList.replace("none", "visible");

};
function abrir_w() {
    chatbot.classList.replace("none", "visible");
    chatbutton.classList.replace("visible", "none");


};
/* Generar de manera aleatoria un numero entre 0 y 79 */
function generateRandomNumber() {
	return Math.floor(Math.random() * 80);
}

/* Definir botones de generar comida y limpiar pantalla */
const boton_generar = document.getElementById("boton-generar");
boton_generar.addEventListener("click", () => {
	const numero = generateRandomNumber();
	const casilla = document.getElementById(`c-${numero}`);
	casilla.classList.add("comida");
});

const boton_limpiar = document.getElementById("limpiar");
boton_limpiar.addEventListener("click", () => {
	const casillas = document.getElementsByClassName("casilla");
	for (let i = 0; i < casillas.length; i++) {
		casillas[i].style.backgroundColor = "white";
	}
});

/* Definir botones de movimiento */
const boton_derecha = document.getElementById("derecha");
boton_derecha.addEventListener("click", () => {
	movimiento = "derecha";
});

const boton_izquierda = document.getElementById("izquierda");
boton_izquierda.addEventListener("click", () => {
	movimiento = "izquierda";
});

const boton_arriba = document.getElementById("arriba");
boton_arriba.addEventListener("click", () => {
	movimiento = "arriba";
});

const boton_abajo = document.getElementById("abajo");
boton_abajo.addEventListener("click", () => {
	movimiento = "abajo";
});

/* Definir movimiento */
let movimiento = "derecha";

/* generar comida */
let casilla_comida = generateRandomNumber();
let casilla = document.getElementById(`c-${casilla_comida}`);
casilla.classList.add("comida");
//casilla.style.backgroundColor = "red";

/* Definir movimiento */ /* 0 - 79 */
/*                          0 - 9 | 10 - 19 ... */
let current_position = 0;
var cuerpo_snake = [current_position];

function pintar_snake() {
	for (let i = 0; i < cuerpo_snake.length; i++) {
		let casilla = document.getElementById(`c-${cuerpo_snake[i]}`);
		casilla.style.backgroundColor = "black";
	}
}

function verificar_si_comio() {
	let casilla = document.getElementById(`c-${current_position}`);
	if (casilla_comida == current_position) {
		console.log("coincidieron");
		cuerpo_snake.push(casilla_comida);

		return true;
	}
	return false;
}

function move_snake() {
	// verificar si comio
	if (verificar_si_comio()) {
		// generar nueva comida
		casilla_comida = generateRandomNumber();
		const casilla = document.getElementById(`c-${casilla_comida}`);

		//casilla.style.backgroundColor = "red";
	}

	// eliminar la cola
	let casilla_eliminada = cuerpo_snake.shift();

	// pintar la casilla eliminada de blanco
	let casilla = document.getElementById(`c-${casilla_eliminada}`);
	casilla.style.backgroundColor = "white";

	// Direccion de movimiento
	if (movimiento == "derecha") {
		current_position++;
	}
	if (movimiento == "izquierda") {
		current_position--;
	}
	if (movimiento == "arriba") {
		current_position -= 10;
	}
	if (movimiento == "abajo") {
		current_position += 10;
	}

	// agregar la cabeza
	cuerpo_snake.push(current_position);
	pintar_snake();

	console.log(cuerpo_snake);
}

setInterval(move_snake, 400);

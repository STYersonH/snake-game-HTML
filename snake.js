// FUNCIONALIDAD PENDIENTE :  mostrar una figura aleatoria que se tiene que hacer
// y para eso la snake debe alcanzar cierta longitud y debe formarse esa figura

// FUNCIONALIDA PENDIENTE : Comer una comida especial y activar la funcion de saltar
// sobre si misma

// cambiar de direccion cada vez que se presione un boton
document.getElementById("derecha").addEventListener("click", () => {
	if (snake.direction !== "left") snake.setDirection("right");
});
document.getElementById("izquierda").addEventListener("click", () => {
	if (snake.direction !== "right") snake.setDirection("left");
});
document.getElementById("arriba").addEventListener("click", () => {
	if (snake.direction !== "down") snake.setDirection("up");
});
document.getElementById("abajo").addEventListener("click", () => {
	if (snake.direction !== "up") snake.setDirection("down");
});

window.addEventListener("keydown", function (event) {
	switch (event.key) {
		case "ArrowUp":
			// restringir cuando puede cambiar de direccion
			if (snake.direction !== "down") snake.setDirection("up");
			break;
		case "ArrowDown":
			if (snake.direction !== "up") snake.setDirection("down");
			break;
		case "ArrowLeft":
			if (snake.direction !== "right") snake.setDirection("left");
			break;
		case "ArrowRight":
			if (snake.direction !== "left") snake.setDirection("right");
			break;

		case " ":
			// solo si el juego acabo se puede reiniciar
			if (snake.stateGame === "gameover") reiniciar();
			break;

		default:
			// Do nothing for other keys
			break;
	}
});

// Boton de reiniciar juego
document
	.getElementById("reiniciar")
	.addEventListener("click", () => reiniciar());

function reiniciar() {
	// Ocultar el game over
	document.getElementById("game-over").style.display = "none";
	document.getElementById("canva-dark").style.display = "none";
	// Limpiar el tablero
	for (let i = 0; i < 228; i++) {
		let casilla = document.getElementById(`c-${i}`);
		if (i % 2 == 0) {
			casilla.style.backgroundColor = "#B98E64";
		} else {
			casilla.style.backgroundColor = "#c89a6d";
		}

		casilla.classList.remove("comida");
		casilla.classList.remove("snake-body");
		casilla.classList.remove("snake-head");
	}

	// reiniciar score
	document.getElementById("score-value").innerHTML = 0;

	snake = new Snake();
	intervalId = setInterval(() => {
		snake.moverse();
		console.log(intervalId);
	}, 200);
}

function finalizar_juego() {
	console.log("fin del juego, interval id:", intervalId);
	clearInterval(intervalId);

	document.getElementById("game-over").style.display = "flex";
	document.getElementById("canva-dark").style.display = "flex";
	// mostrar score
	document.getElementById("game-over_score-value").innerHTML = snake.score;

	snake.stateGame = "gameover";
}

function actualizar_score() {
	const score = document.getElementById("score-value");
	score.innerHTML = snake.score;
}

class Snake {
	constructor() {
		this.stateGame = "playing"; // playing, paused, gameover
		this.body = [0, 1, 2]; // el cuerpo de la serpiente es inicialmente de 3 casillas
		this.head = this.obtener_posicion_cabeza();
		this.direction = "right";
		this.celda_de_comida = this.generar_comida();
		this.score = 0;
		//this.pintar_celda(this.celda_de_comida, "red");
		this.pintar_snake();
	}

	generar_numero_random() {
		let allNumbers = Array.from({ length: 228 }, (_, i) => i);
		let availableNumbers = allNumbers.filter((num) => !this.body.includes(num));
		let randomIndex = Math.floor(Math.random() * availableNumbers.length);
		return availableNumbers[randomIndex];

		return Math.floor(Math.random() * 228);
	}

	generar_comida() {
		let numero = this.generar_numero_random();
		let casilla = document.getElementById(`c-${numero}`);
		casilla.classList.add("comida");

		return numero;
	}

	pintar_celda(celda, color) {
		let casilla = document.getElementById(`c-${celda}`);
		casilla.style.backgroundColor = color;
	}

	pintar_snake() {
		for (let i = 0; i < this.body.length; i++) {
			//this.pintar_celda(this.body[i], "black");

			if (i == this.body.length - 1) {
				let celda_head = document.getElementById(`c-${this.body[i]}`);
				celda_head.classList.add("snake-head");
			} else {
				let celda_body = document.getElementById(`c-${this.body[i]}`);
				celda_body.classList.remove("snake-head");
				celda_body.classList.add("snake-body");
			}
		}
	}

	obtener_posicion_cabeza() {
		return this.body[this.body.length - 1];
	}

	revisar_si_comio() {
		if (this.celda_de_comida == this.obtener_posicion_cabeza()) {
			this.body.push(this.celda_de_comida);

			let casilla_comida_comida = document.getElementById(
				`c-${this.celda_de_comida}`
			);
			casilla_comida_comida.classList.remove("comida");

			this.celda_de_comida = this.generar_comida();
			//this.pintar_celda(this.celda_de_comida, "red");

			// actualizar score
			this.score += 1;
			actualizar_score();
		}
	}

	revisar_si_choco() {
		if (this.direction === "right" && this.head % 19 === 0) {
			return true;
		}

		if (this.direction === "left" && (this.head + 1) % 19 === 0) {
			return true;
		}

		if (this.direction === "up" && this.head < 0) {
			return true;
		}

		if (this.direction === "down" && this.head > 227) {
			return true;
		}
		return false;
	}

	revisar_si_se_comio() {
		let cuerpo_menos_cabeza = this.body.slice(0, this.body.length - 1);
		if (cuerpo_menos_cabeza.includes(this.head)) {
			return true;
		}
	}

	moverse() {
		if (this.direction === "right") this.body.push(this.head + 1);
		if (this.direction === "left") this.body.push(this.head - 1);
		if (this.direction === "up") this.body.push(this.head - 19);
		if (this.direction === "down") this.body.push(this.head + 19);

		// actualizar cabeza
		this.head = this.obtener_posicion_cabeza();

		// revisar si choco con la pared
		const choco = this.revisar_si_choco();

		if (choco) {
			finalizar_juego();
		} else {
			const casilla_eliminada = this.body.shift();
			// eliminar el estilo de la casilla eliminada
			document
				.getElementById(`c-${casilla_eliminada}`)
				.removeAttribute("style");

			// eliminar la clase snake-body de la casilla eliminada
			document
				.getElementById(`c-${casilla_eliminada}`)
				.classList.remove("snake-body");

			// revisar si se comio a si misma
			if (this.revisar_si_se_comio()) {
				finalizar_juego();
			}

			this.revisar_si_comio();

			this.pintar_snake();
		}
	}

	setDirection(direction) {
		this.direction = direction;
	}
}

/* --------------------------------
         EMPEZAR EL JUEGO
-------------------------------- */

let intervalId;
let snake;

reiniciar();

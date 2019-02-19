let cuadricula;
let cuadricula_new;
let puntaje = 0;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	miCanvas = $("#juego")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	cuadricula = vacia();
  	cuadricula_new = vacia();
	sumarNumero();
	run();
}

function capturaTeclado(event){
	let voltear = false;
 	let rotar = false;
  	let jugado = true;
  	switch(event.which){
	case 38: 
		cuadricula = girar(cuadricula);
      	voltear = true;
      	//arriba
      	break;
    case 40: 
		//abajo
		break;
	case 39:
		//derecha
		cuadricula = transponer(cuadricula);
      	rotar = true;
		break;
	case 37:
		cuadricula = transponer(cuadricula);
      	cuadricula = girar(cuadricula);
      	rotar = true;
      	voltear = true;
      	break;
		//izquierda
	default:
		jugado = false;
	}
	if (jugado) {
	    let pasado = copiarCuadricula(cuadricula);
	    for (let i = 0; i < 4; i++) {
	      cuadricula[i] = operar(cuadricula[i]);
	    }
	    let cambiar = comparar(pasado, cuadricula);
	    if (voltear) {
	      cuadricula = girar(cuadricula);
	    }
	    if (rotar) {
	      cuadricula = transponer(cuadricula);
	    }
	    if (cambiar) {
	      sumarNumero();
	    }
	    run();

	    let perdio = juegoPerdido();
	    if (perdio) {
	      console.log("GAME OVER");
	    }

	    let gano = juegoGanado();
	    if (gano) {
	      console.log("VICTORIA");
	    }

  }
	
}

function run(){ 
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d"); 
	contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

	dibujarCuadricula();	
	contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
	
	contexto.drawImage(buffer, 0, 0);
	setTimeout("run()",20);
}

function dibujarCuadricula() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      contexto.noFill();
      contexto.strokeWeight(2);
      let val = cuadricula[i][j];
      let s = val.toString();
      if (cuadricula_new[i][j] === 1) {
        contexto.stroke(200, 0, 200);
        contexto.strokeWeight(16);
        cuadricula_new[i][j] = 0;
      } else {
        contexto.strokeWeight(4);
        contexto.stroke(0);
      }

      if (val != 0) {
        contexto.fill(colorDimension[s].color);
      } else {
        contexto.noFill();
      }
      contexto.rect(i * w, j * w, w, w, 30);
      if (val !== 0) {
        contexto.textAlign(CENTER, CENTER);
        contexto.noStroke();
        contexto.fill(0);
        contexto.textSize(colorDimension[s].size);
        contexto.text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}

function operar(fila) {
  fila = deslizar(fila);
  fila = combinar(fila);
  fila = deslizar(fila);
  return fila;
}

function deslizar(fila) {
  let arr = fila.filter(val => val);
  let faltante = 4 - arr.length;
  let ceros = Array(faltante).fill(0);
  arr = ceros.concat(arr);
  return arr;
}

function combinar(fila) {
  for (let i = 3; i >= 1; i--) {
    let a = fila[i];
    let b = fila[i - 1];
    if (a == b) {
      fila[i] = a + b;
      puntaje += fila[i];
      fila[i - 1] = 0;
    }
  }
  return fila;
}

function juegoGanado() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (cuadricula[i][j] == 2048) {
        return true;
      }
    }
  }
  return false;
}


function juegoPerdido() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (cuadricula[i][j] == 0) {
        return false;
      }
      if (i !== 3 && cuadricula[i][j] === cuadricula[i + 1][j]) {
        return false;
      }
      if (j !== 3 && cuadricula[i][j] === cuadricula[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}

var jugando;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	miCanvas = $("#juego")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	numero = new Numero();
	run();	
	/*
	$('#instrucciones').click(function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
    });
    
    $('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });
    
    $("#iniciar").click(function(){	
		if(!jugando)
			inicio();	
	});*/
}

function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		numero.actualizar('arriba');
	if(event.which==40 || event.which==83)
		numero.actualizar('abajo');
	if(event.which==39 || event.which==68)
		numero.actualizar('derecha');
	if(event.which==37 || event.which==65)
		numero.actualizar('izquierda');
	
}

function run(){ 
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d");
		 
	if(jugando){  
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

		numero.dibujar(contextoBuffer);
	/*	if(quica.colision(calacas[i].x,calacas[i].y)){
			quica.sprite = 2;
			quica.vida--;
			$('#pierde')[0].play();
		}*/
			
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		
	}else{
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ffffff";
		quica.sprite = 3;
		quica.vida = 0;
		quica.dibujar(contextoBuffer);
		contextoBuffer.font = "50px sans-serif";
		contextoBuffer.fillText("GAMEOVER", 300, 440);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "15px sans-serif";
		contextoBuffer.fillText("try again", 550, 460);
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
	}
	
}
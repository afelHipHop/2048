function Numero(sprite=0,puntos=0){
	this.x = 140; //x=3
	this.y = 344; //y=5
	this.img = [$("#2")[0],$("#4")[0],$("#8")[0],$("#16")[0],$("#32")[0],$("#64")[0],$("#128")[0],$("#256")[0],$("#512")[0],$("#1024")[0],$("#2048")[0]];
	this.sprite = sprite;
	this.puntos = puntos;

	this.dibujar = function(ctx){
		var img = this.img[this.sprite];
		var x = this.x;
		var y = this.y;
		ctx.drawImage(img, x, y);
		ctx.save();
		ctx.restore();
	}
	
	this.actualizar = function(accion){
		if(accion=="abajo" && this.y < 344){
			this.y += 68;
		}
		if(accion=="arriba" && this.y > 4){
			this.y -= 68;
		}
		if(accion=="izquierda" && this.x > 4){
			this.x -= 68;
		}
		if(accion=="derecha" && this.x < 276){
			this.x += 68;
		}
		//this.x = (344 + this.x)%344;
		//this.y = (412 + this.y)%412;
		
	}
	/*
	this.colision = function(x,y){
		var distancia=Math.sqrt( Math.pow( (x-this.x), 2)+Math.pow( (y-this.y),2));
		if(distancia>this.img[this.sprite].width)
		   return false;
		else
		   return true;	
	}*/

}
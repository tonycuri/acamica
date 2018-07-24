/* El objeto jugador es un objeto literal que se encuentra incompleto.
 Solo tiene asignadas algunas de sus propiedades y ningun metodo */
var Jugador = {
  /* el sprite contiene la ruta de la imagen
  */
  sprite: 'imagenes/auto_rojo_abajo.png',
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 5,
  mover:function(movX,movY){
    this.x = this.x + movX;
    this.y = this.y + movY;
    
    if (this.x > this.x + movX){
      Jugador.sprite = "imagenes/auto_rojo_izquierda.png";
      Jugador.alto = 15;
      Jugador.ancho = 30;
    }else if(this.x < this.x + movX){
      Jugador.sprite = "imagenes/auto_rojo_derecha.png";
      Jugador.alto = 15;
      Jugador.ancho = 30;
    }else if(this.y > this.y + movY){
      Jugador.sprite = "imagenes/auto_rojo_arriba.png";
      Jugador.alto = 30;
      Jugador.ancho = 15;
    } else if (this.y < this.y + movY) {
      Jugador.sprite = "imagenes/auto_rojo_abajo.png";
      Jugador.alto = 30;
      Jugador.ancho = 15;
    }
  },
  perderVidas:function(){
    this.vidas = this.vidas - 1;
    console.log("perdiste una vida");
  }
  // Hay que agregar lo que falte al jugador: movimientos, perdida de vidas,
  // y todo lo que haga falta para que cumpla con sus responsabilidades

}

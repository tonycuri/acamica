/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    
    // var Ids = [];
    // for (let i = 0; i <  this.preguntas.length; i++)  {
    //   Ids.push(this.preguntas[i].id);      
    // }

    // if(Ids.length != 0){
    //   var max = Ids.reduce(function(a, b) {
    //     return Math.max(a, b);
    //   });
    //   return max;
    // } else {
    //   return 0;
    // }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    console.log(id);
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
  },
};

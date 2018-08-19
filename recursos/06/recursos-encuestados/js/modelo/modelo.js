/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaGuardada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    return this.ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
    console.log(nuevaPregunta);
  },

  //se guardan las preguntas
  guardar: function(){
    //guardamos las preguntas en el navegador
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
    this.preguntaGuardada.notificar();
    console.log(this.preguntas);
  },

  borrarPregunta: function(pregunta){
    var index = this.preguntas.findIndex(preg => preg.id == pregunta.id);
    this.preguntas.splice(index, 1);
    this.guardar();
    this.preguntaBorrada.notificar();
  },
};

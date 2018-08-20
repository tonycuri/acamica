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
    console.log(this.preguntas);
    var ultimo = [];
    for (let i = 0; i <  this.preguntas.length; i++)  {
      ultimo.push(this.preguntas[i].id);      
    }

    if(ultimo.length != 0){
      var max = ultimo.reduce(function(a, b) {
        return Math.max(a, b);
      });
      return max;
    } else {
      return 0;
    }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
    this.preguntaGuardada.notificar();
    console.log("modelo guardando pregunta");
  },
  borrarPregunta: function(){
  },
  
};

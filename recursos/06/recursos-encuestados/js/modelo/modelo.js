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
  this.preguntasBorradas= new Evento(this);
  this.preguntaEditada = new Evento(this);
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
    console.log("modelo || pregunta agregada");
  },

  //se guardan las preguntas en el navegador
  guardar: function(){
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
    this.preguntaGuardada.notificar();
    console.log("modelo guardando pregunta");
  },

  //se agrega la funcion de borrar la pregunta seleccionada
  borrarPregunta: function(id){
    for (let i = 0; i < this.preguntas.length; i++) {
      if(this.preguntas[i].id == id){
        this.preguntas.splice(i,1);
        break;
      }
    }
    this.guardar();
    this.preguntaBorrada.notificar();
    console.log("modelo || pregunta borrada");
  },

  //se agrega la funcion de borrar todas las preguntas
  borrarPreguntas: function(){
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar();
  },
  
  editarPregunta: function(id){
    for (let i = 0; i < this.preguntas.length; i++) {
      if(this.preguntas[i].id == id){
        this.preguntas[i].textoPregunta = prompt('Editar Pregunta');
        break;
      }
    }
    this.guardar();
    this.preguntaEditada.notificar();
    console.log("modelo || pregunta editada");
  },
};

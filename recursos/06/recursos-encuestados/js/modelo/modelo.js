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
    // var ultimo = lista[0];
    // for (let i = 0; i < lista.length; i++) {
    //   if(lista[i] > ultimo){
    //     ultimo = lista[i];
    //   } 
    //   return ultimo;
    // }
    // return this.ultimoId;
    var ids = [];
    for (let i = 0; i <  this.preguntas.length; i++)  {
      ids.push(this.preguntas[i].id);      
    }

    if(ids.length != 0){
      var max = ids.reduce(function(a, b) {
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
    // localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
    // localStorage.setItem("ultimoId", JSON.stringify(this.ultimoId));

    // var stringPreguntas = JSON.stringify(preguntas);
    // localStorage.setItem("preguntas",stringPreguntas);

    // console.log("|| MODELO => GUARDANDO PREGUNTA")
    // console.log("-|| NuevaPregunta DATA: " + this.preguntas[this.preguntas.length - 1]);
  },
};

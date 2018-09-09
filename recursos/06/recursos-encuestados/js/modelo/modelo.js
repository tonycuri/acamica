/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;
  this.cargar();

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaGuardada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntasBorradas= new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.sumarVoto = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
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
  },

  agregarVoto: function (pregunta, respuestaTexto) {
    var respuestaSeleccionada = pregunta.cantidadPorRespuesta;
    for (let i = 0; i <  respuestaSeleccionada.length; i++)  {
      if(respuestaSeleccionada[i].textoRespuesta == respuestaTexto){
        respuestaSeleccionada[i].cantidad += 1;
      }
    }
    this.guardar();
    this.sumarVoto.notificar();
  },

  obtenerPregunta : function(nombrePregunta){
    for ( var i = 0 ; i < this.preguntas.length ; i++ ){
      var preg ;
      if  (nombrePregunta == this.preguntas[i].textoPregunta ){
        preg = this.preguntas[i];
      }
    }
    return preg;
},  

  //se guardan las preguntas en el navegador
  guardar: function(){
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
    this.preguntaGuardada.notificar();
  },

  cargar : function(){
    if (localStorage.getItem('preguntas')== null){
      localStorage.setItem('preguntas', JSON.stringify());
    }else{ 
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    };  
  }
};

/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

var Respuesta = function(texto){
  this.textoRespuesta = texto,
  this.cantidad = 0;
}

Controlador.prototype = {
  agregarPregunta: function() {
    if(this.validar()){
      var value = $('#pregunta').val();
      var respuestas = [];
  
      $('.has-success [name="option[]"]').each(function() {
        var respuesta = new Respuesta($(this).val());
        respuestas.push(respuesta);   
      })
      this.modelo.agregarPregunta(value, respuestas);
    } 
  },

  agregarVotos: function(){
    if (this.validar()) {
      var contexto = this;
      $('#preguntas').find('div').each(function(){
        var nombrePregunta = $(this).attr('value')
        var id = $(this).attr('id')
        var pregunta = contexto.modelo.obtenerPregunta(nombrePregunta);
        var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
        $('input[name=' + id + ']').prop('checked',false);
        contexto.modelo.agregarVoto(pregunta,respuestaSeleccionada);
      });
    };
  },

  borrarPregunta: function(){
    var id = parseInt($('.list-group-item.active').attr('id'));
    this.modelo.borrarPregunta(id);
  },

  borrarPreguntas: function(){
    this.modelo.borrarPreguntas();
  },

  editarPregunta: function(){
    var id = parseInt($('.list-group-item.active').attr('id'));
    this.modelo.editarPregunta(id);
  },

  validar: function(){
    var input = $('input').val();
    if(input != ''){
      return true;
    }else{
      alert('Por favor complete todos los campos');
    }
  }
};

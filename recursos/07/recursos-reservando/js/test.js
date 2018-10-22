var expect = chai.expect;
var restaurant = new Restaurant();

describe('Test Reservado', function () {
  'use strict';

  describe('Testeando la funcion reservarHorario', function () {
    //copiamos el texto de la consgina para que pueda ser identificada la prueba.
    it('Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo', function () {
      //definimos los horarios por cada ejemplo
      restaurant = listado.restaurantes[1];
      restaurant.reservarHorario('15:00');
      expect(restaurant.horarios[0]).to.equal('12:30');
      expect(restaurant.horarios[1]).to.equal('14:30');
      expect(restaurant.horarios.length).to.equal(2);
    });

    //copiamos el texto de la consgina para que pueda ser identificada la prueba.
    it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.', function () {
      //definimos los horarios por cada ejemplo
      restaurant = listado.restaurantes[2];
      restaurant.reservarHorario('14:00');
      expect(restaurant.horarios[0]).to.equal('11:30');
      expect(restaurant.horarios[1]).to.equal('12:00');
      expect(restaurant.horarios.length).to.equal(3);
    });

    //copiamos el texto de la consgina para que pueda ser identificada la prueba.
    it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.', function () {
      //definimos los horarios por cada ejemplo
      restaurant = listado.restaurantes[3];
      restaurant.reservarHorario();
      expect(restaurant.horarios[0]).to.equal('12:00');
      expect(restaurant.horarios[1]).to.equal('15:00');
      expect(restaurant.horarios.length).to.equal(3);
    });

    it('Cuando se reservan todos los horarios.', function () {
      //definimos los horarios por cada ejemplo
      restaurant = listado.restaurantes[4];
      restaurant.reservarHorario('12:00');
      restaurant.reservarHorario('13:30');
      restaurant.reservarHorario('16:00');
      expect(restaurant.horarios.length).to.equal(0);
    });
  });

  describe('Testeando la funcion optenerPuntuacion', function () {
    it('Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.', function () {
      expect(listado.restaurantes[1].obtenerPuntuacion()).to.equal(6.6);
      expect(listado.restaurantes[2].obtenerPuntuacion()).to.equal(7);
    });

    it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.', function () {
      listado.restaurantes[3].calificaciones = [];
      expect(listado.restaurantes[3].obtenerPuntuacion()).to.equal(0);
    });
  });

  describe('Testeando la función calificar', function () {
    it('se agrega una calificacion al restautant', function () {
      listado.restaurantes[5].calificar(3);
      expect(listado.restaurantes[5].calificaciones.length).to.equal(7);
    });

    it('No se agregan calificaciones al restaurant', function () {
      listado.restaurantes[4].calificar()
      expect(listado.restaurantes[4].calificaciones.length).to.equal(6);
    });
  });

  describe('Testeando la función buscarRestaurante', function () {
    it('Encuentra un restaurante al ingresar un id', function () {
      expect(listado.buscarRestaurante(5).id).to.equal(5);
    });
    it('Mensaje de error al no colocar un id correcto', function () {
      expect(listado.buscarRestaurante(70)).to.equal('No se ha encontrado ningún restaurant');
    });
  });

  describe('Testeando la función obtenerRestaurantes', function () {
    it('Encuentra un restaurante al ingresar una ciudad, rubro, horario ', function () {
      expect(listado.obtenerRestaurantes('Pasta', 'Roma', '19:00').length).to.equal(1);
    });
    it('No da error si no se usan los filtros', function () {
      expect(listado.obtenerRestaurantes(null, null, null).length).to.equal(24);
    });
    it('Funciona correctamente usan diferentes combinaciones de filtros', function () {
      expect(listado.obtenerRestaurantes(null, null, '11:00').length).to.equal(1);
      expect(listado.obtenerRestaurantes(null, 'Berlín', null).length).to.equal(5);
      expect(listado.obtenerRestaurantes('Hamburguesa', null, null).length).to.equal(4);
    });
  });

  describe('Testeando la funcion PrecioBase del objeto Reserva ',function(){
    it('Calcula correctamente el precio Base',function(){
        expect(listadoReservas[0].precioBase()).to.equal(2800);
        expect(listadoReservas[1].precioBase()).to.equal(300);      
    });

  });

  describe('Testeando la funcion PrecioFinal del objeto Reserva',function(){
      it('Calcula correctamente su precio Final',function(){
        expect(listadoReservas[0].precioFinal()).to.equal(2310);
        expect(listadoReservas[1].precioFinal()).to.equal(100);
      });
  });
})
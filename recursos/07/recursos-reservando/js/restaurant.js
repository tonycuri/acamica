const Restaurant = function (id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function (horarioReserva) {
    this.horarios = this.horarios.filter(function (horario) {
        return horario !== horarioReserva;
    });
}

Restaurant.prototype.calificar = function (nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function () {
    return this.promedio(this.calificaciones);
}

Restaurant.prototype.sumatoria = function (arraySuma) {
    var sumatoria = 0;

    arraySuma.forEach(element => {
        sumatoria += element;
    });

    return sumatoria;
}

Restaurant.prototype.promedio = function (arrayPromedio) {
    if (arrayPromedio.length == 0) {
        return 0;
    }
    return Math.round((this.sumatoria(arrayPromedio) / arrayPromedio.length) * 10) / 10;
}
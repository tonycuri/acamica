var Reserva = function (horario, cantPersonas, precioPersona, descuento) {
    this.horario = horario;
    this.cantPersonas = cantPersonas;
    this.precioPersona = precioPersona;
    this.descuento = descuento;
}

Reserva.prototype.precioBase = function () {
    return this.cantPersonas * this.precioPersona;
}

Reserva.prototype.precioFinal = function () {
    return this.precioBase() - this.descuentoTotal() + this.adicionalesTotal();

}

Reserva.prototype.descuentoPorGrupo = function () {
    if (this.cantPersonas >= 4 && this.cantPersonas < 6) {
        return (this.precioBase() * 5) / 100
    } else if (this.cantPersonas >= 6 && this.cantPersonas < 8) {
        return (this.precioBase() * 10) / 100
    } else if (this.cantPersonas >= 8 && this.cantPersonas < 10) {
        return (this.precioBase() * 15 / 100)
    }
    return 0;
}

Reserva.prototype.descuentosGrupo = function (base) {

    if (this.cantPersonas >= 4 && this.cantPersonas < 6) {
        return (this.precioBase() * 5) / 100;
    } else if (this.cantPersonas >= 6 && this.cantPersonas < 8) {
        return (this.precioBase() * 10) / 100;
    } else if (this.cantPersonas >= 8) {
        return (this.precioBase() * 15 / 100)
    }
    return 0;
}

Reserva.prototype.descuentoPorCodigo = function () {
    if (this.descuento === "DES15") {
        return (this.precioBase() * 15) / 100;
    } else if (this.descuento === "DES200") {
        return 200;
    } else if (this.descuento === "DES1") {
        return this.precioPersona;
    }
    return 0;
}


Reserva.prototype.descuentoTotal = function () {
    return this.descuentoPorCodigo() + this.descuentoPorGrupo();
}

Reserva.prototype.adicionalPorHorario = function () {
    if (this.horario.getHours() > 13 && this.horario.getHours() < 14 || this.horario.getHours() > 21 && this.horario.getHours() < 22) {
        return (this.precioBase() * 5) / 100;
    }
    return 0;
}

Reserva.prototype.adicionalFinDeSemana = function () {
    if (this.horario.getDay() == 5 || this.horario.getDay() == 6 || this.horario.getDay() == 7) {
        return (this.precioBase() * 10) / 100;
    }
    return 0;
}

Reserva.prototype.adicionalesTotal = function () {
    return this.adicionalFinDeSemana() + this.adicionalPorHorario();
}

var listadoReservas = [
    new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1"),
    new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200")
];
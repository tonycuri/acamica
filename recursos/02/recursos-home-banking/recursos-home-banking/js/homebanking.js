//Declaración de variables
var nombreUsuario= "Tony Curi";
var saldoCuenta= 3000;
var limiteExtraccion = 1500;

//Variables Servicio
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;

//Variables transferencia
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;

//Variables sesion
var usuario = "curicaballero";
var pass = 1408;

//funciones sumar y restar saldo
function sumarSaldo(montoIngresado){
  saldoCuenta= saldoCuenta+montoIngresado;
  return saldoCuenta;
}

function restarSaldo(montoIngresado){
  saldoCuenta= saldoCuenta-montoIngresado;
  return saldoCuenta;
}

//validaciones de saldo y limite disponible
function saldoDisponible(monto){
  if(monto <= saldoCuenta){
    return true;
  }else{
    return false;
  }
}

function limiteDisponible(monto){
  if(monto <= limiteExtraccion){
    return true;
  }else{
    return false;
  }
}

//funcion de pago de servicio
function pagoDeServicio(servicio,montoServicio){
  if (montoServicio <= saldoCuenta) {
    var saldoAnterior = saldoCuenta;
    restarSaldo(montoServicio);
    actualizarSaldoEnPantalla();
    alert(
      "has pagado el servicio de: "+servicio +
      "\nEL saldo anterior era de " +saldoAnterior+
      "\nEl dinero descontado es: "+montoServicio+
      "\nEl saldo actual es de: " +saldoCuenta
    );
  }else{
    alert("No hay suficiente saldo en la cuenta para pagar este servicio");
  }
}

//Ejecución de las funciones que actualizan los valores de las variables en el HTML
cargarNombreEnPantalla();
actualizarSaldoEnPantalla();
actualizarLimiteEnPantalla();

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
  var nuevoLimite = parseInt(prompt("Ingrese el nuevo Limite de extraccion"));
  if (!nuevoLimite) {
    alert("Por favor ingresa un número");
  }else{
    limiteExtraccion = nuevoLimite;
    actualizarLimiteEnPantalla();
    alert("El nuevo limite de extraccion es: "+ nuevoLimite);
  }
}

function extraerDinero() {
  var montoAExtraer= parseInt(prompt("Ingrese el monto que desea extraer"));
  var saldoAnterior = saldoCuenta;
  if (!montoAExtraer) {
    alert("Por favor ingresa un número");
  }else{
    if (montoAExtraer %100 === 0) {
      if(saldoDisponible(montoAExtraer)){
        if (limiteDisponible(montoAExtraer)) {
          saldoCuenta = restarSaldo(montoAExtraer);
          actualizarSaldoEnPantalla();
          alert(
            "has extraido: "+montoAExtraer +
            "\nEL saldo anterior era de " +saldoAnterior +
            "\nEl saldo actual es de: " +saldoCuenta
          );
        }else{
          alert("La cantidad de dinero que deseas extraer es mayor a tu limite de extracción.");
          extraerDinero();
        }
      }else{
        alert("No hay saldo disponible en su cuenta para extraer esa cantidad de dinero");
        extraerDinero();
      }
    }else{
      alert("Solo puedes extraer billetes de 100");
      extraerDinero();
    }
  }
}

function depositarDinero() {
  var montoDepositado = parseInt(prompt("Ingrese el monto que desea depositar"));
  var saldoAnterior = saldoCuenta;
  if (!montoDepositado) {
    alert("Por favor ingrese un número");
  }else{
    saldoCuenta = sumarSaldo(montoDepositado);
    actualizarSaldoEnPantalla();
    alert(
      "has depositado: "+montoDepositado +
      "\nEL saldo anterior era de " +saldoAnterior +
      "\nEl saldo actual es de: " +saldoCuenta
    );
  }
}

function pagarServicio() {
  var opcionServicio = parseInt(prompt("Ingrese el número que corresponda con el servicio que desea pagar:"+
                                "\n1.- Agua."+
                                "\n2.-Luz."+
                                "\n3.-Internet."+
                                "\n4.-Teléfono."));
  switch (opcionServicio) {
    case 1:
        pagoDeServicio("Agua",agua);
      break;
    case 2:
        pagoDeServicio("Luz",luz);
      break;
    case 3:
        pagoDeServicio("Internet",internet);
      break;
    case 4:
        pagoDeServicio("Teléfono",telefono);
      break;
    default:
      alert("Por favor elija una de las opciones de la lista.");
  }
}

function transferirDinero() {
  var montoTransferencia = parseInt(prompt("Ingrese el monto que desea transferir"));
  if (!montoTransferencia) {
    alert("Por favor ingrese un número");
  }else{
    if (saldoDisponible(montoTransferencia)) {
      var cuentaTransferencia = parseInt(prompt("Ingrese el número de cuenta al que desea hacer la transferencia"));
      if (cuentaTransferencia === cuentaAmiga1 || cuentaTransferencia === cuentaAmiga2) {
        restarSaldo(montoTransferencia);
        actualizarSaldoEnPantalla();
        alert("Se han transferido: "+montoTransferencia +
              "\nCuenta destino: "+ cuentaTransferencia);
      }else{
        alert("Solo puedes transferir dinero a una cuenta amiga");
      }
    }else{
      alert("No hay saldo suficiente, no se puede transferir el monto seleccionado");
    }
  }
}

function iniciarSesion() {
  // var usuarioIngresado = prompt("Ingrese su usuario, recuerde que solo se permiten letras");
  // usuarioIngresado = usuarioIngresado.toLowerCase();
  var passIngresada = parseInt(prompt("Ingrese el codigo de seguridad de su cuenta, recuerde que se permiten solo números"));
  if (!passIngresada) {
    alert("Por favor ingrese un número");
    iniciarSesion();
  }else{
    if (passIngresada === pass) {
      alert("Bienvenido/a "+ nombreUsuario + " ya puedes comenzar a realizar operaciones");
    }else{
      alert("Código incorrecto, Tu dinero ha sido retenido por cuestiones de seguridad");
      saldoCuenta= 0;
      limiteExtraccion = 0;
      actualizarSaldoEnPantalla();
      actualizarLimiteEnPantalla();
      cargarNombreEnPantalla();
    }
  }
}

iniciarSesion();
//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

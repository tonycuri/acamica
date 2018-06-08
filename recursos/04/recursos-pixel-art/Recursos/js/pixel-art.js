//GUARDAMOS TODO EN JQUERY
$(document).ready(function () {
  /////////////////////////////////////////////////////////
  //////////////////// VARIABLES /////////////////////////
  /////////////////////////////////////////////////////////
  
  var nombreColores = ['White', 'LightYellow',
    'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
    'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
    'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
    'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
    'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
    'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
    'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
    'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
    'LightGreen', 'PaleGreen', 'PaleTurquoise',
    'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
    'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
    'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
    'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
    'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
    'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
    'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
    'BlueViolet', 'DarkViolet', 'DarkOrchid',
    'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
    'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
  ];

  // Variable para guardar el elemento 'color-personalizado'
  // Es decir, el que se elige con la rueda de color.
  var colorPersonalizado = document.getElementById('color-personalizado');

  //variable que representa la paleta de colores
  var paleta = document.getElementById('paleta');

  //variable que representa la grilla de pixeles
  var grilla = document.getElementById('grilla-pixeles');

  //variable indicador de color
  var indicadorColor = document.getElementById('indicador-de-color');

  //variable que indica si el mouse esta precionado o no
  var mousePrecionado;

  var instrucciones = [
    "Podrás seleccionar un super heroe para poder personalizarlo dando un 'CLICK' sobre él.",
    "En la parte derecha encontrarás una paleta de colores predeterminados.",
    "El boton 'BORRAR' sirve para borrar cuadro por cuadro.",
    "Con el boton 'BORRAR TODO' borraras todo el lienzo.",
    "Podrás crear tu propia obra de arte y guardarla dando click en el boton 'GUARGAR'.",
    "Que estás esperando, es hora de comenzar."
  ];

  /////////////////////////////////////////////////////////
  //////////////////// EVENTOS /////////////////////////
  /////////////////////////////////////////////////////////

  //capturamos el color de la paleta
  paleta.addEventListener('click',cambiarColor);

  //capturamos el color del indicador de color y pintamos la grilla
  grilla.addEventListener('click',cambiarColorGrilla);

  //capturamos el color de la rueda y lo agregamos a colorActual
  colorPersonalizado.addEventListener("change", function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual
    indicadorColor.style.backgroundColor = colorActual;
  });

  //capturamos el evento del mouse cuando este es presionado
  grilla.addEventListener('mousedown',function(){
    mousePrecionado = true;
  });

  //capturamos el evento del mouse cuando este es presionado y luego soltado
  grilla.addEventListener("mouseup", function() {
    mousePrecionado = false;
  });

  //capturamos el evento del mouse cuando este se mueve mientras esta presionado
  grilla.addEventListener('mousemove',pintarPresionado);

  /////////////////////////////////////////////////////////
  //////////////////// FUNCIONES /////////////////////////
  /////////////////////////////////////////////////////////

  //funcion que crea la paleta de colores
  function paletaColores(){
    var color;
    for (let i = 0; i < nombreColores.length; i++) {
      color = document.createElement("div");
      color.className = 'color-paleta';
      color.style.backgroundColor = nombreColores[i];
      paleta.appendChild(color);
    }
  }

  //funcion que crea la grilla donde trabajaremos con los colores
  function crearGrilla() {
    var div;
    for (let i = 0; i < 1749; i++) {
      div = document.createElement('div');
      grilla.appendChild(div);
    }
  }

  //funcion que cambia el color del indicador por el que seleccionamos en la Paleta de colores
  function cambiarColor(e){
    indicadorColor.style.backgroundColor = e.target.style.backgroundColor;
  }

  //funcion que cambia el color de la grilla
  function cambiarColorGrilla(e) {
    e.target.style.backgroundColor = indicadorColor.style.backgroundColor;
  }

  //funcion que pinta la grilla dependiendo si el mouse esta precionado o no
  function pintarPresionado(e){
    if (mousePrecionado === true) {
      cambiarColorGrilla(e);
    }
  }

  function mostrarInstrucciones(instrucciones) {
    for (let i = 0; i < instrucciones.length; i++) {
      mostrarInstruccionEnLista(instrucciones[i], 'lista-instrucciones');

    }
  }

  function mostrarInstruccionEnLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
  }

  /////////////////////////////////////////////////////////
  //////////////  LLAMADO DE FUNCIONES ////////////////////
  /////////////////////////////////////////////////////////
  paletaColores();
  crearGrilla();
  mostrarInstrucciones(instrucciones);

  /////////////////////////////////////////////////////////
  //////////////     USANDO JQUERY     ////////////////////
  /////////////////////////////////////////////////////////


  //guardamos todos los div de grilla pixeles en una variable jquery
  var $grillaPixeles = $("#grilla-pixeles div");

  //agregamos el evento click al boton borrar y modificamos el color de todas las grillas pintadas  
  $("#borrar-todo").click(function(){
    $grillaPixeles.animate({
      "background-color":"#FFF"
    },1200);
  });

  $("#borrar").click(function (e) {
    cambiarColor(e);
  });


  //AGREGAMOS LA CARGA DE SUPERHEROES MEDIANTE UN CLICK
  $("ul li img").click(function(){
    var $id = $(this).attr("id");
    switch ($id) {
      case "batman":
        cargarSuperheroe(batman);
        break;
      case "wonder":
        cargarSuperheroe(wonder);
        break;
      case "flash":
        cargarSuperheroe(flash);
        break;
      case "invisible":
        cargarSuperheroe(invisible);
        break;
    }
  });

  //agregamos el evento click al boton guardar 
  $("#guardar").click(function () {
    guardarPixelArt();
  });

  //funciones que llaman la ventana modal
  $("#instrucciones").click(function(){
    $("#mi-ventana").slideDown(1000);
  });

  $("#mi-ventana button").click(function(){
    $("#mi-ventana").slideUp(1000);
  });

});

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

//capturamos el evento del mouse cuando este es precionado
grilla.addEventListener('mousedown',function(){
  mousePrecionado = true;
  console.log(mousePrecionado);
});

//capturamos el evento del mouse cuando este es precionado y luego soltado
grilla.addEventListener("mouseup", function() {
  mousePrecionado = false;
  console.log(mousePrecionado);
});

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

/////////////////////////////////////////////////////////
//////////////  LLAMADO DE FUNCIONES ////////////////////
/////////////////////////////////////////////////////////
paletaColores();
crearGrilla();
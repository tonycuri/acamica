//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controladorPelicula = require('./controladores/controladorPeliculas.js');
var controladorGenero = require('./controladores/controladorGeneros.js');
var controladorRecomendacion = require('./controladores/controladorRecomendaciones.js');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/peliculas", controladorPelicula.buscarPeliculas);
app.get("/generos", controladorGenero.buscarGeneros);
app.get("/peliculas/recomendacion", controladorRecomendacion.recomendacion);
// app.get("/peliculas/:id", controller.obtenerPeliculaData);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});



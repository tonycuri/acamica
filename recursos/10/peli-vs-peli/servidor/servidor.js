//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var controlador = require('./controladores/controlador.js');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/competencias', controlador.buscarCompetencias);
app.post('/competencias', controlador.crearCompetencia);
app.get('/generos', controlador.cargarGeneros);
app.get('/directores', controlador.cargarDirectores);
app.get('/actores', controlador.cargarActores);

app.get('/competencias/:id', controlador.obtenerCompetencia);
app.get('/competencias/:id/peliculas', controlador.obtenerOpciones);
app.get('/competencias/:id/resultados', controlador.obtenerResultados);
app.post('/competencias/:id/voto', controlador.votar);
app.delete('/competencias/:id/votos', controlador.eliminarVotos);
app.delete('/competencias/:id', controlador.eliminarCompetencia);
app.put('/competencias/:id', controlador.editarCompetencia);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

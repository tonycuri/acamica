//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var CompetenciasController = require('./controladores/controlador.js');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


//IMPORTANTE
//primero deben ir todas las funciones que utilizan query params
app.get('/competencias', CompetenciasController.buscarCompetencias);
app.post('/competencias', CompetenciasController.crearCompetencia);
app.get('/generos', CompetenciasController.cargarGeneros);
app.get('/directores', CompetenciasController.cargarDirectores);
app.get('/actores', CompetenciasController.cargarActores);

//y luego las que utilizan path params
app.get('/competencias/:id', CompetenciasController.obtenerCompetencia);
app.get('/competencias/:id/peliculas', CompetenciasController.obtenerOpciones);
app.get('/competencias/:id/resultados', CompetenciasController.obtenerResultados);
app.post('/competencias/:id/voto', CompetenciasController.votar);
app.delete('/competencias/:id/votos', CompetenciasController.eliminarVotos);
app.delete('/competencias/:id', CompetenciasController.eliminarCompetencia);
app.put('/competencias/:id', CompetenciasController.editarCompetencia);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

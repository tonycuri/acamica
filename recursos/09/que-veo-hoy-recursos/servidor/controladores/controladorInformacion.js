var conexion = require('../lib/conexionbd');

function obtenerDatos(req, res) {

    var id = req.params.id;

    var sql = "select P.poster, " +
        "P.titulo, " +
        "P.anio, " +
        "P.trama, " +
        "P.fecha_lanzamiento, " +
        "P.director, " +
        "P.duracion, " +
        "P.puntuacion, " +
        "G.nombre as genero, " +
        "A.nombre as Actores  " +
        "from pelicula as P " +
        "left join genero as G on P.genero_id = G.id " +
        "left join actor_pelicula as AP on P.id = AP.pelicula_id " +
        "left join actor as A on AP.actor_id = A.id " +
        "where P.id = " + id;

    conexion.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length == 0) {
            console.log("No se encontro ningún nombre con ese id");
            return res.status(404).send("No se encontro ningún nombre con ese id");
        } else {

            var arrayPelicula = {
                poster: resultado[0].poster,
                titulo: resultado[0].titulo,
                anio: resultado[0].anio,
                trama: resultado[0].trama,
                fecha_lanzamiento: resultado[0].fecha_lanzamiento,
                director: resultado[0].director,
                duracion: resultado[0].duracion,
                puntuacion: resultado[0].puntuacion
            };

            var response = {
                'pelicula': arrayPelicula,
                'actores': resultado.map(function (s) {
                    return {
                        nombre: s.Actores
                    };
                }),
                'genero': resultado[0].genero
            };

            res.send(JSON.stringify(response));
        }
    });
}

module.exports = {
    obtenerDatos: obtenerDatos
};
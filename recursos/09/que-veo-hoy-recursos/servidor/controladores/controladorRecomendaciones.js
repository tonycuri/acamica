var conexion = require('../lib/conexionbd');

function recomendacion(req, res) {

    var anio_inicio = req.query.anio_inicio;
    var anio_fin = req.query.anio_fin;
    var puntuacion = req.query.puntuacion;
    var genero = req.query.genero;

    var sql = "select P.id," +
              "P.poster, " +
              "P.trama, " +
              "P.titulo, " +
              "G.nombre " +
              "from pelicula as P " +
              "left join genero as G on P.genero_id = G.id ";

    var where = "";

    if ((anio_inicio) || (anio_fin) || (puntuacion) || (genero)) {
        where = " WHERE ";
        if (anio_inicio) {where = where + " P.anio >= " + anio_inicio + " AND";}
        if (anio_fin)    {where = where + " P.anio <= " + anio_fin + " AND";}
        if (puntuacion)  {where = where + " P.puntuacion = " + puntuacion + " AND";}
        if (genero)      {where = where + " G.nombre = '" + genero + "' AND";}
        where = where.substr(0, where.length - 3)
    }

    sql = sql + where;

    conexion.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        var response = {
            'peliculas': resultado
        };

        res.send(JSON.stringify(response));
    });

}

module.exports = {
  recomendacion: recomendacion
};
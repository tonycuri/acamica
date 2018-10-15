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

    var sqlWhere = "";

    //agregar palabra where si se informa algun criterio
    if ((anio_inicio) || (anio_fin) || (puntuacion) || (genero)) {

        sqlWhere = " where ";

        //genero el where segun esten informados los criterios
        if (anio_inicio) {sqlWhere = sqlWhere + " P.anio >= " + anio_inicio + " and";}
        if (anio_fin)    {sqlWhere = sqlWhere + " P.anio <= " + anio_fin + " and";}
        if (puntuacion)  {sqlWhere = sqlWhere + " P.puntuacion = " + puntuacion + " and";}
        if (genero)      {sqlWhere = sqlWhere + " G.nombre = '" + genero + "' and";}

        //eliminar and final del where
        sqlWhere = sqlWhere.substr(0, sqlWhere.length - 3)
    }

    sql = sql + sqlWhere;

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
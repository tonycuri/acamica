var conexion = require('../lib/conexionbd')



function buscarPeliculas(req, res) {

    var queryParams = ''
    if (req.query.genero) {
        queryParams = " AND genero_id = " + req.query.genero;
    }
    if (req.query.titulo) {
        queryParams = "AND titulo LIKE '%" + req.query.titulo + "%'";
    }
    if (req.query.anio) {
        queryParams = "AND anio =" + req.query.anio
    }
    if (req.query.columna_orden) {
        queryParams += " ORDER BY " + req.query.columna_orden + " ";
    }

    if (req.query.tipo_orden) {
        queryParams += req.query.tipo_orden;
    }

    if (req.query.cantidad) {
        var cant = req.query.cantidad;
    } else {
        var cant = 52;
    }

    if (req.query.pagina) {
        var comienzo = (req.query.pagina - 1) * cant;
    } else {
        var comienzo = 0;
    }

    var querysql = "SELECT * FROM pelicula WHERE 1 = 1 " + queryParams + " LIMIT " + comienzo + "," + cant + ";";

    conexion.query(querysql, function (error, resultado) {
        if (error) {
            console.log('ERROR', error.message);
            return res.status(500).send(error);
        }

        var sql2 = "SELECT COUNT(*) AS total FROM pelicula WHERE 1=1 " + queryParams;
        conexion.query(sql2, function (error, total, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }

            var response = {
                'total': total[0].total
            };

            response.peliculas = resultado;

            res.send(JSON.stringify(response));
        });
    });

}

module.exports = {
    buscarPeliculas : buscarPeliculas
}
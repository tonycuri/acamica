var con = require('../lib/conexionbd');

var controlador = {

    buscarCompetencias: function(req, res) {

        var sql = "select * from competencias";

        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }
            var response = {
                'competencias': resultado
            };

            res.send(JSON.stringify(response));
        });
    },

    obtenerOpciones: function(req, res) {

        var idCompetencia = req.params.id;

        var sql = "Select * " +
            "From competencias " +
            "where id = " + idCompetencia;

        con.query(sql, function (error, resultadoComp, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }
            if (resultadoComp.length == 0) {
                console.log("nro de competencia no encontrado: " + idCompetencia);
                return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
            }

            var genero_id = resultadoComp[0].genero_id
            var director_id = resultadoComp[0].director_id
            var actor_id = resultadoComp[0].actor_id

            sql = "Select P.id, " +
                "P.poster, " +
                "P.titulo " +
                "From pelicula as P ";

            var sqlJoin = "";

            if ((genero_id) || (director_id) || (actor_id)) {

                if (genero_id) {
                    sqlJoin = sqlJoin + " left join genero as G on (P.genero_id = G.id) ";
                }
                if (director_id) {
                    sqlJoin = sqlJoin + " left join director_pelicula as DP on (P.id = DP.pelicula_id) ";
                }
                if (actor_id) {
                    sqlJoin = sqlJoin + " left join actor_pelicula as AP on (P.id = AP.pelicula_id) ";
                }

            }

            var where = "";

            if ((genero_id) || (director_id) || (actor_id)) {

                where = " where ";

                if (genero_id) {
                    where = where + " G.id = " + genero_id + " and";
                }
                if (director_id) {
                    where = where + " DP.director_id = " + director_id + " and";
                }
                if (actor_id) {
                    where = where + " AP.actor_id = " + actor_id + " and";
                }

                where = where.substr(0, where.length - 3)
            }

            sql = sql + sqlJoin + where + "Order by rand() limit 2 "

            con.query(sql, function (error, resultadoRamdom, fields) {
                if (error) {
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(500).send("Hubo un error en la consulta");
                }

                var response = {
                    'competencia': resultadoComp[0].nombre,
                    'peliculas': resultadoRamdom
                };

                res.send(JSON.stringify(response));
            });
        });
    },

    votar: function(req, res) {

        var idPelicula = req.body.idPelicula
        var idCompetencia = req.params.id;
        var sql = "Select nombre " +
            "From competencias " +
            "where id = " + idCompetencia;

        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }

            if (resultado.length == 0) {
                console.log("nro de competencia no encontrado: " + idCompetencia);
                return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
            }

            var sql = "Select titulo " +
                "From pelicula " +
                "where id = " + idPelicula;

            con.query(sql, function (error, resultado, fields) {
                if (error) {
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(500).send("Hubo un error en la consulta");
                }

                if (resultado.length == 0) {
                    console.log("nro de pelicula no encontrado: " + idPelicula);
                    return res.status(404).send("nro de pelicula no encontrado: " + idPelicula);
                }

                var sql = "insert into votos " +
                    "(idPelicula, idCompetencia) " +
                    "values " +
                    "(" + idPelicula + "," + idCompetencia + ") ";

                con.query(sql, function (error, resultado, fields) {
                    if (error) {
                        console.log("Hubo un error en la consulta", error.message);
                        return res.status(500).send("Hubo un error en la consulta");
                    }
                    var response = {
                        'nuevoId': resultado.insertId
                    };

                    res.send(JSON.stringify(response));
                });
            });
        });
    },

    obtenerResultados: function(req, res) {
        var idCompetencia = req.params.id;

        var sql = "Select nombre " +
            "From competencias " +
            "where id = " + idCompetencia;

        con.query(sql, function (error, resultadoComp, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }

            if (resultadoComp.length == 0) {
                console.log("nro de competencia no encontrado: " + idCompetencia);
                return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
            }

            sql = "select V.idPelicula as pelicula_id, " +
                "P.poster, " +
                "P.titulo, " +
                "count(*) as votos " +
                "from votos as V " +
                "left join pelicula as P on (V.idPelicula = P.id) " +
                "where V.idCompetencia = " + idCompetencia + " " +
                "group by V.idPelicula, V.idCompetencia " +
                "order by count(*) desc " +
                "limit 3";

            con.query(sql, function (error, resultado, fields) {
                if (error) {
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(500).send("Hubo un error en la consulta");
                }

                var response = {
                    'competencia': resultadoComp[0].nombre,
                    'resultados': resultado
                };

                res.send(JSON.stringify(response));
            });
        });
    },

    cargarGeneros: function(req, res) {

        var sql = "select * from genero";

        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            res.send(JSON.stringify(resultado));
        });
    },

    cargarDirectores: function(req, res) {

        var sql = "select * from director";

        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            res.send(JSON.stringify(resultado));
        });
    },

    cargarActores: function(req, res) {

        var sql = "select * from actor";

        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            res.send(JSON.stringify(resultado));
        });
    },

    crearCompetencia: function(req, res) {

        var nombreCompetencia = req.body.nombre
        var genero_id = (req.body.genero == '0') ? null : req.body.genero
        var director_id = (req.body.director == '0') ? null : req.body.director
        var actor_id = (req.body.actor == '0') ? null : req.body.actor


        var sql = "Select nombre " +
            "From competencias " +
            "where nombre = '" + nombreCompetencia + "'";

        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }

            if (resultado.length != 0) {
                console.log("ya existe una competencia con ese nombre: " + nombreCompetencia);
                return res.status(422).send("ya existe una competencia con ese nombre: " + nombreCompetencia);
            }

            sql = 'Select count(*) as Cant ' +
                'From pelicula as P ' +
                'left join director_pelicula as DP on (P.id = DP.pelicula_id) ' +
                'left join actor_pelicula as AP on (P.id = AP.pelicula_id) ';

            var where = "";


            if ((genero_id) || (director_id) || (actor_id)) {

                where = " where ";

                if (genero_id) {
                    where = where + " P.genero_id = " + genero_id + " and";
                }
                if (director_id) {
                    where = where + " DP.director_id = " + director_id + " and";
                }
                if (actor_id) {
                    where = where + " AP.actor_id = " + actor_id + " and";
                }

                where = where.substr(0, where.length - 3)
            }

            sql = sql + where

            con.query(sql, function (error, resultado, fields) {
                if (error) {
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(500).send("Hubo un error en la consulta");
                }

                if (resultado[0].Cant < 2) {
                    console.log("Imposible crear la competencia. \n  No exiten al menos 2 peliculas que cumplan los criterios");
                    return res.status(422).send("Imposible crear la competencia. \n  No exiten al menos 2 peliculas que cumplan los criterios");
                }

                var sql = "insert into competencias " +
                    "(nombre, genero_id, director_id, actor_id) " +
                    "values " +
                    "('" + nombreCompetencia + "'," +
                    genero_id + "," +
                    director_id + "," +
                    actor_id + ")";

                con.query(sql, function (error, resultado, fields) {
                    if (error) {
                        console.log("Hubo un error en la consulta", error.message);
                        return res.status(500).send("Hubo un error en la consulta");
                    }
                    var response = {
                        'nuevoId': resultado.insertId
                    };

                    res.send(JSON.stringify(response));
                });
            });
        });
    },

    eliminarVotos: function(req, res) {

        var idCompetencia = req.params.id;

        var sql = "Select nombre " +
            "From competencias " +
            "where id = " + idCompetencia;

        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }
            //validacion de consulta vacia
            if (resultado.length == 0) {
                console.log("nro de competencia no encontrado: " + idCompetencia);
                return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
            }

            var sql = "delete from votos " +
                "where idCompetencia = " + idCompetencia;

            con.query(sql, function (error, resultado, fields) {
                if (error) {
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(500).send("Hubo un error en la consulta");
                }
                var response = {
                    'filasAfectadas': resultado.affectedRows
                };

                res.send(JSON.stringify(response));
            });
        });
    },

    obtenerCompetencia: function(req, res) {

        var idCompetencia = req.params.id;

        var sql = "select C.nombre, " +
            "G.nombre as genero_nombre, " +
            "D.nombre as director_nombre, " +
            "A.nombre as actor_nombre " +
            "From competencias as C " +
            "Left Join genero as G on (C.genero_id = G.id) " +
            "Left Join director as D on (C.director_id = D.id) " +
            "Left Join actor as A on (C.actor_id = A.id) " +
            "where C.id = " + idCompetencia;

        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }

            if (resultado.length == 0) {
                console.log("nro de competencia no encontrado: " + idCompetencia);
                return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
            }

            var response = {
                'nombre': resultado[0].nombre,
                'genero_nombre': resultado[0].genero_nombre,
                'actor_nombre': resultado[0].actor_nombre,
                'director_nombre': resultado[0].director_nombre
            };

            res.send(JSON.stringify(response));
        });
    },

    eliminarCompetencia: function(req, res) {

        var idCompetencia = req.params.id;

        var sql = "Select nombre " +
            "From competencias " +
            "where id = " + idCompetencia;

        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }

            if (resultado.length == 0) {
                console.log("nro de competencia no encontrado: " + idCompetencia);
                return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
            }

            var sql = "delete from votos " +
                "where idCompetencia = " + idCompetencia;

            con.query(sql, function (error, resultado, fields) {
                if (error) {
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(500).send("Hubo un error en la consulta");
                }

                var sql = "delete from competencias " +
                    "where id = " + idCompetencia;

                con.query(sql, function (error, resultado, fields) {
                    if (error) {
                        console.log("Hubo un error en la consulta", error.message);
                        return res.status(500).send("Hubo un error en la consulta");
                    }

                    var response = {
                        'filasAfectadas': resultado.affectedRows
                    };

                    res.send(JSON.stringify(response));
                });
            });
        });
    },

    editarCompetencia: function(req, res) {

        var idCompetencia = req.params.id;
        var nombreNuevo = req.body.nombre;

        var sql = "Select nombre " +
            "From competencias " +
            "where id = " + idCompetencia;

        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }
    
            if (resultado.length == 0) {
                console.log("nro de competencia no encontrado: " + idCompetencia);
                return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
            }


            var sql = "update competencias  " +
                "set nombre = '" + nombreNuevo + "' " +
                "where id = " + idCompetencia;

            con.query(sql, function (error, resultado, fields) {
                if (error) {
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(500).send("Hubo un error en la consulta");
                }

                var response = {
                    'filasAfectadas': resultado.affectedRows
                };

                res.send(JSON.stringify(response));
            });
        });
    },
}
module.exports = controlador;
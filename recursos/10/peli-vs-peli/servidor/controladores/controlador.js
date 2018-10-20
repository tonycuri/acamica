var con = require('../lib/conexionbd');

function buscarCompetencias(req, res) {

    var sql = "select * from competencias";

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }
        var response = {
            'competencias': resultado
        };

        res.send(JSON.stringify(response));
    });
}

function obtenerOpciones(req, res) {

    //------------------------------------------------
    // recupero el nombre de la competencia
    //------------------------------------------------
    var idCompetencia = req.params.id;

    var sql = "Select * " +
              "From competencias " +
              "where id = " + idCompetencia;

    con.query(sql, function(error, resultadoComp, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }
        //validacion de consulta vacia
        if (resultadoComp.length == 0) {
            console.log("nro de competencia no encontrado: " + idCompetencia);
            return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
        }

        var genero_id = resultadoComp[0].genero_id
        var director_id = resultadoComp[0].director_id
        var actor_id = resultadoComp[0].actor_id

        //--------------------------------------------------------------------------
        // recupero 2 peliculas aleatorias
        //--------------------------------------------------------------------------
        sql = "Select P.id, " +
              "P.poster, " +
              "P.titulo " +
              "From pelicula as P ";

          var sqlJoin = "";

          //agregar los join segun corresponda
          if ((genero_id) || (director_id) || (actor_id)) {

              //genero los joins segun esten informados los criterios
              if (genero_id)   {sqlJoin = sqlJoin + " left join genero as G on (P.genero_id = G.id) ";}
              if (director_id) {sqlJoin = sqlJoin + " left join director_pelicula as DP on (P.id = DP.pelicula_id) ";}
              if (actor_id)    {sqlJoin = sqlJoin + " left join actor_pelicula as AP on (P.id = AP.pelicula_id) ";}

          }

          var sqlWhere = "";

          //agregar palabra where si se informa algun criterio
          if ((genero_id) || (director_id) || (actor_id)) {

              sqlWhere = " where ";

              //genero el where segun esten informados los criterios
              if (genero_id)   {sqlWhere = sqlWhere + " G.id = " + genero_id + " and";}
              if (director_id) {sqlWhere = sqlWhere + " DP.director_id = " + director_id + " and";}
              if (actor_id)    {sqlWhere = sqlWhere + " AP.actor_id = " + actor_id + " and";}

              //eliminar and final del where
              sqlWhere = sqlWhere.substr(0, sqlWhere.length - 3)
          }

          //agrego el order by y el limit 2
          sql = sql + sqlJoin + sqlWhere + "Order by rand() limit 2 "

        con.query(sql, function(error, resultadoRamdom, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }

            var response = {'competencia': resultadoComp[0].nombre,
                            'peliculas': resultadoRamdom};

            res.send(JSON.stringify(response));
        });
    });
}

function votar(req, res) {

    var idPelicula = req.body.idPelicula
    var idCompetencia = req.params.id;

    //valido que exista la competencia
    var sql = "Select nombre " +
              "From competencias " +
              "where id = " + idCompetencia;

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }
        //validacion de consulta vacia
        if (resultado.length == 0) {
            console.log("nro de competencia no encontrado: " + idCompetencia);
            return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
        }

        //valido que exista la pelicula
        var sql = "Select titulo " +
                  "From pelicula " +
                  "where id = " + idPelicula;

        con.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }
            //validacion de consulta vacia
            if (resultado.length == 0) {
                console.log("nro de pelicula no encontrado: " + idPelicula);
                return res.status(404).send("nro de pelicula no encontrado: " + idPelicula);
            }

            //insertar el voto
            var sql = "insert into votos " +
                      "(idPelicula, idCompetencia) " +
                      "values " +
                      "(" + idPelicula + "," + idCompetencia + ") ";

            con.query(sql, function(error, resultado, fields) {
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
}

function obtenerResultados(req, res) {

    //------------------------------------------------
    // recupero el nombre de la competencia
    //------------------------------------------------
    var idCompetencia = req.params.id;

    var sql = "Select nombre " +
              "From competencias " +
              "where id = " + idCompetencia;

    con.query(sql, function(error, resultadoComp, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }
        //validacion de consulta vacia
        if (resultadoComp.length == 0) {
            console.log("nro de competencia no encontrado: " + idCompetencia);
            return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
        }

        //--------------------------------------------------------------------
        // recupero las 3 peliculas mas votadas de una competencia
        //--------------------------------------------------------------------
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

        con.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }

            var response = {'competencia': resultadoComp[0].nombre,
                            'resultados': resultado};

            res.send(JSON.stringify(response));
        });
    });
}

function cargarGeneros(req, res) {

    var sql = "select * from genero";

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        res.send(JSON.stringify(resultado));
    });
}

function cargarDirectores(req, res) {

    var sql = "select * from director";

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        res.send(JSON.stringify(resultado));
    });
}

function cargarActores(req, res) {

    var sql = "select * from actor";

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        res.send(JSON.stringify(resultado));
    });
}

function crearCompetencia(req, res) {

    var nombreCompetencia = req.body.nombre
    var genero_id = (req.body.genero == '0') ? null : req.body.genero
    var director_id = (req.body.director == '0') ? null : req.body.director
    var actor_id = (req.body.actor == '0') ? null : req.body.actor

    //valido que NO exista la competencia
    var sql = "Select nombre " +
              "From competencias " +
              "where nombre = '" + nombreCompetencia + "'" ;

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }
        //validacion si existe esa competencia
        if (resultado.length != 0) {
            console.log("ya existe una competencia con ese nombre: " + nombreCompetencia);
            return res.status(422).send("ya existe una competencia con ese nombre: " + nombreCompetencia);
        }

        //validacion si existen al menos 2 pelis para crear una competencia
        //segun los criterios que se informen

        sql = 'Select count(*) as Cant ' +
              'From pelicula as P ' +
              'left join director_pelicula as DP on (P.id = DP.pelicula_id) ' +
              'left join actor_pelicula as AP on (P.id = AP.pelicula_id) ';

        var sqlWhere = "";

        //agregar palabra where si se informa algun criterio
        if ((genero_id) || (director_id) || (actor_id)) {

            sqlWhere = " where ";

            //genero el where segun esten informados los criterios
            if (genero_id)   {sqlWhere = sqlWhere + " P.genero_id = " + genero_id + " and";}
            if (director_id) {sqlWhere = sqlWhere + " DP.director_id = " + director_id + " and";}
            if (actor_id)    {sqlWhere = sqlWhere + " AP.actor_id = " + actor_id + " and";}

            //eliminar and final del where
            sqlWhere = sqlWhere.substr(0, sqlWhere.length - 3)
        }

        sql = sql + sqlWhere

        con.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }

            //validacion si existen 2 pelis minimo
            if (resultado[0].Cant < 2) {
                console.log("Imposible crear la competencia. \n  No exiten al menos 2 peliculas que cumplan los criterios" );
                return res.status(422).send("Imposible crear la competencia. \n  No exiten al menos 2 peliculas que cumplan los criterios" );
            }

            //insertar la competencia
            var sql = "insert into competencias " +
                      "(nombre, genero_id, director_id, actor_id) " +
                      "values " +
                      "('" + nombreCompetencia + "'," +
                      genero_id + "," +
                      director_id + "," +
                      actor_id + ")";

            con.query(sql, function(error, resultado, fields) {
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
}

function eliminarVotos(req, res) {

    var idCompetencia = req.params.id;

    //valido que exista la competencia
    var sql = "Select nombre " +
              "From competencias " +
              "where id = " + idCompetencia;

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }
        //validacion de consulta vacia
        if (resultado.length == 0) {
            console.log("nro de competencia no encontrado: " + idCompetencia);
            return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
        }

        //eliminar los votos
        var sql = "delete from votos " +
                  "where idCompetencia = " + idCompetencia;

        con.query(sql, function(error, resultado, fields) {
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
}

function obtenerCompetencia(req, res) {

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

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }

        //validacion de consulta vacia
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
}

function eliminarCompetencia(req, res) {

    var idCompetencia = req.params.id;

    //valido que exista la competencia
    var sql = "Select nombre " +
              "From competencias " +
              "where id = " + idCompetencia;

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }
        //validacion de consulta vacia
        if (resultado.length == 0) {
            console.log("nro de competencia no encontrado: " + idCompetencia);
            return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
        }

        //eliminar los votos
        var sql = "delete from votos " +
                  "where idCompetencia = " + idCompetencia;

        con.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }

            //eliminar la competencia
            var sql = "delete from competencias " +
                      "where id = " + idCompetencia;

            con.query(sql, function(error, resultado, fields) {
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
}

function editarCompetencia(req, res) {

    var idCompetencia = req.params.id;
    var nombreNuevo = req.body.nombre;

    //valido que exista la competencia
    var sql = "Select nombre " +
              "From competencias " +
              "where id = " + idCompetencia;

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }
        //validacion de consulta vacia
        if (resultado.length == 0) {
            console.log("nro de competencia no encontrado: " + idCompetencia);
            return res.status(404).send("nro de competencia no encontrado: " + idCompetencia);
        }

        //editar la competencia
        var sql = "update competencias  " +
                  "set nombre = '" +  nombreNuevo + "' "  +
                  "where id = " + idCompetencia;

        con.query(sql, function(error, resultado, fields) {
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
}

module.exports = {
  buscarCompetencias: buscarCompetencias,
  obtenerOpciones: obtenerOpciones,
  votar: votar,
  obtenerResultados: obtenerResultados,
  crearCompetencia: crearCompetencia,
  cargarGeneros: cargarGeneros,
  cargarDirectores: cargarDirectores,
  cargarActores: cargarActores,
  eliminarVotos: eliminarVotos,
  obtenerCompetencia: obtenerCompetencia,
  eliminarCompetencia: eliminarCompetencia,
  editarCompetencia: editarCompetencia
};

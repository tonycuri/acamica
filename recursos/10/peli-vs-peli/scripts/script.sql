
CREATE TABLE competencias (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (id)
);

LOCK TABLES competencias WRITE;
INSERT INTO competencias VALUES
(1,'¿Cuál es la mejor película?'),
(2,'¿Qué drama te hizo llorar más?'),
(3,'¿Cuál es la peli más bizarra?');
UNLOCK TABLES;


CREATE TABLE votos (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  idPelicula int(11) unsigned NOT NULL,
  idCompetencia int(11) unsigned NOT NULL,
  fechaHora datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);


/*  Agregar la fk de la columna idPelicula en tabla votos  */
ALTER TABLE votos
ADD FOREIGN KEY (idPelicula)
REFERENCES pelicula(id);

/*  Agregar la fk de la columna idCompetencia en tabla votos  */
ALTER TABLE votos
ADD FOREIGN KEY (idCompetencia)
REFERENCES competencias(id);

/*  Agregar la columna genero_id en tabla competencias  */
ALTER TABLE competencias
ADD COLUMN genero_id INT unsigned;

/*  Agregar la fk de la columna genero_id en tabla competencias  */
ALTER TABLE competencias
ADD FOREIGN KEY (genero_id)
REFERENCES genero(id);

/*  Agregar la columna director_id en tabla competencias  */
ALTER TABLE competencias
ADD COLUMN director_id INT unsigned;

/*  Agregar la fk de la columna director_id en tabla competencias  */
ALTER TABLE competencias
ADD FOREIGN KEY (director_id)
REFERENCES director(id);


/*  Agregar la columna actor_id en tabla competencias  */
ALTER TABLE competencias
ADD COLUMN actor_id INT unsigned;

/*  Agregar la fk de la columna actor_id en tabla competencias  */
ALTER TABLE competencias
ADD FOREIGN KEY (actor_id)
REFERENCES actor(id);

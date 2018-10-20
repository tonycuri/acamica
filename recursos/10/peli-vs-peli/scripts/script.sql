CREATE TABLE competencias (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (id)
);

INSERT INTO competencias VALUES (1,'¿Cuál es la mejor película de terror?');
INSERT INTO competencias VALUES (2,'¿Qué comedia te gusto mas?');
INSERT INTO competencias VALUES (3,'¿CQué pelicula tiene mas premios Oscar?');


CREATE TABLE votos (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  idPelicula int(11) unsigned NOT NULL,
  idCompetencia int(11) unsigned NOT NULL,
  fechaHora datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

ALTER TABLE votos ADD FOREIGN KEY (idPelicula) REFERENCES pelicula(id);
ALTER TABLE votos ADD FOREIGN KEY (idCompetencia) REFERENCES competencias(id);
ALTER TABLE competencias ADD COLUMN genero_id INT unsigned;
ALTER TABLE competencias ADD FOREIGN KEY (genero_id) REFERENCES genero(id);
ALTER TABLE competencias ADD COLUMN director_id INT unsigned;
ALTER TABLE competencias ADD FOREIGN KEY (director_id) REFERENCES director(id);
ALTER TABLE competencias ADD COLUMN actor_id INT unsigned;
ALTER TABLE competencias ADD FOREIGN KEY (actor_id) REFERENCES actor(id);
CREATE TABLE pelicula (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(100),
    duracion INT(5),
    director VARCHAR(400),
    anio INT(5),
    fecha_lanzamiento DATE,
    puntuacion INT(2),
    poster VARCHAR(300),
    trama VARCHAR(700),
    PRIMARY KEY (id)
);

/*Creamos la tabla genero*/
CREATE TABLE genero(
    id int NOT NULL auto_increment,
    nombre varchar(30) NOT NULL,
 	PRIMARY KEY (id)
);

/*creamos la tabla actor*/
CREATE TABLE actor(
 	id int NOT NULL auto_increment,
 	nombre varchar(70) NOT NULL,
 	PRIMARY KEY (id)
);

CREATE TABLE actor_pelicula(
 	id int NOT NULL auto_increment,
    actor_id int NOT NULL,
    pelicula_id int NOT NULL,
 	PRIMARY KEY (id)
);

ALTER TABLE pelicula ADD COLUMN genero_id int;
ALTER TABLE pelicula ADD FOREIGN KEY (genero_id) REFERENCES genero(id);
ALTER TABLE actor_pelicula ADD FOREIGN KEY (actor_id) REFERENCES actor(id);
ALTER TABLE actor_pelicula ADD FOREIGN KEY (pelicula_id) REFERENCES pelicula(id);

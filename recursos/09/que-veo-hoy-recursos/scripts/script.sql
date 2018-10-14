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

ALTER TABLE pelicula ADD COLUMN genero_id int;
ALTER TABLE pelicula ADD FOREIGN KEY (genero_id) REFERENCES genero(id);

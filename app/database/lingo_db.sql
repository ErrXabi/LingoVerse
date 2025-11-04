DROP DATABASE IF EXISTS lingo_db;
CREATE DATABASE lingo_db;
USE lingo_db;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(255),
    intentos INT,
    puntuacion INT,
    mejor_tiempo INT
);
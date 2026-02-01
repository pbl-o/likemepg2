-- Active: 1769730037726@@127.0.0.1@5432@likeme
CREATE DATABASE likeme;

-- Acceso a la base de datos en la terminal psql:
--\c likeme

-- Antes de crear la tabla, para borrar otra con el mismo nombre.
DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(25),
    img VARCHAR(1000),
    descripcion VARCHAR(255),
    likes INT
)

-- Para vigilar la tabla sin levantar capa cliente temporalmente.
SELECT * FROM posts;
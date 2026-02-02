# Like Me (parte 2)

Aplicación Fullstack diseñada para creación de posts.

## Tecnologías Empleadas

- Node.js, express.js, SQL, React

## Instalación y uso.

Instrucciones des instalación y configuración del proyecto:

1. Clonar repositorio:

```bash
git clone https://github.com/pbl-o/apprepertorio.git
```

\*Pasos 2 y 5 aplican tanto a la capa cliente como a la capa de negocios (servidor)

2. Instalar dependencias:

```bash
npm install
```

3. Crear la base de datos en el servidor local usando el archivo
   'schema.sql' o copiándola directamente de aquí:

```bash

CREATE DATABASE likeme;

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    Id SERIAL PRIMARY KEY,
    titulo VARCHAR(25),
    img VARCHAR(1000),
    descripcion VARCHAR(255),
    likes INT
);

```

\* Es importante crear la base de datos, de lo contrario la aplicación no funcionará correctamente.

4. Para un correcto funcionamiento, también será necesario colocar las propias credenciales para acceder a pqsl en variables ambientales (.env) de la forma indicada en el archivo 'env.example'.

5. Para Levantar el servidor:

```bash
npm run dev
```

Para ingresar datos en el formulario e ingresarlos al apretar el botón agregar o al ingresarlos por medio de un api tester.

dependiendo de la ruta, se pueden alterar uno más datos:
/posts/single/:id  (solo un campo por ejecución)
/posts/multi/:id (varios vía query -> (req.query))
/posts/todos/:id (varios vía body -> (req.body))

datos a ingresar vía api tester:
{
- titulo: (texto)
- img: (url de imagen)
- descripcion: (texto)
- likes: (numero)
}

\* Puedes encontrar url de imágenes de dominio público en [Unsplash](https://unsplash.com/). Copia el link y pégalo en el formulario.

\*Esta aplicación tiene algunos métodos que solo están implementados en el backend. La interfaz será modificada para conseguir incorporarlos a la brevedad.

Una vez levantado el servidor, para visualizar la información del serivdor en el browser, ingresar a:

http://localhost:3000 ó http://localhost:3000/posts

Pablo E. Díaz. A.

# Página web de noticias y blogs sobre cohetes espaciales y reportes de la ISS - ROCKETNEWS

Este proyecto es una página web desarrollada en Angular que proporciona noticias y blogs relacionados con cohetes espaciales, así como reportes de la Estación Espacial Internacional (ISS). También cuenta con un foro donde los usuarios pueden interactuar y discutir sobre temas relacionados con el espacio.

## Integrantes

- Javier Biselli
- Santiago Bártoli

## Año de cursado

2023, Syloper

## Instrucciones para correr el proyecto

Para ejecutar el proyecto:

1. En la terminal, ubicado en la carpeta del proyecto, ejecutar el siguiente comando para instalar las dependencias:

```
npm install
```

2. Una vez finalizada la instalación de las dependencias, se puede iniciar el servidor de desarrollo con el siguiente comando:

```
npm run start:open
```

3. Si no se inicia automaticamente, se puede acceder introduciendo la siguiente URL en el navegador

```
http://localhost:4200/
```

## Datos adicionales

- La página web es completamente responsive, lo que significa que se adapta y se ve correctamente en diferentes dispositivos y tamaños de pantalla.

- Para acceder a las funcionalidades principales del foro, los usuarios deben registrarse e iniciar sesión. Una vez que están logueados, pueden participar en discusiones, agregar comentarios y publicar nuevos temas.

- Para acceder a funcionalidades extras del foro como la posibilidad de destacar comentarios o posts, ademas de ocultar automaticamente la publicidad, se puede optar por dos opciones:

  1. Realizar una "inscripción paga" a través de la publicidad disponible en el home o en los posts.
  2. Acceder con un usuario premium pre-cargado:
     - Email: "tveque0@myspace.com"
     - Password: "pass123"

- Las puntuaciones de los comentarios cambian cada vez que vez que se accede a un post porque estas son generadas aleatoriamente y toman un valor entre -10 y 10

- Es importante tener en cuenta que los datos del foro, como los comentarios o publicaciones agregadas, solo subsisten durante la sesión actual. Esto significa que al actualizar la página o cerrarla, los datos del foro se perderán, ya que no se ha implementado una base de datos para almacenarlos de manera permanente.

- Las imagenes de las noticias y/o blogs que vienen de la api suelen ser de muy alta resolucion, lo que disminuye el rendimiento de la pagina y aumenta los tiempos de carga de las imagenes, no se pudo encontrar una manera de solucionar este problema desde del frontend, la solucion parcial fue mostrar menos noticias/blogs por request.

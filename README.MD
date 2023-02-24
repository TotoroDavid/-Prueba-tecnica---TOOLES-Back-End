# Prueba tecnica - TOOLES Back-End

Este proyecto consiste en desarrollar una API REST que permita realizar el registro de información de personas, enviar un código de confirmación al correo electrónico de la persona registrada y notificar a una persona institucional seleccionada. Además, se podrá consultar la información de las personas registradas en un rango de fechas, pero solo con la validación de un token de acceso. La información se almacenará en una base de datos MongoDB.

## Comenzando

Estas instrucciones te ayudarán a configurar una copia del proyecto en tu máquina local para fines de desarrollo y prueba.

### Prerrequisitos

Para ejecutar este proyecto necesitarás tener instalado lo siguiente:

- Node.js
- MongoDB
  https://www.mongodb.com/

### Instalación

Sigue los siguientes pasos para instalar y ejecutar el proyecto en tu máquina local:

1. Clona el repositorio: `git clone https://github.com/tu-usuario/nombre-del-repositorio.git`
2. Ve a la carpeta del proyecto: `cd nombre-del-repositorio`
3. Instala las dependencias: `npm install`
4. El archivo .env En este caso dejare el archivo para que sea mas facil de probar el proyecto,para poder cambiar la base de datos de MongoDB cambiarlo por el tuyo tambien puedejes colocarlo Por ejemplo:

```
MONGODB_URI=mongodb+srv://<username>:<password>@testingpersona.er2filt.mongodb.net/test

```

5. Ejecuta el proyecto: `npm start`

### Estructura del Proyecto

Breve descripción de la estructura de archivos del proyecto.

```
nombre-del-proyecto/
├── index.js
├── database/
│   └── config.js
├── models/
│   └── Usuario.js
├── controllers/
│   └── authController.js
├── middlewares/
│   ├── validar-campos.js
│   └── validar-jwt.js
└── helpers/
    └── jwt.js
```

### Uso

A continuación se muestra una breve descripción de cómo usar el proyecto y ejemplos de las diferentes rutas que se pueden acceder.

### Crear un nuevo usuario

```POST /api/auth/new
{
  "name": "Nombre del usuario",
  "email": "Correo electrónico del usuario",
  "age": "Edad del usuario",
  "dateOfBirth": "Fecha de nacimiento del usuario",
  "password": "Contraseña del usuario"
}
```

### Iniciar sesión

```POST /api/auth
{
  "email": "Correo electrónico del usuario",
  "password": "Contraseña del usuario"
}
```

### Renovar el token de autenticación

```POST /api/auth
{
  "email": "Correo electrónico del usuario",
  "password": "Contraseña del usuario"
}
```

# Documentación de uso de Postman para API REST"

Este directorio contiene una colección de solicitudes HTTP en formato JSON creada con Postman para probar el API de acceso a la aplicación. Además, también se incluye un archivo JS el cual se encuentra en la --carpeta que se llama

## PostMan con el el nombre del archivo llamado pruebaTecnica.postman_collection.json

La primera solicitud es para crear un nuevo usuario en la aplicación. La solicitud utiliza el método HTTP POST para enviar los detalles del nuevo usuario al servidor. El cuerpo de la solicitud es un objeto JSON que contiene el nombre, correo electrónico, edad, fecha de nacimiento y contraseña del usuario. La URL de la solicitud es http://localhost:3000/api/auth/new.

La segunda solicitud es para iniciar sesión en la aplicación. La solicitud también utiliza el método HTTP POST para enviar las credenciales del usuario al servidor. El cuerpo de la solicitud es un objeto JSON que contiene el correo electrónico y la contraseña del usuario. La URL de la solicitud es http://localhost:3000/api/auth/.

La tercera solicitud es para renovar un token de acceso. La solicitud utiliza el método HTTP GET y utiliza un encabezado de autorización que contiene un token JWT previamente emitido. El cuerpo de la solicitud no se usa en este caso. La URL de la solicitud es http://localhost:3000/api/auth/renew.

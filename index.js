
const express = require('express')
require('dotenv').config()
const { dbConnecton } = require('./database/config')


// Creamos nuestra aplicación express
const app = express()

// Conectamos a nuestra base de datos
dbConnecton()

// Indicamos que el directorio 'public' será servido estáticamente
app.use(express.static('public'))

// Configuramos express para que pueda interpretar y leer el cuerpo de las solicitudes como JSON
app.use(express.json())

// Agregamos las rutas de nuestro servidor, en este caso para autenticación
app.use('/api/auth', require('./routes/auth'))

// Iniciamos el servidor y lo configuramos para que escuche las solicitudes entrantes en el puerto especificado en el archivo .env
app.listen(process.env.PORT, () => {
    console.log(`Server running in port http://localhost:${process.env.PORT}`);
})
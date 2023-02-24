const mongoose = require('mongoose')

const dbConnecton = async () => {

    try {
        //Utilizar la función "connect" de mongoose para conectarse a la base de datos utilizando la cadena de conexión de la variable de entorno "DB_CNN"
        await mongoose.connect(process.env.DB_CNN)

        //Desactivar el modo estricto de Mongoose para que los modelos puedan tener propiedades que no están definidas en el esquema
        mongoose.set('strictQuery', false)

        //Imprimir un mensaje en la consola para confirmar que la conexión se ha establecido correctamente
        console.log(`The DB is Online!!!!!`)

    } catch (error) {
        //En caso de que ocurra un error al conectarse a la base de datos, se imprime el error y se lanza una excepción
        console.log(error)
        throw new Error('error a la hora de inicializar DB')
    }
}

module.exports = {
    dbConnecton
}
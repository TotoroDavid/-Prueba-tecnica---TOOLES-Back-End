// Importamos la librería 'jsonwebtoken'
const jwt = require('jsonwebtoken')

// Definimos una función llamada 'generarJWT' que recibe dos parámetros: 'uid' y 'name'
const generarJWT = (uid, name) => {

    // Retornamos una promesa que ejecutará una función asíncrona
    return new Promise((resolve, reject) => {

        // Creamos el objeto 'payload' que contendrá la información a cifrar en el token
        const payload = { uid, name }

        // Utilizamos el método 'sign' de la librería 'jsonwebtoken' para generar el token
        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '2h' // Definimos la expiración del token en 2 horas
        }, (err, token) => {

            // Si ocurre algún error en la generación del token, rechazamos la promesa y mostramos un mensaje de error
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            }

            // Si la generación del token es exitosa, resolvemos la promesa y retornamos el token
            resolve(token)

        })

    })

}

// Exportamos la función 'generarJWT' para que pueda ser utilizada en otros archivos
module.exports = {
    generarJWT
}

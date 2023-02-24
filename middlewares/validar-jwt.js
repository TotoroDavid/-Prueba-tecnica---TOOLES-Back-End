const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {

    // Obtiene el token del header x-token
    const token = req.header('x-token')

    // Si no hay token, se devuelve una respuesta de error
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {

        // Verifica y decodifica el token usando el secreto definido en la configuración
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT
        )

        // Agrega el id y nombre del usuario a la solicitud para que estén disponibles para los siguientes middlewares
        req.uid = uid
        req.name = name

    } catch (error) {
        // Si el token no es válido, se devuelve una respuesta de error
        return res.status(401).json({
            ok: false,
            msg: 'Token no es valido'
        })
    }

    // Si el token es válido, se continúa con el siguiente middleware
    next()
}

module.exports = {
    validarJWT
}
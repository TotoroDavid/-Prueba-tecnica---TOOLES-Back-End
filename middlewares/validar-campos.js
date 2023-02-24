const { response } = require('express')
const { validationResult } = require('express-validator')

// Validar los campos de entrada de la solicitud usando el módulo express-validator
const validarCampos = (req, res = response, next) => {

    // Si hay errores en la validación, se devuelve una respuesta de error con los errores mapeados
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({
            ok: false,
            error: error.mapped()
        })
    }
    // Si no hay errores, se pasa al siguiente middleware
    next()
}

module.exports = {
    validarCampos
}
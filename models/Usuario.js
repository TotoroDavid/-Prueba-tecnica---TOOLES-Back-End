// Importar los módulos necesarios de mongoose
const { Schema, model } = require('mongoose')

// Definir el esquema del usuario
const UserioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true,
        unique: true
    },
    edad: {
        type: Number,
        require: true
    },
    fechaNacimiento: {
        type: String,
        require: true
    },
    contraseña: {
        type: String,
        require: true
    },
})

// Exportar el modelo de usuario creado
module.exports = model('Usuario', UserioSchema)
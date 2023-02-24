/**
 * rutas usuarios /auth
 * /api/auth
 */

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { createUser, loginUser, revalidateToken } = require('../controllers/authController')
const { validarJWT } = require('../middlewares/validar-jwt')


// Ruta para registrar un nuevo usuario
router.post(
    '/new',
    [
        check('nombre', 'nombre es obligatorio').not().isEmpty(),
        check('correo', 'el correo es obligatorio').isEmail(),
        check('contraseña', 'la contraseña tiene que ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos // Middleware para validar los campos
    ],
    createUser // Controlador para crear un usuario
)

// Ruta para hacer login
router.post(
    '/',
    [
        check('correo', 'el correo es obligatorio').isEmail(),
        check('contraseña', 'la contraseña tiene que ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos // Middleware para validar los campos
    ],
    loginUser // Controlador para hacer login
)

// Ruta para renovar el token
router.get('/renew', validarJWT, revalidateToken)

// Exportación del Router
module.exports = router
/**
Este archivo contiene las funciones controladoras para la autenticación de usuarios,
incluyendo la creación de un nuevo usuario, el inicio de sesión de un usuario y la
renovación del token de autenticación de un usuario.
El archivo utiliza los modelos de Usuario, bcrypt y nodemailer para interactuar con la base
de datos, encriptar las contraseñas y enviar correos electrónicos de notificación, respectivamente.
También utiliza la función generarJWT del archivo helpers/jwt para generar tokens de autenticación.
*/

const { response } = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const { generarJWT } = require('../helpers/jwt')

//crear un nuevo usuario 
const createUser = async (req, res = response) => {

    const { nombre, correo, edad, fechaNacimiento, contraseña } = req.body

    try {

        let usuario = await Usuario.findOne({ correo })
        console.log(usuario)

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        usuario = new Usuario(req.body)
        //encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        usuario.contraseña = bcrypt.hashSync(contraseña, salt)
        await usuario.save()

        // Enviar el correo electrónico
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.USERMAIL,
                pass: process.env.MAILPASSWORD
            }
        });


        const mailOptions = {
            from: 'tucorreo@gmail.com',
            to: 'destinatario@gmail.com',
            subject: 'Nuevo registro de usuario',
            html: `
                <h3>Nuevo registro de usuario:</h3>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Correo electrónico:</strong> ${correo}</p>
                <p><strong>Edad:</strong> ${edad}</p>
                <p><strong>Fecha de nacimiento:</strong> ${fechaNacimiento}</p>
            `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email enviado');
            }
        })

        //JWT
        const token = await generarJWT(usuario.id, usuario.nombre)

        res.status(201).json({
            ok: true,
            msg: 'El usuario se registro',
            uid: usuario.id,
            nombre: usuario.nombre,
            correo,
            token
            // edad,
            // fechaNacimiento,
            // contraseña
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'porFavorContacteseConElAdministrador'
        })
    }


}

//loginUsuario
const loginUser = async (req, res = response) => {

    const { correo, contraseña } = req.body

    try {
        // Buscar el usuario en la base de datos por correo electrónico
        let usuario = await Usuario.findOne({ correo })
        console.log(usuario)

        if (!usuario) {
            // Verificar si el usuario existe
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese correo'
            })
        }

        // Validar la contraseña ingresada por el usuario
        const valididarContraseña = bcrypt.compareSync(contraseña, usuario.contraseña)

        // Si la contraseña es incorrecta, se devuelve una respuesta de error
        if (!valididarContraseña) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // Generar un token JWT para el usuario autenticado
        const token = await generarJWT(usuario.id, usuario.nombre)

        // Devolver una respuesta exitosa con el token JWT y los datos del usuario
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.nombre,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'porFavorContacteseConElAdministrador'
        })
    }
}

//GenerarDeNuevoJWT
const revalidateToken = async (req, res = response) => {

    // Extraer el uid y el nombre del usuario desde la request
    const { uid, name } = req

    // Generar un nuevo token JWT usando el uid y el nombre del usuario
    const token = await generarJWT(uid, name)

    // Devolver una respuesta exitosa con el nuevo token JWT y un mensaje informativo
    res.json({
        ok: true,
        name,
        msg: 'Este es su nuevo token de validacion',
        token
    })
}
module.exports = {
    createUser,
    loginUser,
    revalidateToken
}
const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');

exports.formCrearCuenta = (req, res, next) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en devjobs',
        tagline: 'Comienza a publicar tus vacantes gratis, solo crea una'
    })
}

exports.validarRegistro = (req, res, next) => {

    //sanitizar
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('email').escape();
    req.sanitizeBody('password').escape();
    req.sanitizeBody('confirmar').escape();
    //validar
    req.checkBody('nombre', 'El nombre es Obligatorio').notEmpty()
    req.checkBody('email', 'el correo debe ser valido').isEmail()
    req.checkBody('password', 'El password no puede ir vacio').notEmpty()
    req.checkBody('confirmar', 'Comfirmar password no puede ir vacio').notEmpty()
    req.checkBody('confirmar', 'El password es diferente').equals(req.body.password)

    const errores = req.validationErrors();

    if(errores){
        req.flash('error', errores.map(error => error.msg))

        res.render('crear-cuenta', {
            nombrePagina: 'Crea tu cuenta en devjobs',
            tagline: 'Comienza a publicar tus vacantes gratis, solo crea una',
            mensajes: req.flash()
        })
        return;
    }

    next()
}

exports.crearUsuario = async (req, res, next) => {
    const usuario = new Usuarios(req.body)

    try{
        await usuario.save()
        res.redirect('/iniciar-sesion')
    }catch(error){
        req.flash('error', error);
        res.redirect('/crear-cuenta')
    }
    return next();
}

//formulario para iniciar sesion
exports.formIniciarSesion = (req, res, next) => {
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar Sesion en devjobs',
    })
}
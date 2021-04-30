const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/administracion',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})
  
//revisar si el usuario esta autenticado o no
exports.verificarUsuario = (req, res, next) => {
    if(req.isAuthenticated() === 'ok'){
        return next();
}
    res.redirect('/iniciar-sesion')
}

exports.mostrarPanel = (req, res) => {
    res.render('administracion', {
        nombrePagina: 'Panel de Administracion',
        tagline: 'Crea y Administra tus cuentas desde aqui'
    })
}
const express = require('express');
const router = express.Router();

const controller = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function(){
    router.get('/', controller.mostrarTrabajos);

    //crear vacantes
    router.get('/vacantes/nueva',
    authController.verificarUsuario,  
    vacantesController.formularioVacante);

    router.post('/vacantes/nueva', 
    authController.verificarUsuario, 
    vacantesController.agregarVacantes);

    //mostrar vacante
    router.get('/vacantes/:url', vacantesController.mostrarVacante);

    //editar vacante 
    router.get('/vacantes/editar/:url',
    authController.verificarUsuario,   
    vacantesController.formEditarVacante);

    router.post('/vacantes/editar/:url',
    authController.verificarUsuario,   
    vacantesController.editarVacante);

    //crear cuentas
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', 
    usuariosController.validarRegistro,
    usuariosController.crearUsuario);

    //autenticar usuarios
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario); 

    //Panel de administracion
    router.get('/administracion', 
    authController.verificarUsuario, 
    authController.mostrarPanel);

    return router;
}
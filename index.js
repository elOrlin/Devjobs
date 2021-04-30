const mongoose = require('mongoose');
require('./config/db');

const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const path = require('path');
require('dotenv').config({path: 'variables.env'});
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('./config/passport');
const app = express();

//habilitar bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//validacion de campos
app.use(expressValidator());

//habilitar handlebars como view
app.engine('handlebars',
    exphbs({
        defaultLayout: 'layout',
        helpers: require('./helpers/handlebars'),
        runtimeOptions: {
             allowProtoPropertiesByDefault: true,
             allowProtoMethodsByDefault: true
        }      
    })
);

//inicializar passport
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'handlebars');

//cargar archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({mongooseConnection: mongoose.connection})
}))

//alertas y flash messages
app.use(flash());

//crear nuestro midleware
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
})

app.use('/', routes());

app.listen(process.env.PUERTO);
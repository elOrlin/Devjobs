const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//hashear password
const bcrypt = require('bcrypt');
const passport = require('passport');

const usuariosSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    expira: Date
})

//metodo para hashear los password
usuariosSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }

    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});

//revisar si el usuario esta autenticado
usuariosSchema.post('save', function(error, doc, next) {
    if(error.name === 'MongoError'){
        next('Ese correo ya esta registrado')
    }else{
        next(error)
    }
})

//autenticar usuarios
usuariosSchema.methods = {
    compararPassword: function(password){
        return bcrypt.compareSync(password, this.password)
    }
}

module.exports = mongoose.model('Usuarios', usuariosSchema)
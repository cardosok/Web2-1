var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node',{useNewUrlParser: true});

var userSchema = new mongoose.Schema({
    nome: String,
    usuario: String,
    senha: String,
    email: String,
    titulo: String,
    date: String,
    conteudo: String
}, { collection: 'usercollection' }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema }
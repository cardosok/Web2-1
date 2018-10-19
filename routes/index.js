var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  if (req.cookies && req.cookies.login) {
    console.log("Ususario: "+ req.cookies.login);
    
    var db = require("../db");
    var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
    Users.find({}).lean().exec(
      function (e, docs) {
        console.log(docs)
          res.render('userlist', { "userlist": docs });
    });
  }
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Login'});
});

router.get('/insertData', function(req, res) {
  login = req.cookies.login;
  if (req.cookies && req.cookies.login) {
    res.render('insertData');
  }
});

router.post('/FormLogin', function(req,res){
  var login = req.body.Login;
  var senha = req.body.Password;
  var user = [];
  console.log(login);
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  Users.find({}).lean().exec(
     function (e, docs) {
       user = docs;
       user.toString();
       docs.forEach(function(data, doc) {
        console.log(data.usuario);
        console.log(data.dados);
        if(login == data.usuario && senha == data.senha){
          console.log("Achei usu");
          res.cookie('login', data.usuario);
          res.redirect("userlist");
          res.end();
        }
      });
        res.render('index', { title: 'Express' });
        //res.end();
  });
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {

  var db = require("../db");
  var Name = req.body.nome;
  var Usuario = req.body.usuario;
  var Senha = req.body.senha;
  var Email = req.body.email;

  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  var user = new Users({ nome: Name,usuario: Usuario, senha:Senha ,email: Email });
  user.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
        res.redirect("login");
      }
  });
});

router.post('/addcon', function (req, res) {
  var titulo = req.body.titulo;
  var conteudo = req.body.conteudo;
  var date = req.body.date;
  var user = [];
  console.log(titulo);
  console.log(conteudo);
  console.log(date);
  login = req.cookies.login;
  if (req.cookies && req.cookies.login) {
        console.log("Usuario: "+ req.cookies.login);
      
      var myquery = { usuario: login};
      var newvalues = { $push: {conteudo: conteudo, titulo: titulo, date: date}};

      var db = require("../db");
      var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
      Users.updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });

      Users.find({}).lean().exec(
        function (e, docs) {
          console.log(docs);
          res.render('userlist', { "userlist": docs });
    });
  }      
});




module.exports = router

var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var tipController = require('../controllers/tip_controller');
var userController = require('../controllers/user_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.randomplay){
        req.session.randomplay.resolved=[];
    }

    res.render('index');
});

// Pagina de creditos
router.get('/author', function(req, res, next) {
    if(req.session.randomplay){
        req.session.randomplay.resolved=[];
    }

    res.render('author');
});
/* GET ayuda */
router.get('/help', function(req, res, next) {
    if(req.session.randomplay){
        req.session.randomplay.resolved=[];
    }

    res.render('help');
});

//Autoload para rutas que usen :quizId
router.param('quizId', quizController.load);
router.param('userId', userController.load);


// Definición de rutas de cuenta
router.get('/users',                    userController.index);   // listado usuarios
router.get('/users/:userId(\\d+)',      userController.show);    // ver un usuario
router.get('/users/new',                userController.new);     // formulario sign un
router.post('/users',                   userController.create);  // registrar usuario
router.get('/users/:userId(\\d+)/edit', userController.edit);     // editar información de cuenta
router.put('/users/:userId(\\d+)',      userController.update);   // actualizar información de cuenta
router.delete('/users/:userId(\\d+)',   userController.destroy);  // borrar cuenta

//Definicion de rutas de /quizzes
router.get('/quizzes', quizController.index); //Cuando llega una peticion para quizcontroller
router.get('/quizzes/:quizId(\\d+)', quizController.show);//Cuando se pide ver una pregunta
router.get('/quizzes/new', quizController.new);//cuando se quiere crear un nuevo quiz
router.post('/quizzes', quizController.create);//Cuando se quiere subir un nuevo quiz
router.get('/quizzes/:quizId(\\d+)/edit', quizController.edit);//cuando se quiere editar un quizz
router.put('/quizzes/:quizId(\\d+)', quizController.update);
router.delete('/quizzes/:quizId(\\d+)', quizController.destroy); //Funcion de eliminar una pregunta

router.get('/quizzes/:quizId(\\d+)/play', quizController.play);//Se empieza a jugar
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);//Para comprobar si hemos acertado


//Definicion de rutas de random
router.get('/quizzes/randomplay', quizController.randomplay);
router.get('/quizzes/randomcheck/:quizId(\\d+)', quizController.randomcheck);

//Definicion de las rutas de tipcontroller
router.post('/quizzes/:quizId(\\d+)/tips', tipController.create);


module.exports = router;

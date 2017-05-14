var models = require("../models");
var Sequelize = require('sequelize');
//Autoload el quiz asociado a :quizId
exports.load = function (req, res, next, quizId) {//Incluimos un parametro en la peticion que es quiz, solo si existe
    models.Quiz.findById(quizId)//Realizamos la consulta a la base de datos
        .then(function (quiz) {//que nos devuelve un quiz, que es el que pasamos como parametro en la peticion
            if(quiz){
                req.quiz = quiz;
                next();
            } else {
                throw new Error('No existe ningún quiz con id=' + quizId);
            }
        })
        .catch(function (error) {
            next(error);
        });

};


//GET /quizzes 
exports.index = function (req, res, next) {
    //Extraemos todas las preguntas de la BBDD y las mostramos
    models.Quiz.findAll()
        .then(function (quizzes) {
            res.render('quizzes/index', {quizzes: quizzes});
        })
        .catch(function (error) {//Se activa si ocurre un error en el acceso a la base de datos
            next(error);
        });
};

//GET /quizzes/:quizId
exports.show=function (req, res, next) {

   res.render('quizzes/show', {quiz: req.quiz});
};

//GET /quizzes/new
exports.new = function (req, res, next) {//Funcion que se encarga de mandar al usuario a la vista de crear

    var quiz = {question: "", answer: ""};
    res.render('quizzes/new', {quiz: quiz});
};

//POST /quizzes
exports.create = function (req, res, next) {//funcion que a partir de los datos rellenados por el usuario crea la pregunta

    var quiz= models.Quiz.build({//Extraemos los datos que ha rellenado el usuario en el formulario
       question: req.body.question,
       answer: req.body.answer
    });

    //ahora guardamos los datos
    quiz.save({fields: ["question", "answer"]})
        .then(function (quiz) {
            res.redirect('/quizzes/' + quiz.id);
        })
        .catch(Sequelize.ValidationError, function (error) {//Si algun dato no es correcto motramos en la consola los errores
            console.log("Errores en el formulario:");
            for (var i in error.errors){
                console.log(error.errors[i].value);
            }
            res.render('quizzes/new', {quiz: quiz});
        })
        .catch(function (error) {
            next(error);
        });

};

// GET /quizzes/:quizId/edit
exports.edit = function (req, res, next) {

    res.render('quizzes/edit', {quiz: req.quiz});
};

// PUT /quizzes/:quizId
exports.update = function (req, res, next) {//Funcion que se encarga de actualizar los cambios
//que ha realizado el usuario en una pregunta
    req.quiz.question = req.body.question;//Recuperamos los valores del formulario
    req.quiz.answer = req.body.answer; //Y los metemos en la respuesta

    req.quiz.save({fields: ["question", "answer"]})//Guardamos los campos en la BBDD
        .then(function (quiz) {
            res.redirect('/quizzes/' + req.quiz.id);
        })
        .catch (Sequelize.ValidationError, function (error) {//Si algun cajetin esta vacio
            console.log("Errores en el formulario:");
            for (var i in error.errors){
                console.log(error.errors[i].value);
            }
            res.render('quizzes/edit', {quiz: req.quiz});//volvemos a mandar al usuario a edit
        })//Para que corrija los errores
        .catch(function (error) {
            next(error);
        });
};

// DELETE /quizzes/:quizId
exports.destroy = function (req, res, next) {

   req.quiz.destroy()//Destruimos el quiz de la BBDD
       .then(function () {
           res.redirect('/quizzes');//Volvemos al index de quizzes
       })
       .catch(function (error) {
           next(error);
       });


};

// GET /quizzes/:quizId/play
exports.play = function (req, res, next) {

    var answer = req.query.answer || ''; //Recuperamos la respuesta introducida por el usuario
    res.render('quizzes/play', {
            quiz: req.quiz,
            answer: answer
        });

};


// GET /quizzes/:quizId/check
exports.check = function (req, res, next) {

    var answer = req.query.answer || "";

    var result = answer.toLowerCase().trim() === req.quiz.answer.toLowerCase().trim();//Si el usuario acierta -> true

    res.render('quizzes/result', {
            quiz: req.quiz,
            result: result,
            answer: answer
        });

};

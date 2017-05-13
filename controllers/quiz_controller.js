var models = require("../models");

//Autoload el quiz asociado a :quizId
exports.load = function (req, res, next, quizId) {//Incluimos un parametro en la peticion que es quiz, solo si existe
    var quiz = models.Quiz.findById(Number(quizId));
    if(quiz){
        req.quiz = quiz;
        next();
    } else {
        throw new Error('No existe ningún quiz con id=' + quizId);
    }
};


//GET /quizzes 
exports.index = function (req, res, next) {
    var quiz = models.Quiz.findAll();//Extraemos todas las preguntas de la BBDD y las mostramos

    res.render('quizzes/index', {quiz: quiz});
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

    var quiz= {//Extraemos los datos que ha rellenado el usuario en el formulario
       question: req.body.question,
       answer: req.body.answer
    };

    if(!quiz.question || !quiz.answer){//Comprobamos si estan vacias
        res.render('quizzes/new', {quiz: quiz});
        return;
    }
    //Si no estan vacias subimos la pregunta a la BBDD
    quiz=models.Quiz.create(quiz);
    res.redirect('/quizzes/' + quiz.id);
};

// GET /quizzes/:quizId/edit
exports.edit = function (req, res, next) {

    res.render('quizzes/edit', {quiz: req.quiz});
};

// PUT /quizzes/:quizId
exports.update = function (req, res, next) {

    req.quiz.question = req.body.question;
    req.quiz.answer = req.body.answer;

    models.Quiz.update(req.quiz);

    res.redirect('/quizzes/' + req.quiz.id);
};

// DELETE /quizzes/:quizId
exports.destroy = function (req, res, next) {

    models.Quiz.destroy(req.quiz);

    res.redirect('/quizzes');
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

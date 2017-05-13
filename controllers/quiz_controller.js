var models = require("../models");

//GET /quizzes 
exports.index = function (req, res, next) {
    var quiz = models.Quiz.finAll();//Extraemos todas las preguntas de la BBDD y las mostramos

    res.render('quizzes/index', {quiz: quiz});
};
//GET /quizzes/:quizId
exports.show=function (req, res, next) {

    var quizId = Number(req.params.quizId);//Obtenemos en id del quiz pedido

    var quiz = models.Quiz.findById(quizId);//A partir del id obtenemos la pregunta de la base de datos

    if(quiz){
        res.render('quizzes/show', {quiz: quiz});//Si existe se muestra
    } else {
        next(new Error('No existe ningún quiz con id=' + quizId));//Si no -> ERROR .
    }
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

    var quizId = Number(req.params.quizId);  //Extraemos el id y el quiz
    var quiz = models.Quiz.findById(quizId); //que el usuario quiere editar

    if(quiz){//Comprobamos que exista el quiz y mandamos al usuario a
        res.render('quizzes/edit', {quiz: quiz});//la pagina de edicion

    } else {
        next(new Error('No existe ningún quiz con id=' + quizId));//Si no -> ERROR .
    }
};

// PUT /quizzes/:quizId
exports.update = function (req, res, next) {

    var quizId = Number(req.params.quizId);//Extraemos el id del quiz y la pregunta

    var quiz = models.Quiz.findById(quizId);

    if (quiz) {//Si el quiz no esta vacio actualizamos la base de datos a partir
        quiz.question = req.body.question;//de los datos que ha rellenado el usuario
        quiz.answer = req.body.answer;//en e formulaio

        models.Quiz.update(quiz);

        res.redirect('/quizzes/' + quizId);
    } else {
        next(new Error('No existe ningún quiz con id=' + quizId));
    }
};

// DELETE /quizzes/:quizId
exports.destroy = function (req, res, next) {

    var quizId = Number(req.params.quizId); //Recuperamos el id del quiz que el usuario desea borrar

    var quiz = models.Quiz.findById(quizId);//A partir del Id obtenemos cual es el quiz

    if (quiz) {
        models.Quiz.destroy(quiz); //Si quiz existe, lo borramos

        res.redirect('/quizzes');//Vokvemos a la pagina de inicio
    } else {
        next(new Error('No existe ningún quiz con id=' + quizId));
    }
};

// GET /quizzes/:quizId/play
exports.play = function (req, res, next) {

    var answer = req.query.answer || ''; //Recuperamos la respuesta introducida por el usuario

    var quizId = Number(req.params.quizId); //Recuperamos el id del quiz en juego

    var quiz = models.Quiz.findById(quizId);//Recuperamos el quiz en juego

    if (quiz) {
        res.render('quizzes/play', {
            quiz: quiz,
            answer: answer
        });
    } else {
        next(new Error('No existe ningún quiz con id=' + quizId));
    }
};


// GET /quizzes/:quizId/check
exports.check = function (req, res, next) {

    var answer = req.query.answer || "";

    var quizId = Number(req.params.quizId);

    var quiz = models.Quiz.findById(quizId);

    var result = answer.toLowerCase().trim() === quiz.answer.toLowerCase().trim();//Si el usuario acierta -> true

    if (quiz) {
        res.render('quizzes/result', {
            quiz: quiz,
            result: result,
            answer: answer
        });
    } else {
        next(new Error('No existe ningún quiz con id=' + quizId));
    }
};


// Modelo
var quizzes = [//Preguntas con su quizId y su answer
    {
        id: 1,
        question: "Capital de Italia",
        answer: "Roma"
    },
    {
        id: 2,
        question: "Capital de Francia",
        answer: "París"
    },
    {
        id: 3,
        question: "Capital de España",
        answer: "Madrid"
    },
    {
        id: 4,
        question: "Capital de Portugal",
        answer: "Lisboa"
    }];

// Siguiente valor para id
var nextId = quizzes.length + 1;

//FUNCIONES QUE EJECUTAMOS

//Create: crea un nuevo quiz
exports.create= function (quiz) {

     quiz = {
        id: nextId++,//Le ponemos el siguiente quizId disponible
        question: (quiz.question || "").trim(),//La pregunta es la del formulario, o en su defecto vacia
        answer: (quiz.answer || "").trim()//El metodo trim() elimina los espacio en blanco
    };

    quizzes.push(quiz);

    return quiz;
};

// Actualiza el quiz pasado como parametro.
exports.update = function(quiz) {

    var index = quizzes.findIndex(function (q) {
        return quiz.id === q.id;
    });

    if (index >= 0) {
        quizzes[index] = {
            id: quiz.id,
            question: (quiz.question || "").trim(),
            answer: (quiz.answer || "").trim()
        };
    }
};

// Devuelve todos los quizzes
exports.findAll = function() {
    return quizzes;
};

// Busca un quiz por su id
exports.findById = function(id) {

    return quizzes.find(function(quiz) {
        return quiz.id === id;
    });
};

// Elimina un quiz
exports.destroy = function(quiz) {

    var index = quizzes.findIndex(function (q) {
        return quiz.id === q.id;
    });

    if (index >= 0) {
        quizzes.splice(index, 1);
    }
};
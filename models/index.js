
var path = require('path');

// Cargar ORM
var Sequelize = require('sequelize');

var url, storage;

if(!process.env.DATABASE_URL){//SI ESTAMOS EN LOCAL SE UTILIZA SQLITE
    url="sqlite://";
    storage = "quiz.sqlite";
} else {//SI ESTAMOS EN EL ENTORNO DE HEROKU SE USA EL URL DE LA BBDD POSTGRES
    url = process.env.DATABASE_URL;
    storage = process.env.DATABASE_STORAGE || "";
}
var sequelize = new  Sequelize(url, {storage: storage});



// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar la definicion de la tabla Tips de tips.js
var Tip = sequelize.import(path.join(__dirname,'tip'));

// Relaciones entre modelos. Relacion 1-a-N.
Tip.belongsTo(Quiz);//Un Tip solo puede pertenecer a un QUiz
Quiz.hasMany(Tip);//Un Quiz puede tener varios Tip.

exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Tip = Tip; // exportar definición de tabla Tips
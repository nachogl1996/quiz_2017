
var path = require('path');

// Cargar ORM
var Sequelize = require('sequelize');

var url, storage;

if(!procces.env.DATABASE_URL){//SI ESTAMOS EN LOCAL SE UTILIZA SQLITE
    url="sqlite://";
    storage = "quiz.sqlite";
} else {//SI ESTAMOS EN EL ENTORNO DE HEROKU SE USA EL URL DE LA BBDD POSTGRES
    url = procces.env.DATABASE_URL;
    storage = procces.env.DATABASE_STORAGE || "";
}
var sequelize = new  Sequelize(url, {storage: storage});



// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));


// Crear tablas
sequelize.sync()
    .then(function () {
        console.log('Bases de datos creadas con éxito');
    })
    .catch(function (error) {
        console.log("Error creando las tablas de la BBDD:", error);
        process.exit(1);
    });


exports.Quiz = Quiz; // exportar definición de tabla Quiz
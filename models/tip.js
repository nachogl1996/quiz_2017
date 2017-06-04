/**
 * Created by nachogl on 2/6/17.
 */
// Definicion del modelo Tips:

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Tip',
        {
            text: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Falta el texto de la Pista."}}
            },
            accepted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        });
};
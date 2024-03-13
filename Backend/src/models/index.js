const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
    db_port,
    db_name,
    db_user,
    db_password,
    db_host,
} = require('../config');

const baseName = path.basename(__filename);
const db = {};
const sequelize = new Sequelize(db_name, db_user, db_password, {
    dialect: 'mysql',
    port: db_port,
    host: db_host,
    logging: false,
});

const listFile = fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf('.') !== 0 && file !== baseName && file.slice(-3) === '.js');
});

listFile.forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);

    db[model.name] = model;
});

Object.keys(db).forEach((model) => {
    if (db[model].associate) {
        db[model].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync().then(() => {
    console.log('Base de datos conectada');
}).catch((error) => console.log(error));

module.exports = db;
import User from './User';
import Product from './Product';
import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import dbConfig from '../config/database.json';


const { dialect, username, password, host, database, } = dbConfig.development;

const sequelizeconnection = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect
});

const db = {};
fs.readdirSync(__dirname)
.filter(file =>  (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
.forEach((file) => {
    const model = sequelizeconnection.import(path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
    db[modelName].associate(db);
    }
});
db.sequelize = sequelizeconnection;
db.Sequelize = Sequelize;

module.exports = db;
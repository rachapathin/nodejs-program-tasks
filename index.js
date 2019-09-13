import app from './new-app' ;
import Sequelize from 'sequelize';
import dbConfig from './config/database.json';
import mongodb from './connect/mongodbconnect'

require('dotenv').config();

app.listen(process.env.PORT, () =>
    console .log( `App listening on port ${process.env.PORT} !` )
);

app.get('/', (req, res) =>
    res.send( `App listening on port ${process.env.PORT} !` )
);

const { dialect, username, password, host, database, } = dbConfig.development;

export const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database Connected successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const mongodbConnection = mongodb.connection;
mongodbConnection.on('error', (err) => console.info('MongoDB Connection error: ', err.message));
mongodbConnection.on('open', () => console.info('MongoDB Connection established...'));
mongodbConnection.on('disconnected', () => console.info('MongoDB disconnected...'));
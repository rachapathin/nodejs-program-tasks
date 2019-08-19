import app from './new-app' ;
import Sequelize from 'sequelize';
import dbConfig from './config/database.json';

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
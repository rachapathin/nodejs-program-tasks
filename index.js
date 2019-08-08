import app from './new-app' ;
require('dotenv').config();

app.listen(process.env.PORT, () =>
    console .log( `App listening on port ${process.env.PORT} !` )
);

app.get('/', (req, res) =>
    res.send( `App listening on port ${process.env.PORT} !` )
);
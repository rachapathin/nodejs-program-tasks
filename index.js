import app from './new-app' ;

const port = process.env.PORT || 8080 ;

app.listen(port, () =>
    console .log( `App listening on port ${port} !` )
);

app.get('/', (req, res) =>
    res.send( `App listening on port ${port} !` )
);
import express from 'express';
import routes from './routes/routes';
import bodyParser from 'body-parser';
import {cookieParser, queryParser, jwtVerify, passportStrategy} from './middlewares';
import passport from 'passport';
import expressSession from 'express-session';
import loginCredentails from './data/logincredentials';

const app =  express();

// Added middlewares for parsing
app.use(cookieParser);
app.use(queryParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressSession({secret: 'secretkey', saveUninitialized: false, resave: false}));

// Passport strategy block
app.use(passport.initialize());
passportStrategy(loginCredentails);

// Routes configuration
routes(app, jwtVerify);

// Default Route 
app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${process.env.PORT}`)
);

export default app;
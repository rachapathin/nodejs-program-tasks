import express from 'express';
import routes from './routes/routes';
import {cookieParser, queryParser} from './middlewares';

const app =  express();

// Added middlewares for parsing
app.use(cookieParser);
app.use(queryParser);

// Routes configuration
routes(app);

// Default Route 
app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

export default app;
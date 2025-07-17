import express from 'express';
import { loggingMiddleware } from './middleware/middlewares.mjs';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;


// parses incoming JSON reqs and puts the parsed data in req.body
app.use(express.json());
app.use(cookieParser('my_secret_key'));

app.use(loggingMiddleware, (req, res, next) =>{
    console.log('Finished Logging...');
    next(); // continues to route handlers
});

// Routers
app.use(routes);

app.get('/', (req, res) => {
    res.cookie('name','Ivan Vargas', { maxAge: 60000 * 60, signed: true});
    res.status(201).send({
        message: 'Welcome Ivan Vargas',
    });
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
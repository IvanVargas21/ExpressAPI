import express from 'express';
import { loggingMiddleware } from './middleware/middlewares.mjs';
import routes from './routes/index.mjs';

const app = express();
const PORT = process.env.PORT || 3000;


// parses incoming JSON reqs and puts the parsed data in req.body
app.use(express.json())
app.use(loggingMiddleware, (req, res, next) =>{
    console.log('Finished Logging...');
    next(); // continues to route handlers
});

// Routers
app.use(routes);

app.get('/', (req, res) => {
    res.status(201).send({
        message: 'Welcome Ivan Vargas',
        status: 'success'
    });
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
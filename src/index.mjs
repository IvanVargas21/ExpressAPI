import express from 'express';
import { 
    query, 
    validationResult, 
    body,
    matchedData,
    checkSchema
} from 'express-validator';
import { 
    createUserValidationSchema, getUserByValueAndFilterValidationSchema,
    putUserValidationSchema,
    patchUserValidationSchema
} from './utils/validationSchemas.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next(); // continues to route handlers
}
const resolveIndexByUserId = (req, res, next) => {
    const {
    params: { id }
  } = req;
  // string to numeric conversion
  const parsedId = parseInt(id);
  if(isNaN(parsedId)) return res.status(400).send({msg: 'Bad Request! Invalid Id'});
  // findIndex() returns the index of the first element that passes the condition
  const findUserIndex = mockUsers.findIndex(
    (user) => user.id === parsedId
  )
  if(findUserIndex === -1) return res.status(404).send({msg: 'User not found'});

  req.findUserIndex = findUserIndex; // stores the index of the user in the request object
  next();
}

// parses incoming JSON reqs and puts the parsed data in req.body
app.use(express.json())
app.use(loggingMiddleware, (req, res, next) =>{
    console.log('Finished Logging...');
    next(); // continues to route handlers
});

// Route Params - /api/users/:id
// Query Params - /api/users?id=1&name=ivan
const mockUsers = [
    { id: 1, username: 'ivan', displayName: 'Ivan Vargas' },
    { id: 2, username: 'john', displayName: 'John Doe' },
    { id: 3, username: 'jane', displayName: 'Jane Doe' },
    { id: 4, username: 'alice', displayName: 'Alice Smith' },
    { id: 5, username: 'bob', displayName: 'Bob Johnson' },
    { id: 6, username: 'charlie', displayName: 'Charlie Brown' },
    { id: 7, username: 'dave', displayName: 'Dave Wilson' },
    { id: 8, username: 'eve', displayName: 'Eve Davis' },
    { id: 9, username: 'frank', displayName: 'Frank Miller' },
    { id: 10, username: 'grace', displayName: 'Grace Lee' }
];
const mockProducts = [
    {id: 123, name: "Laptop", price: 999.99},
    {id: 456, name: "Smartphone", price: 499.99},
    {id: 789, name: "Tablet", price: 299.99}
]

app.get('/', (req, res) => {
    res.status(201).send({
        message: 'Welcome Ivan Vargas',
        status: 'success'
    });
})

// Basic GET reqs and res 
app.get(
    '/api/users',
    checkSchema(getUserByValueAndFilterValidationSchema), 
    loggingMiddleware, 
    (req, res) => {
    console.log(req['express-validator#contexts']);
    const result = validationResult(req);
    console.log(result);

    const { 
        query: { filter, value } 
    } = req;

    if(filter && value) return res.send(
        mockUsers.filter((user) => user[filter].includes(value))
    )

    return res.send(mockUsers)
})

app.get('/api/products', (req, res) =>{
    res.send(mockProducts)
})

// Route Params
app.get('/api/users/:id', resolveIndexByUserId, (req, res) => { 
    const { findUserIndex } = req;
    const findUser = mockUsers[findUserIndex];
    if(!findUser) return res.status(404).send({msg: 'User not found'});
    res.send(findUser);
})

// POST request
app.post(
    '/api/users',
    checkSchema(createUserValidationSchema),
    (req, res) => {    
        console.log(req.body);
        const result = validationResult(req);
        console.log(result);

        if(!result.isEmpty())
            return res.status(400).send({ errors: result.array() });

        const data = matchedData(req);
        const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data}
        mockUsers.push(newUser);
        return res.status(201).send(newUser);
    }
)

// PUT requests - to update or replace an entire resource
app.put('/api/users/:id',
    checkSchema(putUserValidationSchema),
    resolveIndexByUserId, 
    (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        console.log(result);
        return res.status(400).send({ errors: result.array() });
    }
    const { body, findUserIndex} = req;

    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
    return res.status(200).send(mockUsers[findUserIndex]);
})


// PATCH request - to apply partial modifications to a resource
app.patch('/api/users/:id',
    checkSchema(patchUserValidationSchema),
    resolveIndexByUserId, 
    (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        console.log(result);
        return res.status(400).send({ errors: result.array()})
    }
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = {
        ...mockUsers[findUserIndex],
        ...body
    };
    return res.status(200).send(mockUsers[findUserIndex]);
})

app.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    const deletedUser = mockUsers[findUserIndex];
    // splice(start, deleteCount, item1, ite2, ...)
    mockUsers.splice(findUserIndex, 1);

    res.status(200).send({ msg: `User ${deletedUser.displayName} deleted successfully` });
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
import express from 'express';

const app = express();

// Middleware
// parses incoming JSON reqs and puts the parsed data in req.body
app.use(express.json())
const PORT = process.env.PORT || 3000;

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
      status: 'sucess'
    });
})

// Basic GET reqs and res 
app.get('/api/users', (req, res) => {
    console.log(req.query);
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
app.get('/api/users/:id', (req, res) => {
  console.log(req.params);

  // parses a string and returns the first integer
  const parsedId = parseInt(req.params.id);
  console.log(parsedId);
  if(isNaN(parsedId)) return res.status(400).send({msg: 'Bad Request! Invalid Id'});

  const user = mockUsers.find((user) => user.id === parsedId);
  if(!user) return res.status(404).send({msg: 'User not found'});
  res.send(user);
})

// POST request
app.post('/api/users', (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body}
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
})

// PUT requests - to update or replace an entire resource
app.put('/api/users/:id', (req, res) => {
  const {
    body,
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
  
  mockUsers[findUserIndex] = { id: parsedId, ...body };

  return res.status(200).send(mockUsers[findUserIndex]);
})
// PATCH request - to apply partial modifications to a resource
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
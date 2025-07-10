import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

const mockUsers = [
    { id: 1, username: 'ivan', displayName: 'Ivan Vargas' },
    { id: 2, username: 'john', displayName: 'John Doe' },
    { id: 3, username: 'jane', displayName: 'Jane Doe' }
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
  res.send(mockUsers)
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


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
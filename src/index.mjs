import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.status(201).send({
      message: 'Welcome Ivan Vargas',
      status: 'sucess'
    });
})

app.get('/api/users', (req, res) => {
  res.send([
    {id: 1, username: "ivan", displayName: "Ivan Vargas"},
    {id: 2, username: "john", displayName: "John Doe"},
    {id: 3, username: "jane", displayName: "Jane Doe"}
  ])
})

app.get('/api/products', (req, res) =>{
  res.send([
    {id: 123, name: "Laptop", price: 999.99},
    {id: 456, name: "Smartphone", price: 499.99},
    {id: 789, name: "Tablet", price: 299.99}
  ])
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
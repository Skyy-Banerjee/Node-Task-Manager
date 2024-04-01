API stands for Application Programming Interface. It is a set of rules and protocols that allows different software applications to communicate with each other. APIs define the methods and data formats that developers can use to interact with the services provided by a software application, web service, or operating system.

REST (Representational State Transfer) is an architectural style for designing networked applications. It is based on a client-server model where clients send requests to servers to perform actions or retrieve data. RESTful APIs are APIs that adhere to the principles of REST. These principles include:

1. **Client-Server Architecture**: The client and server are separate from each other and communicate via HTTP requests and responses.

2. **Statelessness**: Each request from a client to the server must contain all the information necessary to understand and process the request. The server does not store any client state between requests.

3. **Uniform Interface**: The interface between the client and server should be uniform and consistent, making it easy to understand and use. This includes using standard HTTP methods (GET, POST, PUT, DELETE) and standard data formats (JSON, XML).

4. **Cacheability**: Responses from the server should be cacheable to improve performance and reduce latency.

5. **Layered System**: The architecture should be designed in layers, with each layer having a specific role and responsibility. This allows for scalability and flexibility.

6. **Code on Demand (optional)**: The server can send executable code to the client to be executed within the client's context, such as JavaScript in web browsers.

In Node.js and Express, developers can create RESTful APIs using the Express.js framework, which provides features for routing, handling HTTP requests and responses, middleware, and more. Here's an example of how to create a simple RESTful API in Node.js/Express:

```javascript
const express = require('express');
const app = express();
const port = 3000;

let products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 }
];

// GET method to retrieve all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET method to retrieve a single product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(product => product.id === productId);
  if (!product) {
    res.status(404).send('Product not found');
  } else {
    res.json(product);
  }
});

// POST method to create a new product
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).send('Product created');
});

// PUT method to update an existing product
app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = products.findIndex(product => product.id === productId);
  if (index === -1) {
    res.status(404).send('Product not found');
  } else {
    products[index] = updatedProduct;
    res.status(200).send('Product updated');
  }
});

// DELETE method to delete an existing product
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === productId);
  if (index === -1) {
    res.status(404).send('Product not found');
  } else {
    products.splice(index, 1);
    res.status(200).send('Product deleted');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
```

In this example:
- We define routes for various HTTP methods (GET, POST, PUT, DELETE) to handle different actions on the `products` resource.
- We use `express.json()` middleware to parse JSON request bodies.
- Each route handler receives `req` (request) and `res` (response) objects, which we use to interact with the client.
- We use `res.json()` to send JSON responses and `res.status()` to set the HTTP status code of the response.


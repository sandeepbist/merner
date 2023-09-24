import fs from 'fs'

const index = fs.readFileSync('index.html','utf-8')
const data = JSON.parse(fs.readFileSync('data.json','utf-8'))
const products = data.products;

import express from 'express'

const server = express();

server.use(express.json());
server.use(express.static('public'));

//Create using POST
server.post('/products',(req,res)=>
{
  console.log(req.body);
  products.push(req.body)
  res.json(req.body)
});

//Read using GET /products
server.get('/products',(req,res)=>
{
  res.json(products);
});

//Read using GET /products/:id
server.get('/products/:id',(req,res)=>
{
  const id = +req.params.id;
  const product = products.find(p=>p.id===id)
  res.json(product);
});

//Update using PUT => /products/:id
server.put('/products/:id',(req,res)=>
{
  const id = +req.params.id;
  const productIndex = products.findIndex(p=>p.id===id)
  products.splice(productIndex,1,{...req.body,id:id})
  res.status(201).json();
});

//Update using PATCH => /products/:id
server.patch('/products/:id',(req,res)=>
{
  const id = +req.params.id;
  const productIndex = products.findIndex(p=>p.id===id)
  const product = products[productIndex];
  products.splice(productIndex,1,{...product,...req.body})
  res.status(201).json();
});

//Delete using DELETE => /product/delete
server.delete('/products/:id',(req,res)=>
{
  const id = +req.params.id;
  const productIndex = products.findIndex(p=>p.id===id)
  const product = products[productIndex];
  products.splice(productIndex,1)
  res.status(201).json(product);
});
server.listen(8080)
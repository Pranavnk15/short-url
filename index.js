const express = require('express');
const { connectToMongoDB } = require('./connection');
const urlRoute = require('./routes/url');
const URL = require('./models/url');

const app = express();
const PORT = 8001;

//connect
connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("MongoDB connected"));

app.use(express.json());

//Routes
app.use('/url', urlRoute);

app.listen(PORT, ()=> console.log(`Server started on Port: ${PORT}`));
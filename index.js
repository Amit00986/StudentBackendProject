require('dotenv').config();
const express = require('express');

const DbConnect = require('./src/apis/DB/index');

const router = require('./src/apis/Router');

const app = express();

DbConnect();

app.use(express.json());

app.use('/', router);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is Running on ${process.env.PORT}`); // here server is started 
});



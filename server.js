const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./helpers/database/connectDatabase');
const routers = require('./routers/index');
const customErrorHandler = require('./middlewares/errors/customErrorHandler');
const path = require('path');
var cors = require('cors');

const app = express();

app.use(cors());

dotenv.config({
    path: './config/env/config.env'
});

//Mongodb connection
connectDatabase();

// Express body middleware
app.use(express.json());

const PORT = process.env.PORT;

//Router middleware
app.use('/api', routers);

//Error Handler
app.use(customErrorHandler);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=>{
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
})
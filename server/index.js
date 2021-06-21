const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
// const cors = require('cors')
const helmet = require('helmet');
const app = express();

const db = require('./db');
const PORT = process.env.PORT || 8000;


db;

// app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(helmet());
// app.use(express.static())


app.use('/api/v1/', require('./routes/userRoutes') );


app.listen(PORT, () => {
    console.log(`server is connected on PORT -  ${PORT}`);
});

// module.exports = server;





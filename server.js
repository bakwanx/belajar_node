const express = require('express');
const req = require('express/lib/request');
const app = express();
const PORT = 7777;
const morgan = require('morgan');
const Routing = require('./routes/routes');
const dotenv = require('dotenv');

// Setting NodeJs Environtment
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use('/', Routing);// setting route
app.use(express.json()); //encode dari form front end
app.use(express.urlencoded({extended:false})); //encode dari form front end atau untuk type data form
dotenv.config({path:'./config/Config.env'});

// MongoDB Connection
const ConnectMongoDB = require('./models/mongodb/Connections');
ConnectMongoDB();

app.listen(PORT, function(){
    console.log(`Server is running in port ${PORT}`);
    console.log(`Server Nyalaaaa !`);
});

// Rest API
// app.get('/get/api', (req, res) => {
//     res.json({
//         statusCode : 200,
//         result:{
//             nama : "farhan",
//             umur : 28
//         }
//     })
// });

// app.post('post/product', (req, res) => {

// });


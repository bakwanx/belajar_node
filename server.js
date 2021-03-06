const express = require('express');
const req = require('express/lib/request');
const app = express();
const PORT = 7777;
const morgan = require('morgan');
const Routing = require('./routes/routes');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const Cors = require('cors');
const fileUpload = require('express-fileupload');
dotenv.config({path:'./config/Config.env'});

// Setting NodeJs Environtment
app.use(fileUpload());
app.use(Cors());
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.json()); //encode dari form json
app.use(bodyParser.urlencoded({extended:true})); //encode dari form front end atau untuk type data form

// MongoDB Connection
const ConnectMongoDB = require('./models/mongodb/Connections');
ConnectMongoDB();

app.listen(PORT, function(){
    console.log(`Server is running in port ${PORT}`);
    console.log(`Server Nyalaaaa !`);
});

app.use('/', Routing);// setting route
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


const express = require('express');
const res = require('express/lib/response');
const Routes = express.Router();
const productController = require('../controllers/product/productview');
const productAPIController = require('../controllers/product/product');
const formController = require('../controllers/form/form');
const userController = require('../controllers/user/user');
const ImagesControllers = require('../controllers/images/images');
const productMysqlController = require('../controllers/product_mysql/product');

Routes.get('/', productController.mainProduct);
Routes.get('/products', productController.products);
Routes.get('/detail-product', productController.detailProduct);

//FORM PAGE
Routes.get('/form', (req,res) =>{
    res.render('form/form')
});
Routes.post('/form/post', formController.create);

//Login
Routes.get('/login', (req, res) => {
    res.render('login');
});
Routes.post('/login-post', userController.LoginPost);

// API
Routes.get('/product-api', productController.findAll);
Routes.get('/api/product/all', productAPIController.All);
Routes.get('/api/product/get/:id', productAPIController.FindOne);
Routes.post('/api/product/post', productAPIController.Create);
Routes.put('/api/product/put/:id', productAPIController.UpdateOne);
Routes.delete('/api/product/delete/:id', productAPIController.Delete);
Routes.get('/api/product/search', productAPIController.Search);
Routes.get('/api/product/getByUserData', productAPIController.findDataByUserData);

// API USER
Routes.get('/api/user/all', userController.All);
Routes.get('/api/get/user/:id', userController.FindOne);
Routes.post('/api/register', userController.Create);
Routes.put('/api/user/put/:id', userController.UpdateOne);
Routes.post('/api/login', userController.Login);

//image procession
Routes.get('/image', (req, res) =>{
    res.render('imagespost')
});
Routes.post('/api/post/image', ImagesControllers.ImagesCreate);
Routes.get('/api/get/image/:filename', ImagesControllers.getImages);


//API MYSQL
Routes.post('/api/mysql/create', productMysqlController.create);
module.exports = Routes;

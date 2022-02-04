const express = require('express');
const res = require('express/lib/response');
const Routes = express.Router();
const productController = require('../controllers/product/productview');
const productAPIController = require('../controllers/product/product');
const formController = require('../controllers/form/form');

Routes.get('/', productController.mainProduct);

Routes.get('/products', productController.products);

Routes.get('/detail-product', productController.detailProduct);

//FORM page
Routes.get('/form', (req,res) =>{
    res.render('form/form')
});
Routes.post('/form/post', express.urlencoded({extended:true}), formController.create);

// API
Routes.get('/product-api', productController.findAll);
Routes.get('/api/all', productAPIController.All);
Routes.post('/api/post',  express.json(), productAPIController.Create);

module.exports = Routes;

const res = require("express/lib/response");
const axios = require('axios');
const mainProduct = (req, res) => {
    res.render('index', {judul:'index'});
}

const detailProduct = (req, res) => {
    res.send({
        statusCode : 200,
        result:{
            nama : "farhan",
            umur : 28
        }
    });
}

const cobaFetchApiDiController = (req, res) => {
    axios('link')
    .then(data=>{
        console.log(data);
        res.send(data)
    })
    .catch(e =>{

    });
}

exports.findAll = (req, res) => {
    let dataProduct = [];
    for (let i = 0; i < 10; i++) {
        dataProduct[i] = {
            title:`Product title ${i}`,
            price: 1000 + (i*500),
            //image: window.location.href + "nama_image.jpg"
        }
    }
 
    res.send(dataProduct);
}

const products = (req, res) => {
    let dataProduct = [];
    let image = './images/images-products-4.png';
    for (let i = 0; i < 9; i++) {
        dataProduct[i] = {
            title:`Product title ${i}`,
            image: image
        }
    }
    
    res.render('product/product', {dataProduct : dataProduct});
}

exports.products = products;
exports.mainProduct = mainProduct;
exports.detailProduct = detailProduct;

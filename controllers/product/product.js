const { response } = require('express');
const ProductModel = require('../../models/mongodb/product/product');
const JWT = require('jsonwebtoken');
const JWTModule = require('../../module/JWTCheck');
const UserModel = require('../../models/mongodb/user/user');

exports.All = async (req, res) => {
    
    // cara1 verify pake token
    // let TokenAuth = req.headers.authorization.split(' ')[1];
    // let resultToken = await JWT.verify(TokenAuth, "myTotalySecretKey", function(err, resultToken){
    //     if(err)return false;
    //     if(resultToken) return resultToken
    // });

    // cara2 verify pake token
    let resultToken = await JWTModule.JWTVerify(req.headers);
    if(!resultToken){
        res.send(403);
    }else{
        // cara get data 2
        const getData = await ProductModel.find();
        res.send(getData);
    }

    // cara get data 1
    // ProductModel.find().then(response => {
    //     console.log('berhasil');
    //     res.send({
    //         message: 'Successfull to get data',
    //         statusCode: 200,
    //         results: response
    //     })
    // }).catch( err => {
    //     console.log(err);
    //     res.send({
    //         message: 'Failed to get data',
    //         statusCode: 500,
    //     })
    // })

  
}

exports.Create = async (req, res) => {
    let TokenAuth = req.headers.authorization.split(' ');
    
    let resultToken = await JWT.verify(TokenAuth[1], "myTotalySecretKey", function(err, resultToken){
        if(err)return false;
        if(resultToken) return resultToken
    });
  
    if(!resultToken){
        res.send(403);
    }else{
        // Validasi request
        if(!req.body) {
            return res.status(400).send({
                message: "Konten product tidak boleh kosong!!!!"
            });
        }

        // Create skema baru Product
        const product = new ProductModel({
            UID: resultToken.UID,
            UserOwner: resultToken.Username,
            title: req.body.title || "Untitled Product", 
            description: req.body.description,
            price: req.body.price
        });

        // Simpan product
        product.save()
        .then(response => {
            res.send(response);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    }
}

exports.FindOne = async (req, res) => {
    const id = req.params.id;
    // ProductModel.findById(id)
    // .then(user => {
    //     res.send(user);
    // }).catch(err => {
    //     return res.status(500).send({
    //         message: "Error mengambil produk dengan id " + id
    //     });
    // });
    const getProduct = await ProductModel.findById(id);
    res.send(getProduct);
}

exports.UpdateOne = async (req, res) => {
    
    let TokenAuth = req.headers.authorization.split(' ');
    
    let resultToken = await JWT.verify(TokenAuth[1], "myTotalySecretKey", function(err, resultToken){
        if(err)return false;
        if(resultToken) return resultToken
    });

    if(!resultToken){
        res.send(403);
    }else{
        const id = req.params.id;
        const getProduct = await ProductModel.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        });
        res.send("Succes update");
    }
  
    // UserModel.findByIdAndUpdate(id,{
    //     username: req.body.username, 
    //     password: req.body.password,
    //     fullname: req.body.fullname,
    //     email: req.body.email,
    //     age: req.body.age,
    //     description: req.body.description,
    // }).then(user => {
    //     res.send("Success update");
    // }).catch(err => {
    //     res.send(err);
    // });
}


exports.Delete = async (req, res) => {
    let TokenAuth = req.headers.authorization.split(' ');
    
    let resultToken = await JWT.verify(TokenAuth[1], "myTotalySecretKey", function(err, resultToken){
        if(err)return false;
        if(resultToken) return resultToken
    });

    if(!resultToken){
        res.send(403);
    }else{
        const id = req.params.id;
        const deleteProduct = await ProductModel.deleteOne({"id":id}, (err, obj)=>{
            res.send("Succes delete");
        });
     
    }
}

exports.findDataByUserData = async (req, res) => {
    let Token = await JWTModule.JWTVerify(req.headers);
    if(!Token) {
        res.send({
            message: 'Error',
            statusCode: 403,
        })
    }else{
        /* relation mongodb */
        let dataGet = await UserModel.aggregate([
            {
                $match:{ 'username':Token.Username}
            },
            {
                $lookup:{
                    from:'products',
                    localField: 'username',
                    foreignField: 'UserOwner',
                    as: 'data_products'
                }
            }
        ]).exec();
        console.log(Token.dataGet);
        if(!dataGet) res.send("Failed to get data");
        else res.send({
            message: 'Successfull to get data',
            statusCode: 200,
            results: dataGet
        })
    }
   
}

exports.Search = async (req, res) => {

    //search by character
    await ProductModel.find({'title':{
        $regex:req.query.search
    }}).then(response => {
        res.send({
            message:'successfull to get data',
            statusCode: 200,
            results:response
        })
    }).catch(err =>{
        res.send({
            message:'failed to get data',
            statusCode: 500,
        })
    })
}


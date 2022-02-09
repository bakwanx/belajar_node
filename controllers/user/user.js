const req = require('express/lib/request');
const { send, type } = require('express/lib/response');
const UserModel = require('../../models/mongodb/user/user');
const CheckBody = require('../../module/CheckBody');
const JWT  = require('jsonwebtoken');
const Cryptr = require('cryptr');
const { response } = require('express');
const cryptr = new Cryptr('myTotalySecretKey');

exports.All = (req, res) => {
  
    UserModel.find().then(response => {
        res.send({
            message: 'Successfull to get data',
            statusCode: 200,
            results: response
        })
    }).catch( err => {
        console.log(err);
        res.send({
            message: 'Failed to get data',
            statusCode: 500,
        })
    });
}

exports.Create = async (req, res) => {
    if(!req.body) {
        res.send('400');
    }

    let dataFind = await UserModel.findOne({'username':req.body.username});
    if(dataFind){
        return res.send({
            message : "Username sudah terdaftar",
            statusCode: 200
        })
    }else{
        const user = new UserModel({
            username: req.body.username || "No Name", 
            password: cryptr.encrypt(req.body.password),
            fullname: req.body.fullname,
            email: req.body.email,
            age: req.body.age,
            description: req.body.description,
        });
    
        // Simpan user
        // user.save()
        // .then(response => {
        //     res.send("Berhasil simpan user");
        // }).catch(err => {
        //     res.status(500).send({
        //         message: err.message
        //     });
        // });
    
        let createData = await user.save();
        if(createData){
            res.send({
                message : "Berhasil registrasi",
                statusCode: 200
            })
        }else{
            res.send({
                message : "Gagal registrasi",
                statusCode: 500
            })
        }
    }
}

exports.Login = async (req, res) => {
    let dataUser = await UserModel.findOne({ 'username':req.body.username });

    if(!dataUser){
        res.send({
            message : "Data not found",
            statusCode: 400
        })
    }else{
        let password  = cryptr.decrypt(dataUser.password);
        if( password != req.body.password ){
            res.send({
                message : "Password salah",
                statusCode: 400
            })
        }else{
           
            let createToken = JWT.sign(
                {
                    UID : dataUser._id,
                    Username : dataUser.username,
                    Email : dataUser.email 
                },
                "myTotalySecretKey",
                { expiresIn: '1h' }
            );
           
            let userParsing = {
                Username : dataUser.username,
                Fullname : dataUser.fullname,
                Email : dataUser.email,
                TokenType : 'Bearer',
                Token : createToken
            }
            res.send(userParsing);
        }
       
    }
}

exports.FindOne = (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
    .then(user => {
        res.send(user);
    }).catch(err => {
        return res.status(500).send({
            message: "Error mengambil user dengan id " + id
        });
    });
}

exports.UpdateOne = () => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id,{
        username: req.body.username, 
        password: req.body.password,
        fullname: req.body.fullname,
        email: req.body.email,
        age: req.body.age,
        description: req.body.description,
    }).then(user => {
        res.send("Success update");
    }).catch(err => {
        res.send(err);
    });
}

exports.Delete = () => {
    
}

exports.LoginPost = async (req, res) => {
    let dataUser = await UserModel.findOne({ 'username':req.body.username });

    if(!dataUser){
        res.send({
            message : "Data not found",
            statusCode: 400
        })
    }else{
        let password  = cryptr.decrypt(dataUser.password);
        if( password != req.body.password ){
            res.send({
                message : "Password salah",
                statusCode: 400
            })
        }else{
           
            let createToken = JWT.sign(
                {
                    UID : dataUser._id,
                    Username : dataUser.username,
                    Email : dataUser.email 
                },
                "myTotalySecretKey",
                { expiresIn: '1h' }
            );
           
            let userParsing = {
                Username : dataUser.username,
                Fullname : dataUser.fullname,
                Email : dataUser.email,
                TokenType : 'Bearer',
                Token : createToken
            }
            res.render('login', {logindData : JSON.stringify(userParsing)});
        }
       
    }
}
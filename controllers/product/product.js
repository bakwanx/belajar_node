const ProductModel = require('../../models/mongodb/product/product');

exports.All = (req, res) => {
    ProductModel.find().then(response => {
        console.log('berhasil');
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
    })
}

exports.Create = (req, res) => {
    // Validasi request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Konten product tidak boleh kosong!!!!"
        });
    }

    // Create Product
    const product = new ProductModel({
        title: req.body.title || "Untitled Product", 
        description: req.body.description,
        price: req.body.price
    });

    // Simpan product
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

exports.FindOne = () => {
    
}

exports.UpdateOne = () => {
    
}

exports.UpdateMany = () => {
    
}

exports.Delete = () => {
    
}
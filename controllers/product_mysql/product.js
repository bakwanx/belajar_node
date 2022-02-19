const { Product } = require('../../models');
const Path = require('path');
const RandomString =  require('../../module/RandomString').RandomString;

exports.create = (req, res) => {
    let ImagesData = req.files.imagesData;
   
    let newName = RandomString(25) + ImagesData.mimetype.replace('image/', '.')
    let dirName  =  Path.join(__dirname, '../../public');
    console.log(dirName);
    ImagesData.mv(dirName + '/images/' + newName, function(err, result){
        if(err) console.log(err);
        if(result) console.log("Success");
    });
  
    Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: newName
    }).then(response => {
       
    });
}
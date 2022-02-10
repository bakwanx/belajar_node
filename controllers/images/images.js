const randomString =  require('../../module/RandomString');
const Path = require('path');


exports.ImagesCreate = (req, res) =>{
    let ImagesData = req.files.imagesData;
   
    let newName = randomString.RandomString(25) + ImagesData.mimetype.replace('image/', '.');
    let dirName  =  Path.join(__dirname, '../../public');
    console.log(dirName);
    ImagesData.mv(dirName + '/images/', newName, function(err, result){
        if(err) return false;
        if(result) return true;
    });
}

exports.getImages = (req, res) =>{
    res.send({
        images: Path.join(__dirname, '../../public/images/') + req.body.filename
    })
}
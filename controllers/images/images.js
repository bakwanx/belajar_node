const RandomString =  require('../../module/RandomString').RandomString;
const Path = require('path');


exports.ImagesCreate = (req, res) =>{
    let ImagesData = req.files.imagesData;
   
    let newName = RandomString(25) + ImagesData.mimetype.replace('image/', '.')
    let dirName  =  Path.join(__dirname, '../../public');
    console.log(dirName);
    ImagesData.mv(dirName + '/images/' + newName, function(err, result){
        if(err) console.log(err);
        if(result) console.log("Success");
    });

}

exports.getImages = (req, res) =>{
    res.send({
        images: Path.join(__dirname, '../../public/images/') + req.body.filename
    })
}
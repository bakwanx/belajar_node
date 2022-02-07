const JWT = require('jsonwebtoken');

exports.JWTVerify = async (TokenData) => {
    let TokenAuth = TokenData.authorization.split(' ');
    if(TokenAuth[0] !== 'Bearer'){
        return false;
    }else{
        let resultToken = await JWT.verify(TokenAuth[1], "myTotalySecretKey", function(err, resultToken){
            if(err)return false;
            if(resultToken) return resultToken
        });
        return resultToken;
    }
   


}
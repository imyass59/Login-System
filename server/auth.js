require('dotenv').config();
const secret_key = process.env.TOKEN_SECRET;
var jwt = require('jsonwebtoken');
const {Encrypt,Decrypt} = require('./Encryption');

const VerifyToken = (req,res,next) =>
{
    //const EncryptToken = req.header('auth-token');
    try
    {
        const EncryptToken = req.cookies['jwt-token'];
        const token = Decrypt(EncryptToken);
        if(!EncryptToken) return res.status(401).send('Access Denied');
        const key = secret_key;
        try{
            const verified = jwt.verify(token , key);
            req.user = verified;
            next();
        }
        catch(err){
            res.status(400).send('Invalid Token');
        }
    }
    catch(err)
    {
        res.send({'error' : err.toString()})
    }
    
};

module.exports.VerifyToken = VerifyToken;
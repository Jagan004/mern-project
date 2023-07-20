const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const ValidateToken = asyncHandler(async(req,res,next)=>{
let token
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
{
    try {

        token = req.headers.authorization.split(' ')[1]

        let decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECERT)

  req.user = await User.findById(decode.id)

  next()
        
    } catch (error) {
        
        res.status(401).json({ error: "Not Authorized" });
    }
}

if(!token)
{
    res.status(401)
        throw new Error("Not Authrozied, No token")
}

})

module.exports = ValidateToken;
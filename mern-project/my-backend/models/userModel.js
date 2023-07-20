const mongoose = require("mongoose")


const UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"please add the name"]
    },
    email:{
        type:String,
        require:[true,"please add the email"]
    },
    phone:{
        type:String,
        require:[true,"please add the phone"]
    },
    password:{
        type:String,
        require:[true,"please add the password"]
    },
},{
    timestamps:true,
})

module.exports = mongoose.model("User",UserSchema)
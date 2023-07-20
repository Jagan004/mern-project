const mongoose = require("mongoose")


const ContactSchema = mongoose.Schema({
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
},{
    timestamps:true,
})

module.exports = mongoose.model("Contact",ContactSchema)
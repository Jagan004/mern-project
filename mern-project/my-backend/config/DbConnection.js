const mongoose = require("mongoose")


const DbConnect = async ()=>{
try{
const connect = await mongoose.connect(process.env.CONNECTION_STRING)
console.log("Db Connected",connect.connection.host)
}catch(err)
{
    console.log(err)
}
}

module.exports = DbConnect
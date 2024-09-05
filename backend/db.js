const mongoose = require("mongoose")

const mongodbUrl = "mongodb://0.0.0.0:27017/shopit"
const dbConnection = async ()=>{
 mongoose.connect( mongodbUrl).then(()=>{

}).catch((error)=>{console.log(error)})
}
module.exports =  dbConnection
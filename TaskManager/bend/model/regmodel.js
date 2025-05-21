let mongoose=require("mongoose")
let usersch=new mongoose.Schema({
    "email":String,
    "pwd":String
})
let us=mongoose.model("us",usersch)
module.exports=us
let mongoose= require("mongoose");

let usch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String,
    "role":String,
    "otp":String
})
let um=mongoose.model("user",usch)
module.exports=um
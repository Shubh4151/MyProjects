let mongoose=require("mongoose")
let adsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String
})
let am=mongoose.model("admin",adsch)
module.exports=am
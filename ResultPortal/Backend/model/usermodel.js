let mongoose=require("mongoose")
let usersch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "dob":Date,
    "gen":String,
    "phno":String,
    "email":String,
    "photo":String,
    "tel":Number,
    "hn":Number,
    "eg":Number,
    "m":Number,
    "s":Number,
    "sc":Number

})
let um=mongoose.model("um",usersch)
module.exports=um
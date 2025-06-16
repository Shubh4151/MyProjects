let mongoose= require("mongoose");
let postsch=new mongoose.Schema({
    "_id":String,
    "title":String,
    "desc":String,
    "cat":String,
    "uid":String,
    "name":String,
    "date":{
        type:Date,
        default:Date.now
    },
       "status":{
        default:"pending",
        type:String
    },
    "comm":String,
    "likes":[],
    "dlikes":[]
})
let pm=mongoose.model("pm",postsch)
module.exports=pm
let mongoose=require("mongoose")
let todosch=new mongoose.Schema({
    "email":String,
    "task":String,
    completed: { type: Boolean, default: false }
})
let um=mongoose.model("um",todosch)
module.exports=um
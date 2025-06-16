let {v4}=require("uuid")
const pm = require("../models/postmodel")
let add=async(req,res)=>{
    try{
        let data=new pm({...req.body,"_id":v4()})
        await data.save()
        res.json({"msg":"post created"})


    }
    catch(err)
    {
        res.json({"msg":"error in post creation"})
    }
}
let getall=async(req,res)=>{
    try
    {
let data=await pm.find({"status":"approve"})
res.json(data)
    }
    catch(err)
    {
        res.json({"msg":"error in getting posts"})
    }
}
let getbycat=async(req,res)=>{
    try
    {
let data=await pm.find({"cat":req.params.cat,"status":"approve"})
res.json(data)
    }
    catch(err)
    {
        res.json({"msg":"error in getting posts"})
    }
}
let upd=async(req,res)=>{
    try{
        await pm.findByIdAndUpdate({"_id":req.body._id},req.body)
        res.json({"msg":"updation done"})

    }
    catch(err)
    {
        res.json({"msg":"error in updation"})
    }
}
let del=async(req,res)=>{
    try{
       await pm.findByIdAndDelete(req.params.pid)
       res.json({"msg":"del done"})

    }
    catch(err)
    {
        res.json({"msg":"error indel"})
    }
}

let pdm=async(req,res)=>{
    try{
        let data=await pm.find({"uid":req.params.uid})
        res.json(data)

    }
    catch(err)
    {
         res.json({"msg":"error fetching"})
    }
}

let admin=async(req,res)=>{
    try
    {
let data=await pm.find({}).sort({"status":-1})
res.json(data)
    }
    catch(err)
    {
        res.json({"msg":"error in getting posts"})
    }
}

let inspect=async(req,res)=>{
    try
    {
        await pm.findByIdAndUpdate({"_id":req.body.pid},{"comm":req.body.comm,"status":"inspect"})
        res.json({"msg":"status upd"})

    }
    catch(err)
    {
        res.json({"msg":"error in updation posts"})
    }
}

let accept=async(req,res)=>{
    try
    {
        await pm.findByIdAndUpdate({"_id":req.params.pid},{"status":"approve",$unset:{"comm":null}})
        res.json({"msg":"status upd"})

    }
    catch(err)
    {
        res.json({"msg":"error in updation posts"})
    }
}
let like=async(req,res)=>{
    try{
        await pm.findOneAndUpdate({"_id":req.body.pid,"likes":{$ne:req.body.uid},"dlikes":{$ne:req.body.uid}},{$addToSet:{"likes":req.body.uid}})
        res.json({"msg":"done"})

    }
    catch(err)
    {
        res.json({"msg":"error"})
    }
}

let dlike=async(req,res)=>{
    try{
        await pm.findOneAndUpdate({"_id":req.body.pid,"likes":{$ne:req.body.uid},"dlikes":{$ne:req.body.uid}},{$addToSet:{"dlikes":req.body.uid}})
      /* let data=await pm.find({"_id":req.body.pid,"dlikes":req.body.uid})
       if(data.length>0)
       {
        await pm.findByIdAndUpdate({"_id":req.body.pid},{$pull:{"dlikes":req.body.uid}})
       }
       else{
         await pm.findByIdAndUpdate({"_id":req.body.pid},{$push:{"dlikes":req.body.uid}})
       }*/
        res.json({"msg":"done"})

    }
    catch(err)
    {
        res.json({"msg":"error"})
    }
}


module.exports={add,getall,getbycat,upd,del,pdm,admin,inspect,accept,like,dlike}
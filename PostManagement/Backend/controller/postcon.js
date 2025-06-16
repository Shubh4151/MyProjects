let {v4}=require("uuid")
let pm=require("../model/postmodel")
let addpost=async(req,res)=>{
    try{
        let data=new pm({...req.body,"_id":v4()})
        await data.save()
        res.json({"msg":"post created"})

    }
    catch(err)
    {
        res.json({"msg":"error in adding post"})
    }
}
let getall=async(req,res)=>{
    try{
        let data=await pm.find({"status":"approved"})
        res.json(data)

    }
    catch(err)
    {
        res.json({"msg":"error in getting post"})  
    }
}
let getbycat=async(req,res)=>{
    try{
        let data=await pm.find({"cat":req.params.cat,"status":"approved"})
        res.json(data)

    }
    catch(err)
    {
        res.json({"msg":"error in getting post"})  
    }
}

let postsbyme=async(req,res)=>{
    try{
        let data=await pm.find({"uid":req.params.uid})
        res.json(data)

    }
    catch(err)
    {
        res.json({"msg":"error in getting post"})  
    }
}

let getposts=async(req,res)=>{
    try{
        let data=await pm.find({})
        res.json(data)

    }
    catch(err)
    {
        res.json({"msg":"error in getting post"})  
    }
}
let updposts=async(req,res)=>{
    try{
       await pm.findByIdAndUpdate({"_id":req.body._id},req.body)
        res.json({"msg":"updated"})

    }
    catch(err)
    {
        res.json({"msg":"error in updpost"})  
    }
}
let addlike=async(req,res)=>{
    try{
        let a=await pm.find({"_id":req.body._id,"dlikes":{$in:[req.body.uid]}})
        if(a.length==0)
        {
        await pm.findByIdAndUpdate({"_id":req.body._id},{$addToSet:{"likes":req.body.uid}})
        }
        res.json({"msg":"ok"})
    }
    catch(err)
    {
        res.json({"msg":"notok"})
    }
}

let adddlike=async(req,res)=>{
    try{
        let a=await pm.find({"_id":req.body._id,"likes":{$in:[req.body.uid]}})
        if(a.length==0)
        {
        await pm.findByIdAndUpdate({"_id":req.body._id},{$addToSet:{"dlikes":req.body.uid}})
        }
        res.json({"msg":"ok"})
    }
    catch(err)
    {
        res.json({"msg":"notok"})
    }
}
module.exports={addpost,getall,getbycat,postsbyme,getposts,updposts,addlike,adddlike}
const um = require("../model/usermodel")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")

let adduser=async(req,res)=>{
    try{
        let obj=await um.findById(req.body._id)
        if(obj)
        {
            res.json({"msg":"acc exists"})
        }
        else{
            let pwdhash=await bcrypt.hash(req.body.pwd,10)
            let data=new um({...req.body,"pwd":pwdhash})
            await data.save()
            res.json({"msg":"acc created"})
        }

    }
    catch(err)
    {
        res.json({"err":"error in reg"})
    }
}

let login=async(req,res)=>{
    try
    {
        let obj=await um.findById(req.body._id)
        if(obj)
        {
            let f=await bcrypt.compare(req.body.pwd,obj.pwd)
            if(f)
            {
                res.json({"token":jwt.sign({"_id":obj._id},"1234"),"uid":obj._id,"name":obj.name,"role":obj.role})
            }
            else{
                res.json({"msg":"check password"})
            }
        }
        else{
            res.json({"msg":"check email"})
        }

    }
    catch(err)
    {
        res.json({"err":"error in Login"})
    }

}
let islogin=async(req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization,"1234")
        next()
    }
    catch(err)
    {
        res.json({"err":"plz login"})
    }
}
let isadmin=async(req,res,next)=>{
    try{
        let obj=await um.findById(req.headers.uid)
        if(obj)
        {
            if(obj.role!="user")
            {
                next()
            }
            else{
                res.json({"err":"your are not amin or retailer"})
            }
        }
        else
        {
            res.json({"err":"your are not user"}) 
        }

    }
    catch(err)
    {
        res.json({"err":"you are not retailer or admin"})
    }
}

module.exports={login,adduser,islogin,isadmin}

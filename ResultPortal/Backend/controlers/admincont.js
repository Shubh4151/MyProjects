let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const am = require("../model/admodel")
let reg=async(req,res)=>{
    try{
        let pwdhash=await bcrypt.hash(req.body.pwd,10)
        let data=new am({...req.body,"pwd":pwdhash})
        await data.save()
        res.send("acc created")
    }
    catch(err)
    {
        res.send("error in reg")
    }
}
let login=async(req,res)=>{
    try{
        let obj=await am.findById(req.body._id)
        if(obj)
        {
            let f=await bcrypt.compare(req.body.pwd,obj.pwd)
            if(f)
            {
                res.json({"token":jwt.sign({"_id":obj._id},"abcd"),"name":obj.name})
            }
            else
            {
                res.json({"msg":"check password"})  
            }
        }
        else{
            res.json({"msg":"check email"})
        }

    }
    catch(err)
    {
        res.json({"err":"error in login"})
    }
}

let islogin=async(req,res,next)=>{
    try{
jwt.verify(req.headers.authorization,"abcd")
next()

    }
    catch(err)
    {
        res.json({"msg":"plz login"})
    }
}

module.exports={reg,login,islogin}
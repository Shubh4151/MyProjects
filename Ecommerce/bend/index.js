let express=require("express")
let mongoose=require("mongoose")
const rt = require("./routes/route")
let bodyParser=require("body-parser")
let cors=require("cors")

mongoose.connect("mongodb://127.0.0.1:27017/hfs34ecomdb").then(()=>{
    console.log("ok")
})
let app=express()
app.use(express.json())
app.use(cors())
app.use("/imgs",express.static("./prodimgs"))
app.use(bodyParser.urlencoded({"extended":true}))
app.use("/",rt)

app.listen(5000)
const express = require("express")
const path = require("path")
require("dotenv").config()
const app = express()
const   dbConnection = require("./db")
dbConnection()
const skRoute = require("./routes/shopAccount")
const siRoute = require("./routes/shopItemsData")
const uRoute = require("./routes/userAccount")
// const paymentRoute = require("./routes/payment")
const stripeRoute = require("./routes/stripePayment")
const cookieParser = require("cookie-parser")
const cors = require("cors")

port = process.env.port || "5000"




app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false}))
app.use(cors({
    credentials:true,

    origin:["http://localhost:3000"]
}))





app.use("/api",skRoute)
app.use("/items",siRoute)
app.use("/user",uRoute)
app.use("/payment",stripeRoute)

//---deployment---//
const __dirname1 = path.resolve()


if(process.env.NODE_ENV == "production"){
  
  app.use(express.static(path.join(__dirname1,"../build")))
  app.get("*",(req,res)=>{
    try {

      res.sendFile(path.resolve(__dirname1,"../","build","index.html"))
    } catch (error) {
      res.status(400).send({message:"file not"})
      console.log("this is error")
      console.log(error)
    }
   
  })
}

//--deployment--//


app.listen(port,()=>{
    console.log("app is listening on port 5000")
})
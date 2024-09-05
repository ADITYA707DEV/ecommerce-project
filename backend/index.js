const express = require("express")
const path = require("path")
require("dotenv").config()
const app = express()
const   dbConnection = require("./db")
const skRoute = require("./routes/shopAccount")
const siRoute = require("./routes/shopItemsData")
const uRoute = require("./routes/userAccount")
// const paymentRoute = require("./routes/payment")
const stripeRoute = require("./routes/stripePayment")
const cookieParser = require("cookie-parser")
const cors = require("cors")

port = "5000"




app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false}))
app.use(cors({
    credentials:true,

    origin:["http://localhost:3000"]
}))

dbConnection()
app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/api",skRoute)
app.use("/items",siRoute)
app.use("/user",uRoute)
app.use("/payment",stripeRoute)


app.listen(port,()=>{
    console.log("app is listening on port 5000")
})
const express=require("express")
require("dotenv").config()
const cors=require("cors")
const {application }=require("express")
const {connection}=require("./Config/db")
const {BookRoute}=require("./Routes/Book.routes")
const {OrderRoute} =require("./Routes/Order.routes")
const {UserRoute}=require("./Routes/User.routes")


const app=express()

app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.get("/",(req,res)=>{

res.send("Welcome to Home Page")
})
app.use("/user",UserRoute)
app.use("/api/books",BookRoute)
app.use("/api",OrderRoute)
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected To Database,...")
    } catch (error) {
        console.log("Unable To Connect Database")
        console.log(error)
    }
})
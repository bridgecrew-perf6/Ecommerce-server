require('dotenv').config()
const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require('path');
require('./server/DB/index')
const app = express()
app.use(fileUpload({ createParentPath: true,useTempFiles:true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const userRouter = require('./server/routes/userRouter')
const categoryRouter = require('./server/routes/categoryRouter')
const uploadRouter = require('./server/routes/uploadRouter')
const productRouter = require('./server/routes/productRouter')
const paymentRouter = require('./server/routes/paymentRouter')
app.get('/',(req,res)=>{
    res.json({message:"hello aws"})
})
app.use('/user', userRouter)
app.use('/api', categoryRouter)
app.use('/api', uploadRouter)
app.use('/api', productRouter)
app.use('/api', paymentRouter)

const PORT = process.env.port || 8080
app.listen(PORT,(error)=>{
    if(error) throw error
    console.log("server is live on port " + PORT);
})
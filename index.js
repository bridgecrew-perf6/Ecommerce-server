const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.json({message:"hello aws"})
})

const PORT = process.env.port || 8080
app.listen(PORT,(error)=>{
    if(error) throw error
    console.log("server is live on port " + PORT);
})
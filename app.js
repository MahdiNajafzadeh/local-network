const express = require("express");
const app = new express()
const bodyParser = require('body-parser')
const cors =require("cors")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())

app.use(cors("*"))


app.get("/",(req,res)=>{
    console.log(req);
    console.log(Object.keys(req).length);
    res.send({x:"x"})
})

app.listen(5000,()=>{
    console.log("server run :D");
})
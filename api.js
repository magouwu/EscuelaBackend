const express = require('express')
const mongoose = require('mongoose')
var { expressjwt: ejwt } = require("express-jwt");
const endpoints = require('./user.controller')
const cors = require('cors')
const User = require('./User')
const jwt = require('jsonwebtoken')

const app = express()
const port = 3050

app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://magouwu:Katieteamo@cluster0.199wf.mongodb.net/auth?retryWrites=true&w=majority')






app.post('/register', endpoints.register)
app.post('/login',endpoints.login)

app.get('/protected', endpoints.protect, endpoints.protected)

// app.get('/lele',(req,res,next)=>{
//     req.user= {_id}
// },(req,res,next)=>{
//     console.log('lala',req.user)
//     res.send('ok')
// })


app.get('*', (req,res)=>{
    res.status(404).send('Esta Pagina No Existe')
})


app.listen(port,()=>{
    console.log(`Server api is running at port ${port}`)
})
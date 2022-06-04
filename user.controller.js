const bcrypt = require('bcrypt')
const User = require('./User')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const express = require('express')
var { expressjwt: ejwt } = require("express-jwt");


const signToken = _id =>  jwt.sign({_id},'mi-string-secreto',{ expiresIn: "2 days" })



const endpoints = {
    

       register: async(req,res)=>{
           const {body} = req
           try{
               const isUser = await User.findOne({username: body.username})
               if(isUser){
                 res.status(403).send('User already in use')
                 console.log('User already in use')
                 return
               }
               const salt = await bcrypt.genSalt()
               const hashed = await bcrypt.hash(body.password, salt)
               const user  = await User.create({username: body.username, password: hashed, salt})
               console.log(`Username: ${user.username} is created`)
               const signed = signToken(user._id)
               console.log(signed)
           }
           catch(err){
               console.log(err)
               res.status(500).send(err)
           }
       },

       login: async(req,res)=>{
           const {body} = req
           try{
            const user = await User.findOne({username:body.username})
            if(!user){
                res.status(403).send('User or password are invalid or doesnt exist')
                console.log('User or password are invalid or doesnt exist')
            }else{
                const isMatch = await bcrypt.compare(body.password, user.password)
                if(isMatch){
                    const signed = signToken(user._id)
                    res.status(200).send({ token: signed })
                    console.log(`User: ${user.username} is connected`)
                }else{
                    res.send('User or password are invalid')
                    console.log('User or password are invalid')
                }
            }
           }catch(err){
               res.status(500).send(err.message)
                console.log(err)
           }
       },

    protect:  (req,res,next)=>{
            console.log(req.headers['authorization'])
            const authHeader = req.headers['authorization'] 
            const token = authHeader && authHeader.split(' ')[1]
            
        if(!token){
           return res.status(403).send('no hay token')
         }
        
  jwt.verify(token,'mi-string-secreto', function(err,user) {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
       
    },
    protected: (req,res,next)=>{
        console.log(req.user)
        res.status(200).send(User.username)
    }
        
   
}

module.exports = endpoints
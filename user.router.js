const modelUser = require('../models/user.model')
const route = require('express').Router()

route.post('/register',(req,res,next)=>{
    modelUser.registerUserModel(req.body.name,req.body.email,req.body.password).then(user=>
       res.status(200).json(user)
        ).catch(err=>res.status(404).json(err))
})

route.post('/login',(req,res,next)=>{
    modelUser.loginUserModel(req.body.email,req.body.password).then(token=>res.status(200).json(token))
    .catch(err=>res.status(404).json(err))
})
















module.exports=route


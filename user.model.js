const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { use } = require('../routers/user.router')
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const User = mongoose.model('user',userSchema)
var url = "mongodb://localhost:27017/university"
exports.registerUserModel=(name,email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return  User.findOne({email:email})
        }).then(user=>{
            if(user){
                mongoose.disconnect()
                reject('this email exist')
            }else{
                return bcrypt.hash(password,10)
            }
    }).then((hpassword)=>{
        let user = new User({
            name:name,
            email:email,
            password:hpassword,

        })
        return user.save()
    }).then(user=>{
        mongoose.disconnect()
        resolve(user)
    }).catch(err=>reject(err))
    })
}
var privateKey='this my secret key hnjnbjbhbhbh'
exports.loginUserModel=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return User.findOne({email:email})
        }).then(user=>{
            if(user){
                bcrypt.compare(password,user.password).then(verif=>{
                    if(verif){
                       let token= jwt.sign({id:user._id, name:user.name},privateKey,{
                            expiresIn:"1h"

                        })
                        mongoose.disconnect()
                        resolve(token)
                       
                    }else{
                        mongoose.disconnect()
                        reject('password invalid')
                    }
                })

            }else{
                mongoose.disconnect()
                reject('this email not exist')
            }
        }).catch(err=>reject(err))
    })
}
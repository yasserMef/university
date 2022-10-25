const route = require('express').Router()
const modelStudent = require('../models/student.model')
const jwt = require('jsonwebtoken')
var privateKey='this my secret key hnjnbjbhbhbh'

verifyToken=(req,res,next)=>{
    let token=req.headers.authorisation
    if(!token){
        res.status(400).json({ msg: 'access rejected..........!!'})
    }
    
    try{
        jwt.verify(token,privateKey)
        next()

    }catch(e){

        res.status(400).json({error:e})
    }
}

 var secretKey='key123'
 var clientKey='123654'

verifSecret = (req,res,next)=>{
    sk = req.params.secret 
    ck = req.params.client
    if(sk==secretKey && ck==clientKey){
        next()
    }else{
        res.status(400).json({msg:"you can't access to this route because you don't sent me secret key and clien key"})
    }

}

route.post('/addstudent/:secret/:client',verifyToken,verifSecret,(req,res,next)=>{
    modelStudent.postDataStudent(req.body.firstName,req.body.lastName,req.body.email,req.body.age,req.body.phone).then((msg)=>{
      res.status(200).json(msg)
    }).catch(err=>res.status(400).json({error:err}))
})
route.get('/students',verifyToken,(req,res,next)=>{
    let token=req.headers.authorisation
    let user=jwt.decode(token,{complete:true})
    modelStudent.getAllStudentsModel().then(students=>{
        res.status(200).json({students:students,user:user})
    }).catch(err=>{
        res.status(400).json(err)
    })
})

route.get('/student/:id',verifyToken,(req,res,next)=>{
    
    modelStudent.getOneStudentModel(req.params.id).then(student=>{
        res.status(200).json(student)
    }).catch(err=>res.send(err))

})
route.delete('/deletestudent/:id',verifyToken,(req,res,next)=>{
    let id = req.params.id
    modelStudent.deleteStudentModel(id).then(deletestudent=>{
        res.status(200).json(deletestudent)
    }).catch(err=>res.status(404).json(err))
})

route.patch('/updatestudent/:id',verifyToken,(req,res,next)=>{
    let id = req.params.id
    modelStudent.updateStudentModel(id,req.body.firstName,req.body.lastName,req.body.email,req.body.age,req.body.phone).then(doc=>{
        res.status(200).send(doc)
    }).catch(err=>res.status(404).json(err))
})

module.exports=route
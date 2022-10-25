const express = require('express')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader('Access-Control-Allow-Methods',"*")
    res.setHeader('Access-Control-Allow-Headers',"*")
    next()
})

const routeStudent =require('./routers/student.router')
const routeUser = require('./routers/user.router')



app.use('/', routeStudent)

app.use('/',routeUser)




app.listen(3000,console.log('hello'))
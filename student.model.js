const mongoose = require('mongoose')
const joi = require('joi')


const schemaValidation = joi.object({
    firstName:joi.string().alphanum().min(2).max(20).required(),
    lastName:joi.string().alphanum().min(2).max(20).required(),
    email:joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    age:joi.number().required(),
    phone:joi.number().required()

})


schemaStudent = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    age:Number,
    phone:Number
})

var Student = mongoose.model('student',schemaStudent)
var url = "mongodb://localhost:27017/university"




exports.postDataStudent=  (firstName,lastName,email,age,phone)=>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(url).then(()=>{
         let validation =  schemaValidation.validate({
                firstName:firstName,
                 lastName:lastName,
                 email:email,
                 age:age,
                 phone:phone
            })
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)

            }

                let newstudent = new Student({
                 firstName:firstName,
                 lastName:lastName,
                 email:email,
                 age:age,
                 phone:phone
                })
                return newstudent.save()
              }).then(doc=>{
                 mongoose.disconnect()
                 resolve(doc)
     
              }).catch(err=>{
                mongoose.disconnect()
                reject(err)
              })

        }) 
}

exports.getAllStudentsModel=()=>{
   return new Promise ((resolve,reject)=>{
         mongoose.connect(url).then(()=>{
            return Student.find({})
         }).then(students=>{
            mongoose.disconnect()
            resolve(students)
         }).catch(err=>reject(err))

    })
}

exports.getOneStudentModel = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
          return  Student.findById(id)
        }).then(student=>{
            mongoose.disconnect()
            resolve(student)
        }).catch(err=>reject(err))
    })
}
 
exports.deleteStudentModel=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return  Student.deleteOne({_id:id})
          }).then(deletestudent=>{
              mongoose.disconnect()
              resolve(deletestudent)
          }).catch(err=>reject(err))

    })
    
}

exports.updateStudentModel=(id,firstName,lastName,email,age,phone)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            let validation =  schemaValidation.validate({
                firstName:firstName,
                 lastName:lastName,
                 email:email,
                 age:age,
                 phone:phone
            })
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)

            }



            return Student.updateOne({_id:id},{
                firstName:firstName,
                lastName:lastName,
                email:email,
                age:age,
                phone:phone
            })
             
            }).then(doc=>{
                mongoose.disconnect()
                resolve(doc)
            }).catch(err=>reject(err))

    })
    
    
    }

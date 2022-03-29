const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi') 
const passwordcomplexicity = require("joi-password-complexity")

const signUpTemplate = new mongoose.Schema({
    firstname:{
        type:String,
        default:require
    },
    lastname:{
        type:String,
        default:require
    },
    email:{
        type:String,
        default:require
    },
    password:{
        type:String,
        default:require
    },
    date:{
        type:Date,
        default:Date.now
    }
})

signUpTemplate.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT, {expiresIn:"7d"})
    return token;
}

const User = mongoose.model('/userregisteration',signUpTemplate)

const validate = (data)=>{
    const schema = Joi.object({
        firstname:Joi.string().required().label("First Name"),
        lastname:Joi.string().required().label("Last Name"),
        email:Joi.string().email().required().label("Email"),
        password:passwordcomplexicity().required().label("Password")
    })
    return schema.validate(data)
}

module.exports = {User,validate}
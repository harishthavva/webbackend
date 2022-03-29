const router = require("express").Router()
const {User} = require('../models/SignUpModels')
const Joi = require("joi")
const bycrpt = require("bcrypt")

router.post('/auth',async (req,res)=>{
    try{
        const {error} = validate(req.body)
        if(error)
        return res.status(400).send({message:error.details[0].message})

        const user = await User.findOne({email:req.body.email})
        if(!user)
        return res.status(401).send({message:"Invalid Email or Password"})

        const validatepassword = await bycrpt.compare(req.body.password,user.password)
        if(!validatepassword)
        return res.status(401).send({message:"Invalid Email or Password"})

        const token = user.generateAuthToken();
        res.status(200).send({data:token,meassage:"Logged in successfully"})
    }
    catch(error){
        res.status(500).send({message:"Internal Server Error"})
    }
})

const validate = (data)=>{
    const schema = Joi.object({
        email:Joi.string().required().email().label("Email"),
        password:Joi.string().required().label("Password")
    })
    return schema.validate(data)
}

module.exports = router
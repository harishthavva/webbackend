const express = require('express')
const router = express.Router()
const {User,validate} = require("../models/SignUpModels")
const bcrypt = require('bcrypt')

// router.post('/signup',async (request,response)=>{
     
//     const salt = await bcrypt.genSalt(10)
//     const securepassword = await bcrypt.hash(request.body.password,salt)

//     const signUpUser = new signUpTemplateCopy({
//         firstname:request.body.firstname,
//         lastname:request.body.lastname,
//         email:request.body.email,
//         password:securepassword
//     })

//     signUpUser.save()
//     .then(data =>{
//         response.json(data)
//     })
//     .catch(error => {
//         response.json(data)
//     })
// })

router.post("/signup", async (req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error)
        return res.status(400).send({message:error.details[0].message})
        const user = await User.findOne({email:req.body.email})
        if(user)
        return res.status(409).send({message:"User with given email already exists"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const securepassword = await bcrypt.hash(req.body.password,salt)

        await new User({...req.body,password:securepassword}).save()

        res.status(201).send({message:"User created successfully"})
    }
    catch(error){
        res.status(500).send({message:"Internal Server Error"})
    }
})

module.exports = router;
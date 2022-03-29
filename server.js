const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userroute = require('./router/router')
const authroute = require("./router/auth")
const cors = require('cors')
const app = express()

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

app.use(express.json())
app.use(cors())
app.use('/api',userroute)
app.use('/api',authroute)

app.listen(4000, ()=> console.log("Listening to port 4000 !!!"))
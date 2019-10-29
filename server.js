const express = require('express')
const mongoose = require('mongoose')


const app = express()
const port = process.env.PORT || 3001

const userRouter = require('./api/router/userRouter')
const bodyParser = require('body-parser')
const email = require('./api/emails/account')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/userToken',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false 
})
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(userRouter)

app.listen(port)

console.log(email.hello())



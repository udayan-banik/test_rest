require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })

const db = mongoose.connection //connecting database to our server
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json()) //using json

// server router
const usersRouter = require('./routes/apis') //route all of our user information
app.use('/apis', usersRouter)



app.listen(5000, ()=> console.log('Server Started'))
const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(fileUpload())
app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb' }))
app.use(routes)

app.listen(process.env.PORT, function () {
  console.log(`App listening on port ${process.env.PORT}!`)
})

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

//running db
require('dotenv').config()
const mongoDB = require('./db')
mongoDB()


const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})



app.get('/', (req,res)=>{
    res.json({
        msg: "Hello world"
    })
})


app.use('/users', require('./Routes/UserHandler'))
app.use('/check', require('./Routes/UrlHandler'))


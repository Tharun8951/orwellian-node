const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

require('dotenv').config()

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})

//running db
const mongoDB = require('./db')
mongoDB()


app.get('/', (req,res)=>{
    res.json({
        msg: "Hello world"
    })
})


app.use('/users', require('./Routes/UserHandler'))
app.use('/check', require('./Routes/UrlHandler'))


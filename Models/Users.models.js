const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

// static signup method
userSchema.statics.signup = async function(username, email, password) {

  //validation
  if(!username || !email || !password){
    throw Error('All fields must be filled')
  }

  if(!validator.isEmail(email)){
    throw Error('Email is not valid')
  }

  // if(!validator.isStrongPassword(password)){
  //   throw Error('Use a strong password')
  // }

  const exists = await this.findOne({ username }).maxTime(20000)
  if (exists) {
    throw Error('Username already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ username, email, password: hash }).maxTime(20000)
  return user
}

//static login method
userSchema.statics.login = async function(username, password){
  if(!username || !password){
    throw Error('All fields must be filled')
  }
  const user = await this.findOne({ username }).maxTime(20000)
  if (!user) {
    throw Error('please signup')
  }
  const match = await bcrypt.compare(password, user.password)
  if(!match){
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)

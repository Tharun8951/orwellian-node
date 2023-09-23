const UserModel = require('../Models/Users.models')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '7d'})
}

const register = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await UserModel.signup(username, email, password)

        //create a token
        const token = createToken(user._id)
        res.status(200).json({
            token: token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: error.message
        })
    }
}

const login = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.login(username, password)

        //create a token
        const token = createToken(user._id)
        res.status(200).json({
            token: token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: error.message
        })
    }
}


module.exports = { register, login}
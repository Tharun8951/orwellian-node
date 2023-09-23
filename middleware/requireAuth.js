const jwt = require('jsonwebtoken')
const UsersModels = require('../Models/Users.models')

const requireAuth = async (req, res, next) => {
    //verify authentication
    // const authorization = req.body.auth
    const token = req.body.auth
    if(!token){
        return res.status(401).json({  
            msg: 'auth token required'
        })
    }
    // const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await UsersModels.findById({_id}).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Request is not authorized'
        })
    }
}

module.exports = { requireAuth }
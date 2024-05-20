// to  verify token
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('Inside jwt To Middleware');
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token)
    
     try {
        const response = jwt.verify(token,"super_sercrete_key")
        console.log(response);
         req.payload = response.userId

        next()
    } catch (error) {
        res.status(401).json("Authorization Failed",error)
    } 
}

module.exports = jwtMiddleware
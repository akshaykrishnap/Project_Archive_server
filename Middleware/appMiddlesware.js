


const appMiddleware =(req,res,next)=>{
console.log('Inside application Middleware');
next()
}

module.exports = appMiddleware
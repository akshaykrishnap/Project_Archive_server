// 1) import dotenv module
// config - loads .env file contents into process .env by default
require('dotenv').config()

//2) import express
const express = require('express')



//3) import cors
const cors = require('cors')
//import router
const router = require('./Routing/router')

// import databseconnection file
require('./Controller/DATABASE/dbConnection')

// import application middle
/* const appMiddleware= require('./Middleware/appMiddlesware') */



//4) create server
const pAServer=express()



//5) use cors by server
 pAServer.use(cors())



//6) convert JSON to JavaScript Objects
/* json() method returns a middleware that can converts json formate to javascript objects */
/* middleware - req-res cycle control */
pAServer.use(express.json())


//server using router
pAServer.use(router)


// first - name by which other application can use this folder
// second - express.static - export that folder
pAServer.use('/uploaded',express.static('./uploaded'))




//7) set port & process.env uses other alternate ports if provided is in use
const PORT = 4000 ||process.env



//8) run server
pAServer.listen(PORT,()=>{
    console.log(`Project Archive Server is running successfully at port number ${PORT} `);
})

 
 //GET Request
pAServer.get('/',(req,res)=>{
    res.send(`<h1 style ="color:red">Server is running successfully and ready to resolve</h1>`)
})


// POST Request
pAServer.post('/',(req,res)=>{
    res.send('Hello Post Request')
})

// PUT Request
pAServer.put('/',(req,res)=>{
    res.send('Hello Put Request') 
}) 
// server and database connection  
//1) import mongoose
const mongoose = require('mongoose')



const connectionsString = process.env.DATABASE

// connect

mongoose.connect(connectionsString).then(()=>{
    console.log('Mongoose Connenction is Successfull');                //to show connected with database
}).catch((err)=>{
    console.log(err);
})
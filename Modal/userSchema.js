// schema for users connention in database


// impot mangoose

const mongoose = require('mongoose')


// schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    mailId:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profile:{
        type:String
                             // not important so  blank and no require
    },
    github:{
        type:String
    },
    linkedIn:{
        type:String
    }
})


// model
 const users = mongoose.model("users",userSchema)    // name created in atlas is used


// export model
module.exports = users
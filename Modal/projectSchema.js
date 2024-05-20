// import mongoose
const mongoose = require('mongoose')


// schema
const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    language:{
        type:String,
        require:true
    },
    github:{
        type:String,
        require:true
    },
    website:{
        type:String,
        require:true
    },
    overview:{
        type:String,
        require:true
    },
    projectImage:{
        type:String,
        require:true
    },
    userId: {
        type:String,
        require:true
    }
})

// modal
const projects = mongoose.model("projects",projectSchema)


// exports modal
module.exports = projects
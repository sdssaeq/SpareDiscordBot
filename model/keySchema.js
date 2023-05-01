// import mongoose 
const mongoose = require('mongoose')

// Buat Schema
const dataSchema = mongoose.Schema({
    discord:{
        type: String,
        required: true
    },
    userkey:{
        type: String,
        required: true
    },
    aap: {
        type: String,
        required: true
    },
    pick:{
        type: String,
        require: true
    },
    dom:{
        type:String,
        require: true
    },
    status:{
        type: Boolean,
        required: true
    },dateAdded:{
        type: Date,
        required: false
    },
    dateExpired:{
        type: Date,
        required: false
    }
});

// export model
module.exports = mongoose.model('buyer',dataSchema)